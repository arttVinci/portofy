package usecase

import (
	"context"
	"fmt"
	"sync"

	"code.sajari.com/docconv/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	model "tratech.my.id/server/internal/model/agent"
	"tratech.my.id/server/internal/repository"
)

type CVParserUseCase struct {
	CVParserRepo *repository.CVParserRepository
	Log          *logrus.Logger
}

type task struct {
	name string
	fn   func() error
}

func NewCVParserUseCase(cvParserRepo *repository.CVParserRepository, log *logrus.Logger) *CVParserUseCase {
	return &CVParserUseCase{
		CVParserRepo: cvParserRepo,
		Log:          log,
	}
}

func (u *CVParserUseCase) ParseCV(ctx context.Context, filePath string) (*model.CVParseResult, error) {
	res, err := docconv.ConvertPath(filePath)
	if err != nil {
		u.Log.WithError(err).Error("error converting file to text")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to parse CV file")
	}

	// u.Log.Infof("Hasil ekstrak CV: \n%s", res.Body)
	// u.Log.WithField("extracted_text", res.Body).Info("Berhasil ekstrak file CV")

	if res.Body == "" {
		return nil, fiber.NewError(fiber.StatusBadRequest, "Could not extract text from the uploaded file")
	}

	cleanedText, err := u.CVParserRepo.CleanerText(ctx, res.Body)
	if err != nil {
		u.Log.WithError(err).Error("error cleaning text")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to clean text")
	}

	result := new(model.CVParseResult)

	var mu sync.Mutex
	errCh := make(chan error, 5)

	tasks := []task{
		{
			name: "profile",
			fn: func() error {
				profile, err := u.CVParserRepo.ProfileAgent(ctx, cleanedText)
				if err != nil {
					return err
				}
				mu.Lock()
				result.Profile = *profile
				mu.Unlock()
				return nil
			},
		},
		{
			name: "experience",
			fn: func() error {
				experience, err := u.CVParserRepo.ExperienceAgent(ctx, cleanedText)
				if err != nil {
					return err
				}
				mu.Lock()
				result.Experiences = experience
				mu.Unlock()
				return nil
			},
		},
		{
			name: "education",
			fn: func() error {
				education, err := u.CVParserRepo.EducationAgent(ctx, cleanedText)
				if err != nil {
					return err
				}
				mu.Lock()
				result.Educations = education
				mu.Unlock()
				return nil
			},
		},
		{
			name: "skill",
			fn: func() error {
				skills, err := u.CVParserRepo.SkillsAgent(ctx, cleanedText)
				if err != nil {
					return err
				}
				mu.Lock()
				result.Skills = skills
				mu.Unlock()
				return nil
			},
		},
		{
			name: "project",
			fn: func() error {
				projects, err := u.CVParserRepo.ProjectsAgent(ctx, cleanedText)
				if err != nil {
					return err
				}
				mu.Lock()
				result.Projects = projects
				mu.Unlock()
				return nil
			},
		},
	}

	var wg sync.WaitGroup
	for _, t := range tasks {
		wg.Add(1)
		go func(t task) {
			defer wg.Done()
			u.Log.Infof("[cv-parser] agent %s started", t.name)
			if err := t.fn(); err != nil {
				u.Log.WithError(err).Errorf("[cv-parser] agent %s failed", t.name)
				errCh <- fmt.Errorf("agent %s: %w", t.name, err)
			} else {
				u.Log.Infof("[cv-parser] agent %s done", t.name)
			}
		}(t)
	}

	wg.Wait()
	close(errCh)

	for err := range errCh {
		if err != nil {
			return nil, err
		}
	}
 
	return result, nil
}

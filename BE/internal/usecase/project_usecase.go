package usecase

import (
	"context"
	"mime/multipart"
	"sync"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/model/converter"
	"tratech.my.id/server/internal/pkg/utils"
	"tratech.my.id/server/internal/repository"
)

// TODO(post-prod): ProjectRepo jadi interface untuk testability
type ProjectUseCase struct {
	DB              *gorm.DB
	Log             *logrus.Logger
	Validate        *validator.Validate
	ProjectRepo     *repository.ProjectRepository
	UploadImageRepo *repository.UploadImageRepository
}

func NewProjectUsecase(db *gorm.DB, log *logrus.Logger, validate *validator.Validate, repo *repository.ProjectRepository, uploadImageRepo *repository.UploadImageRepository) *ProjectUseCase {
	return &ProjectUseCase{
		DB:              db,
		Log:             log,
		Validate:        validate,
		ProjectRepo:     repo,
		UploadImageRepo: uploadImageRepo,
	}
}

func (c *ProjectUseCase) Create(ctx context.Context, request *model.CreateProjectRequest) (*model.ProjectResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	project := &entity.Project{
		ID:          uuid.NewString(),
		UserId:      request.UserId,
		Title:       request.Title,
		ImageUrl:    request.ImageUrl,
		Description: request.Description,
		LinkUrl:     request.LinkUrl,
		Challenge:   request.Challenges,
		Solution:    request.Solution,
		IsFeatured:  request.IsFeatured,
		Tools:       request.Tools,
		Gallery:     request.Gallery,
		Features:    request.Features,
	}

	if err := c.ProjectRepo.Create(tx, project); err != nil {
		c.Log.WithError(err).Error("failed create project to database")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to create project")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing create project")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save project")
	}

	return converter.ProjectToResponse(project), nil
}

func (c *ProjectUseCase) Update(ctx context.Context, request *model.UpdateProjectRequest) (*model.ProjectResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	project := new(entity.Project)
	if err := c.ProjectRepo.FindByIdAndUserId(tx, project, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error finding project by id and user_id")
		return nil, fiber.NewError(fiber.StatusNotFound, "Project not found")
	}

	project.Title = request.Title
	project.Description = request.Description
	project.ImageUrl = request.ImageUrl
	project.LinkUrl = request.LinkUrl
	project.Challenge = request.Challenges
	project.Solution = request.Solution
	project.IsFeatured = request.IsFeatured
	project.Tools = request.Tools
	project.Gallery = request.Gallery
	project.Features = request.Features

	if err := c.ProjectRepo.Update(tx, project); err != nil {
		c.Log.WithError(err).Error("failed updating project")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to update project")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing update project")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save project update")
	}

	return converter.ProjectToResponse(project), nil
}

func (c *ProjectUseCase) Delete(ctx context.Context, request *model.DeleteProjectRequest) error {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	project := new(entity.Project)
	if err := c.ProjectRepo.FindByIdAndUserId(tx, project, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error finding project by id and user_id")
		return fiber.NewError(fiber.StatusNotFound, "Project not found")
	}

	if err := c.ProjectRepo.Delete(tx, project); err != nil {
		c.Log.WithError(err).Error("error deleting project")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to delete project")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing delete project")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to confirm deletion")
	}

	return nil
}

func (u *ProjectUseCase) UploadThumbnail(ctx context.Context, request *model.UploadImageRequest) (string, error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if request.ID != "" {
		project := new(entity.Project)
		if err := u.ProjectRepo.FindByIdAndUserId(tx, project, request.ID, request.UserID); err != nil {
			u.Log.WithError(err).Error("error getting project")
		} else if project.ImageUrl != "" {
			publicId := utils.ExtractPublicID(project.ImageUrl)
			if err := u.UploadImageRepo.DeleteImage(ctx, publicId); err != nil {
				u.Log.WithError(err).Error("error delete image old")
			}
		}
	}
	
	imageUrl, err := u.UploadImageRepo.UploadImage(ctx, request.Image, "portofy-assets/public/projects")
	if err != nil {
		u.Log.WithError(err).Error("error uploading image")
		return "", fiber.NewError(fiber.StatusInternalServerError, "Failed to upload image")
	}

	if err := tx.Commit().Error; err != nil {
		u.Log.WithError(err).Error("error committing upload project image")
		return "", fiber.NewError(fiber.StatusInternalServerError, "Failed to save project image")
	}

	return imageUrl, nil	
}

func (c *ProjectUseCase) UploadGallery(ctx context.Context, request *model.UploadImageRequest) ([]string, error) {
    tx := c.DB.WithContext(ctx)

    if request.ID != "" {
        project := new(entity.Project)
        if err := c.ProjectRepo.FindByIdAndUserId(tx, project, request.ID, request.UserID); err != nil {
            c.Log.WithError(err).Error("error getting project")
        } else {
            var deleteWg sync.WaitGroup
            deletErrChan := make(chan error, len(project.Gallery))

            for _, gallery := range project.Gallery {
                if gallery.ImageUrl == "" {
                    continue
                }
                deleteWg.Add(1)
                go func(imageUrl string) {
                    defer deleteWg.Done()
                    publicId := utils.ExtractPublicID(imageUrl)

                    if err := c.UploadImageRepo.DeleteImage(ctx, publicId); err != nil {
                        c.Log.WithError(err).Error("error delete old image")
                        deletErrChan <- err
                    }
                }(gallery.ImageUrl)
            }

            deleteWg.Wait()
            close(deletErrChan)
        }
    }

	var(
		wg      sync.WaitGroup
        mu      sync.Mutex
		imageUrls    = make([]string, len(request.Gallery))
		errChan = make(chan error, len(request.Gallery))
	)

    for i, file := range request.Gallery {
		wg.Add(1)
		go func(i int, file *multipart.FileHeader) {
			defer wg.Done()

			imageUrl, err := c.UploadImageRepo.UploadImage(ctx, file, "portofy-assets/public/projects/gallery")
			if err != nil {
				c.Log.WithError(err).Error("error uploading image")
				errChan <- fiber.NewError(fiber.StatusInternalServerError, "Failed to upload image")
				return
			}

			mu.Lock()
            imageUrls[i] = imageUrl
            mu.Unlock()
		}(i, file)
    }

	wg.Wait()
    close(errChan)

	if len(errChan) > 0 {
        return nil, <-errChan
    }

    return imageUrls, nil
}

func (c *ProjectUseCase) BulkDelete(ctx context.Context, request *model.BulkDeleteProjectRequest) error {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	if err := c.ProjectRepo.BulkDeleteByUserIdAndIds(tx, request.UserId, request.ID); err != nil {
		c.Log.WithError(err).Error("error bulk deleting projects")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed bulk delete Projects")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing bulk delete")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed bulk delete Projects")
	}

	return nil
}

func (c *ProjectUseCase) BulkCreate(ctx context.Context, request *model.BulkCreateProjectRequest) ([]model.ProjectResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	entities := make([]entity.Project, len(request.Items))
	for i, item := range request.Items {
		entities[i] = entity.Project{
			ID:          uuid.NewString(),
			UserId:      request.UserId,
			Title:       item.Title,
			Description: item.Description,
			ImageUrl:    item.ImageUrl,
			LinkUrl:     item.LinkUrl,
			Challenge:   item.Challenges,
			Solution:    item.Solution,
			IsFeatured:  item.IsFeatured,
			Tools:       item.Tools,
			Gallery:     item.Gallery,
			Features:    item.Features,
		}
	}

	if err := c.ProjectRepo.BulkCreate(tx, entities); err != nil {
		c.Log.WithError(err).Error("error bulk creating projects")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed bulk create Projects")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing bulk create")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed bulk create Projects")
	}

	responses := make([]model.ProjectResponse, len(entities))
	for i, e := range entities {
		responses[i] = *converter.ProjectToResponse(&e)
	}

	return responses, nil
}

// TODO(post-prod): hapus comment "// Middleware" — bukan nama yang tepat
// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *ProjectUseCase) Search(ctx context.Context, request *model.SearchProjectRequest) ([]model.ProjectResponse, int64, error) {
	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, 0, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	db := c.DB.WithContext(ctx)

	projects, total, err := c.ProjectRepo.Search(db, request)
	if err != nil {
		c.Log.WithError(err).Error("error searching projects")
		return nil, 0, fiber.NewError(fiber.StatusInternalServerError, "Failed getting Projects")
	}

	responses := make([]model.ProjectResponse, len(projects))
	for i, project := range projects {
		responses[i] = *converter.ProjectToResponse(&project)
	}

	return responses, total, nil
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *ProjectUseCase) GetAllByUsername(ctx context.Context, request *model.GetPublicProjectRequest) ([]model.ProjectResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	projects := new([]entity.Project)
	if err := c.ProjectRepo.FindAllByUsername(tx, projects, request.Username); err != nil {
		c.Log.WithError(err).Error("error getting projects by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get projects")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get projects by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get projects")
	}

	responses := make([]model.ProjectResponse, len(*projects))
	for i, project := range *projects {
		responses[i] = *converter.ProjectToResponse(&project)
	}

	return responses, nil
}

// TODO(post-prod): hapus comment "// Middleware" — bukan nama yang tepat
// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *ProjectUseCase) Get(ctx context.Context, request *model.GetByIdProjectRequest) (*model.ProjectResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	project := new(entity.Project)
	if err := c.ProjectRepo.FindByIdAndUserId(tx, project, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting project")
		return nil, fiber.NewError(fiber.StatusNotFound, "Project not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get project")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get project")
	}

	return converter.ProjectToResponse(project), nil
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *ProjectUseCase) GetByUsername(ctx context.Context, request *model.GetPublicProjectByIdRequest) (*model.ProjectResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	project := new(entity.Project)
	if err := c.ProjectRepo.FindByUsername(tx, project, request.Username, request.ID); err != nil {
		// TODO(post-prod): log message bilang "achievement" padahal ini project — fix naming
		c.Log.WithError(err).Error("error getting project by username")
		return nil, fiber.NewError(fiber.StatusNotFound, "Project not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get project by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get project")
	}

	return converter.ProjectToResponse(project), nil
}


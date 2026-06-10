package utils

import "fmt"

func CleanerPrompt(rawText string) string {
	return fmt.Sprintf(`
You are a CV text cleaner. You will receive raw text that was extracted from a PDF.
Your ONLY task is to clean and normalise the text so it is easy to parse.

Rules:
- Fix broken words caused by PDF extraction (e.g. "Soft ware" → "Software").
- Merge lines that belong to the same sentence or bullet point.
- Remove page headers, footers, and page numbers.
- Preserve ALL meaningful content: name, contact info, experience, education, skills, projects.
- Do NOT summarise or remove any information.
- Do NOT convert to JSON or add any markup.
- Return ONLY the cleaned plain text.

RAW TEXT:
"""
%s
"""
`, rawText)
}

// ─── Agent 1a – Profile ───────────────────────────────────────────────────────

func ProfilePrompt(cleanedText string) string {
	return fmt.Sprintf(`
You are an expert CV parser. Extract ONLY the profile section from the CV below.

Rules:
- Return ONLY a raw JSON object — no markdown, no code fences, no explanation.
- All system fields (id, image_url) must be empty string "".
- "about" = full objective/summary paragraph.
- "bio"   = one-sentence summary (you may write it yourself).
- "theme" = always "".
- "tags"  = up to 10 keywords for core expertise (e.g. "Golang", "Docker").
- If a field is missing use "".

Output schema:
{
  "id": "",
  "full_name": "",
  "image_url": "",
  "address": "",
  "about": "",
  "bio": "",
  "theme": "",
  "tags": []
}

CV TEXT:
"""
%s
"""
`, cleanedText)
}

// ─── Agent 1b – Experience ────────────────────────────────────────────────────

func ExperiencePrompt(cleanedText string) string {
	return fmt.Sprintf(`
You are an expert CV parser. Extract ONLY the work experience section from the CV below.

Rules:
- Return ONLY a raw JSON array — no markdown, no code fences, no explanation.
- All system fields (id, link_url, image_url) must be empty string "".
- Dates must be ISO 8601: "2022-01-01T00:00:00Z".
  * Only month+year known  → use 1st of that month.
  * Only year known        → use January 1st.
  * Currently working there (Present / Now / Sekarang) → null (no quotes).
  * Unknown / missing      → null.
  * NEVER use "" for date fields.
- "employment_type": one of Full-time | Part-time | Freelance | Contract | Internship | Self-employed.
- "location_type"  : one of Remote | On-site | Hybrid. Default to "On-site".
- "description"    : combine all bullet points into a newline-separated string.

Output schema (array):
[
  {
    "id": "",
    "position": "",
    "company_name": "",
    "link_url": "",
    "image_url": "",
    "location": "",
    "employment_type": "",
    "location_type": "",
    "start_date": null,
    "end_date": null,
    "description": ""
  }
]

CV TEXT:
"""
%s
"""
`, cleanedText)
}

// ─── Agent 1c – Education ────────────────────────────────────────────────────

func EducationPrompt(cleanedText string) string {
	return fmt.Sprintf(`
You are an expert CV parser. Extract ONLY the education section from the CV below.

Rules:
- Return ONLY a raw JSON array — no markdown, no code fences, no explanation.
- All system fields (id, image_url) must be empty string "".
- Dates: same ISO 8601 rules as experience (null for unknown or current).
- "degree": infer if not explicit (S1 → Bachelor, D3 → Diploma, etc.).
- "grade" : empty string "" if not mentioned.

Output schema (array):
[
  {
    "id": "",
    "institution": "",
    "degree": "",
    "field_of_study": "",
    "grade": "",
    "image_url": "",
    "location": "",
    "start_date": null,
    "end_date": null,
    "description": ""
  }
]

CV TEXT:
"""
%s
"""
`, cleanedText)
}

// ─── Agent 1d – Skills ───────────────────────────────────────────────────────

func SkillsPrompt(cleanedText string) string {
	return fmt.Sprintf(`
You are an expert CV parser. Extract ONLY the skills section from the CV below.

Rules:
- Return ONLY a raw JSON array — no markdown, no code fences, no explanation.
- "id" must always be "".
- "level": one of Beginner | Intermediate | Advanced | Expert.
  Infer from context, years of use, or project complexity. Default to "Intermediate".
- Include ALL skills: programming languages, frameworks, tools, and soft skills.

Output schema (array):
[
  {
    "id": "",
    "title": "",
    "level": ""
  }
]

CV TEXT:
"""
%s
"""
`, cleanedText)
}

// ─── Agent 1e – Projects ─────────────────────────────────────────────────────

func ProjectsPrompt(cleanedText string) string {
	return fmt.Sprintf(`
You are an expert CV parser. Extract ONLY the projects section from the CV below.

Rules:
- Return ONLY a raw JSON array — no markdown, no code fences, no explanation.
- All system fields (id, image_url, link_url) must be "".
- "tools"      : extract tech stack from the project description.
- "featured"   : false unless explicitly stated.
- "challenges" : "" if not mentioned.
- "solution"   : "" if not mentioned.
- "gallery"    : always [].
- "features"   : [] if not explicitly listed.

Output schema (array):
[
  {
    "id": "",
    "title": "",
    "description": "",
    "image_url": "",
    "link_url": "",
    "featured": false,
    "challenges": "",
    "solution": "",
    "tools": [],
    "gallery": [],
    "features": []
  }
]

CV TEXT:
"""
%s
"""
`, cleanedText)
}

// ─── Agent 2 – Reviewer ──────────────────────────────────────────────────────

func ReviewPrompt(assembled string) string {
	return fmt.Sprintf(`
You are a senior CV data quality reviewer.
You will receive a JSON object that was assembled by multiple AI agents parsing a CV.
Your task is to review each section and decide whether it is valid and complete.

Review criteria per section:
- "profile"    : full_name must be non-empty; about and bio must make sense.
- "experiences": each entry must have position, company_name, and a valid start_date.
- "educations" : each entry must have institution and degree.
- "skills"     : at least one skill; level must be one of Beginner|Intermediate|Advanced|Expert.
- "projects"   : each project must have a title and description.

For each section set "valid": true if it passes, false if it has issues.
When "valid" is false, populate "reason" with a short description of what is wrong.

Return ONLY a raw JSON object — no markdown, no code fences.

Output schema:
{
  "verdicts": [
    { "section": "profile",     "valid": true,  "reason": "" },
    { "section": "experience",  "valid": true,  "reason": "" },
    { "section": "education",   "valid": true,  "reason": "" },
    { "section": "skill",       "valid": true,  "reason": "" },
    { "section": "project",     "valid": true,  "reason": "" }
  ]
}

ASSEMBLED CV DATA:
%s
`, assembled)
}
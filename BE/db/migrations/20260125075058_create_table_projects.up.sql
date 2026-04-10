CREATE TABLE projects
(
    id           VARCHAR(36)  NOT NULL,
    user_id      VARCHAR(36)  NOT NULL,
    title        VARCHAR(100) NOT NULL,
    image_url    VARCHAR(255),
    description  TEXT,
    link_url     VARCHAR(255),
    challenge    TEXT,
    solution     TEXT,
    is_featured  BOOLEAN      DEFAULT FALSE,

    -- Kolom JSON untuk data kompleks
    tools        JSON,
    gallery      JSON,
    features     JSON,

    created_at   BIGINT       NOT NULL,
    updated_at   BIGINT       NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_projects_user_id
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE,

    INDEX idx_project_user (user_id)
);
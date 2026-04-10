CREATE TABLE skills
(
    id          VARCHAR(36)  NOT NULL,
    user_id     VARCHAR(36)  NOT NULL,

    title       VARCHAR(50)  NOT NULL,
    level       VARCHAR(20),

    created_at  BIGINT       NOT NULL,
    updated_at  BIGINT       NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_skills_user_id
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE,

    INDEX idx_skill_user (user_id)
);
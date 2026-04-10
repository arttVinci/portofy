CREATE TABLE achievements
(
    id                VARCHAR(36)  NOT NULL,
    user_id           VARCHAR(36)  NOT NULL,
    title             VARCHAR(255) NOT NULL,
    image_url         VARCHAR(255) NOT NULL,
    organization      VARCHAR(255) NOT NULL,
    issued_date       DATETIME(3)  NULL,
    credential_url    VARCHAR(255) NULL,
    credential_id     VARCHAR(100) NULL,

    created_at        BIGINT       NOT NULL,
    updated_at        BIGINT       NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_achievements_user_id
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE,

    INDEX idx_achievement_user (user_id)
)
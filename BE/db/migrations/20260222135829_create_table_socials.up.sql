CREATE TABLE socials
(
    id           VARCHAR(36)  NOT NULL,
    user_id      VARCHAR(36)  NOT NULL,

    platform     VARCHAR(50)  NOT NULL,
    link_url     VARCHAR(255) NOT NULL,

    created_at   BIGINT       NOT NULL,
    updated_at   BIGINT       NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_socials_user_id
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE,

    INDEX idx_social_user (user_id)
);
CREATE TABLE experiences
(
    id              VARCHAR(36)  NOT NULL,
    user_id         VARCHAR(36)  NOT NULL,

    company_name    VARCHAR(100) NOT NULL,
    position        VARCHAR(100) NOT NULL,
    link_url        VARCHAR(255),
    image_url       VARCHAR(255),
    location        VARCHAR(100),

    employment_type VARCHAR(50),
    location_type   VARCHAR(50),

    start_date      DATETIME     NOT NULL,
    end_date        DATETIME,

    description     TEXT,

    created_at      BIGINT       NOT NULL,
    updated_at      BIGINT       NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_experiences_user_id
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE,

    INDEX idx_experience_user (user_id)
);
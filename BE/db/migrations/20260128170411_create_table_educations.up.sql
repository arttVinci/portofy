CREATE TABLE educations
(
    id             VARCHAR(36)  NOT NULL,
    user_id        VARCHAR(36)  NOT NULL,

    institution    VARCHAR(100) NOT NULL,
    degree         VARCHAR(100),
    field_of_study VARCHAR(100),
    grade          VARCHAR(20),

    image_url      VARCHAR(255),
    location       VARCHAR(100),

    start_date     DATETIME     NOT NULL,
    end_date       DATETIME,

    description    TEXT,

    created_at     BIGINT       NOT NULL,
    updated_at     BIGINT       NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_educations_user_id
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE,

    INDEX idx_education_user (user_id)
);
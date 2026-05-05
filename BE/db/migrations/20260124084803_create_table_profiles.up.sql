CREATE TABLE profiles
(
    id                VARCHAR(36)  NOT NULL,
    user_id           VARCHAR(36)  NOT NULL,
    full_name         VARCHAR(100) NOT NULL,
    image_url         VARCHAR(255) NOT NULL,
    address           VARCHAR(200) NOT NULL,
    about             TEXT         NULL,
    bio               TEXT         NULL,
    theme             VARCHAR(50)  DEFAULT 'default',

    tags              JSON,

    created_at        BIGINT       NOT NULL,
    updated_at        BIGINT       NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_profiles_user_id
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE,

    INDEX idx_profile_user (user_id)
)

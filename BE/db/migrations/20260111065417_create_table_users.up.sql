CREATE TABLE users
(
    id         VARCHAR(36)  NOT NULL,
    username   VARCHAR(50)  NOT NULL,
    password   VARCHAR(255) NOT NULL,
    email      VARCHAR(100) NOT NULL,

    created_at BIGINT       NOT NULL,
    updated_at BIGINT       NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX idx_users_username (username)
)
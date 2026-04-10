CREATE TABLE templates
(
    id           VARCHAR(36)  NOT NULL,
    name         VARCHAR(100) NOT NULL,
    category     VARCHAR(50)  NOT NULL,
    tags         JSON,
    description  VARCHAR(255),
    badge        VARCHAR(50),
    used_count   INT          DEFAULT 0,
    is_pro       BOOLEAN      DEFAULT FALSE,

    created_at   BIGINT       NOT NULL,
    updated_at   BIGINT       NOT NULL,

    PRIMARY KEY (id),

    INDEX idx_template_category (category)
)
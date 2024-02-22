DROP TABLE IF EXISTS `todos`;

CREATE TABLE IF NOT EXISTS `todos` (
    `id`         INT UNSIGNED AUTO_INCREMENT,
    `title`      TEXT NOT NULL,
    `status`     ENUM('pending', 'completed') DEFAULT 'pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `update_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
);

INSERT INTO todos (
    id, title
) VALUES
(
    1, "タイトル1"
);
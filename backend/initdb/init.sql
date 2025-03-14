CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE user_likes (
    liker_id BIGINT NOT NULL,
    liked_id BIGINT NOT NULL,
    PRIMARY KEY (liker_id, liked_id),
    FOREIGN KEY (liker_id) REFERENCES userentity(id) ON DELETE CASCADE,
    FOREIGN KEY (liked_id) REFERENCES userentity(id) ON DELETE CASCADE,
    CHECK (liker_id <> liked_id)
);


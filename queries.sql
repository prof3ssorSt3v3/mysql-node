CREATE DATABASE media;
-- THIS IS A COMMENT IN SQL

CREATE USER 'name'@'localhost' IDENTIFIED BY 'password';

CREATE TABLE IF NOT EXISTS movies (
  movie_id INT unsigned PRIMARY KEY AUTO_INCREMENT,
  movie_title VARCHAR(255) NOT NULL,
  release_date DATE
);

CREATE TABLE IF NOT EXISTS users (
  user_id INT unsigned PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(128) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_type ENUM('ADMIN', 'GUEST') DEFAULT 'GUEST'
);

CREATE TABLE IF NOT EXISTS ratings (
  movie_id INT unsigned NOT NULL,
  user_id INT unsigned NOT NULL,
  rating TINYINT unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY(movie_id, user_id) 
);

ALTER TABLE users
ADD hairstyle CHAR;

ALTER TABLE users
RENAME COLUMN hairstyle TO haircolor;

ALTER TABLE users
DROP COLUMN haircolor;

GRANT CREATE, ALTER, DROP, REFERENCES, INSERT, UPDATE, SELECT, DELETE 
ON media.* TO 'name'@'localhost';

-- GET /api/movies
SELECT movie_id, movie_title, release_date 
FROM movies 
ORDER BY movie_title;

-- GET /api/movies/:id
SELECT movie_id, movie_title, release_date 
FROM movies
WHERE movie_id= ?;

-- GET /api/movies/ratings
SELECT m.movie_id, m.movie_title, AVERAGE(r.rating) AS rate 
FROM movies AS m INNER JOIN ratings AS r 
ON m.movie_id = r.movie_id
GROUP BY m.movie_id, m.movie_title;

-- POST /api/movies
INSERT INTO movies(movie_title, release_date)
VALUES(?, ?);

-- POST /api/users
INSERT INTO users(username, email, user_type)
VALUES(?, ?, 'GUEST');

-- POST /api/movie/ratings
INSERT INTO ratings(movie_id, user_id, rating)
VALUES(?, ?, ?);

-- PUT /api/movies/:id
UPDATE movies 
SET movie_title=?,
release_date=?
WHERE movie_id = ?;

-- DELETE /api/movies/:id
DELETE FROM movies
WHERE movie_id= ?;

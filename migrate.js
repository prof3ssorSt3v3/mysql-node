import { connect } from './connect.js';

const sqlA = `CREATE TABLE IF NOT EXISTS movies (
  movie_id INT unsigned PRIMARY KEY AUTO_INCREMENT,
  movie_title VARCHAR(255) NOT NULL,
  release_date DATE
)`;

const sqlB = `CREATE TABLE IF NOT EXISTS users (
  user_id INT unsigned PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(128) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_type ENUM('ADMIN', 'GUEST') DEFAULT 'GUEST'
)`;

const sqlC = `CREATE TABLE IF NOT EXISTS ratings (
  movie_id INT unsigned NOT NULL,
  user_id INT unsigned NOT NULL,
  rating TINYINT unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY(movie_id, user_id) 
)`;

// const sqlD = `ALTER TABLE users
// ADD hairstyle CHAR`;

// const sqlE = `ALTER TABLE users
// RENAME COLUMN hairstyle TO haircolor`;

// const sqlF = `ALTER TABLE users
// DROP COLUMN haircolor`;

const sqlG = ``;

(async function migrateDB() {
  try {
    const connection = await connect();
    await connection.query(sqlA);
    await connection.query(sqlB);
    await connection.query(sqlC);
    // await connection.query(sqlD);
    // await connection.query(sqlE);
    // await connection.query(sqlF);
    console.log('Database has been updated');
  } catch (err) {
    console.log('Failed to Update DB');
    console.log(err);
  }
})();

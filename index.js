import express from 'express';
import { connect } from './connect.js';
const app = express();
app.use(express.json());

app.listen(5001, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('Listening on port 5001');
});

app.get('/', (req, res) => {
  res.status(200);
  res.header('content-type', 'application/json');
  res.send(`{"message":"Success"}`);
});

app.get('/api/movies', async (req, res) => {
  try {
    const connection = await connect();
    const sql = `SELECT movie_id, movie_title, release_date 
      FROM movies 
      ORDER BY movie_title`;
    const [result, fields] = await connection.query(sql);
    let data = { movies: [] };
    result.forEach(({ movie_id, movie_title, release_date }) => {
      data.movies.push({ movie_id, movie_title, release_date });
    });
    res.status(200);
    res.header('content-type', 'application/json');
    const content = JSON.stringify(data);
    res.send(content);
  } catch (err) {
    handleErrorResponse(res, err, 452);
    //452 - 496 are free to use
  }
});

function handleErrorResponse(res, err, code) {
  console.log('ERROR:', err);
  res.status(code);
  res.header('content-type', 'application/json');
  res.send(`{"Error": ${code}, "message":${err.message}}`);
}

app.post('/api/users', async (req, res) => {
  const connection = await connect();
  // {"username": "Quentin", "email": "q@taratinofilms.org"}
  let username = req.body.username;
  let email = req.body.email;
  const sql = `INSERT INTO users(username, email, user_type)
    VALUES(?, ?, 'GUEST')`;
  connection
    .execute(sql, [username, email])
    .then(([result, fields]) => {
      console.log(fields);
      let id = result.insertId; //the id of the new row in the users table

      res.status(200);
      res.header('content-type', 'application/json');
      const content = `{"message":"New user id is ${id}"}`;
      res.send(content);
    })
    .catch((err) => {
      handleErrorResponse(res, err, 454);
    });
});

app.put('/api/movies/:id', async (req, res) => {
  let title = req.body.movie_title;
  let date = req.body.release_date;
  //let movie_id = req.body.movie_id
  let movie_id = req.params.id;
  const connection = await connect();
  const sql = `UPDATE movies 
    SET movie_title=?,
    release_date=?
    WHERE movie_id = ?`;
  connection
    .execute(sql, [title, date, movie_id])
    .then(([result, fields]) => {
      console.log(fields);
      let affected = result.affectedRows; //how many rows were updated
      // if(affected === 0) throw new Error('No rows changed');
      res.status(200);
      res.header('content-type', 'application/json');
      const content = `{"message":"Movie id ${movie_id} was updated."}`;
      res.send(content);
    })
    .catch((err) => {
      handleErrorResponse(res, err, 455);
    });
});

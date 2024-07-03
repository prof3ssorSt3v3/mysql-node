import mysql from 'mysql2/promise';

const connString = 'mysql://alien:predator@localhost:8889/media';

function connect() {
  return mysql.createConnection(connString).catch((err) => {
    console.log(err);
    return err;
  });

  mysql.createConnection({
    host: '',
    user: '',
    port: 3306,
    database: '',
    password: '',
  });
}

export { connect };

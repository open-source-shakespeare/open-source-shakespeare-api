import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Character } from './models/Character';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

async function getCharacters(): Promise<Character[]> {
  const [result] = await pool.query("SELECT * FROM characters")
  return result as Character[];
}

(async () => {
  try {
    const text = await getCharacters();
    console.log(text);
  } catch (e) {
    console.error(e);
  }
})();

// const connection = mysql.createConnection({
  // host: process.env.MYSQL_HOST,
  // user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the MySQL server:', err.stack);
//     return;
//   }
//   console.log('Connected to the MySQL server.');

//   connection.query('SELECT * FROM chapters WHERE ChapterID = 24930', (err, results) => {
//     if (err) {
//       console.error('Error running query:', err.stack);
//       return;
//     }
//     console.log('Query results:', results);
//     connection.end();
//   });
// });
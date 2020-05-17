const pool = require("../databasePool");

const newTuno = ({ firstName, lastName }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO tuno("firstName", "lastName") VALUES($1, $2) RETURNING id',
      [firstName, lastName],
      (error, response) => {
        if (error) {
          return reject(error);
        }
        const id = response.rows[0].id;
        resolve({ id });
      }
    );
  });
};

const getTuno = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM tuno WHERE "id" = $1',
      [id],
      (error, response) => {
        console.log({ error, response });
        if (error) {
          reject(error);
        }
        const isExisting = response.rowCount > 0;
        const tuno = response.rows[0];
        resolve({ tuno, isExisting });
      }
    );
  });
};

const updateTuno = (id, { firstName, lastName }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tuno 
      SET "firstName" = $2, "lastName" = $3 
      WHERE id = $1 
      RETURNING "firstName", "lastName"`,
      [id, firstName, lastName],
      (error, response) => {
        console.log({ error, response });
        if (error) {
          return reject(error);
        }
        const { firstName, lastName } = response.rows[0];
        const isExisting = response.rowCount > 0;
        resolve({ id, isExisting, firstName, lastName });
      }
    );
  });
};

const deleteTuno = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM tuno WHERE "id" = $1', [id], (error, response) => {
      if (error) {
        return reject(error);
      }
      console.log({ response });
      const isExisting = response.rowCount > 0;
      resolve({ id, isExisting });
    });
  });
};

module.exports = { newTuno, getTuno, deleteTuno, updateTuno };

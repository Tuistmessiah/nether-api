const pool = require("../dbPool");

/* ACRUD (All + CRUD):
 * all
 * create
 * read
 * update
 * delete
 * */

// TODO: Make it possible to call these functions like this: acrud('tuno').create(content)

module.exports = {
  allEntity,
  createEntity,
  readEntity,
  updateEntity,
  deleteEntity,
};

function allEntity(entityName) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ${entityName}`, [], (error, response) => {
      if (error) {
        return reject(error);
      }
      const content = { [entityName + "s"]: response.rows };
      return resolve(content);
    });
  });
}

function createEntity(entityName, content) {
  const queryCols = Object.keys(content).join();
  const queryValues = Object.values(content);
  const queryValIndexes = Array(queryValues.length)
    .fill()
    .map((val, i) => "$" + (i + 1))
    .join();

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO ${entityName}(${queryCols}) VALUES(${queryValIndexes}) RETURNING id`,
      queryValues,
      (error, response) => {
        if (error) {
          return reject(error);
        }
        const id = response.rows[0].id;
        return resolve({ id });
      }
    );
  });
}

function readEntity(entityName, id) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM ${entityName} WHERE "id" = $1`,
      [id],
      (error, response) => {
        if (error) {
          return reject(error);
        }
        const isExisting = response.rowCount > 0;
        const content = { [entityName]: response.rows[0] };
        return resolve({ id, isExisting, content });
      }
    );
  });
}

function updateEntity(entityName, id, content) {
  const queryCols = Object.keys(content).join();
  const queryValues = Object.values(content);
  const queryColSet = Object.keys(content)
    .map((key, i) => key + " = $" + (i + 2))
    .join();

  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE ${entityName} 
      SET ${queryColSet} 
      WHERE id = $1 
      RETURNING ${queryCols}`,
      [id, ...queryValues],
      (error, response) => {
        if (error) {
          return reject(error);
        }
        const content = { [entityName]: response.rows[0] };
        const isExisting = response.rowCount > 0;
        return resolve({ id, isExisting, content });
      }
    );
  });
}

function deleteEntity(entityName, id) {
  console.log({ entityName, id });
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM ${entityName} WHERE "id" = $1`,
      [id],
      (error, response) => {
        if (error) {
          return reject(error);
        }
        const isExisting = response.rowCount > 0;
        return resolve({ id, isExisting });
      }
    );
  });
}

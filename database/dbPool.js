const { Pool } = require("pg");
const databaseConfiguration = require("./db-configuration.json");

if (!databaseConfiguration) {
  throw new Error(
    "Need a 'databaseConfiguration.json' for database credentials."
  );
}

const pool = new Pool(databaseConfiguration);

module.exports = pool;

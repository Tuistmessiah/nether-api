require("dotenv").config();

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();

const { Client } = require("pg");
let client = {};

console.log(`Running ${process.env.NODE_API_ENV} mode`);
if (process.env.NODE_API_ENV === "development") {
  client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "postgres123",
  });
} else {
  client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "postgres123",
  });
}

let values = {};

execute();

async function execute() {
  try {
    await client.connect();
    console.log("Connected successfully.");
    //await client.query("insert into employees values (1, 'John')")

    const { rows } = await client.query('SELECT * FROM public."testTable"');
    values = rows;
    console.table(rows);
  } catch (ex) {
    console.log(`Something wrong happend ${ex}`);
  } finally {
    await client.end();
    console.log("Client disconnected successfully.");
  }
}

// client
// .connect()
// .then(() => {
//   console.log("connected!");
// })
// .then(() => {
//   return client.query('SELECT * FROM public."testTable"');
// })
// .then((results) => {
//   console.table(results.rows);
// })
// .catch((error) => {
//   console.error(error);
// })
// .finally(() => {
//   client.end();
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log({ values });
  res.send({ message: "Welcome to your App!", values });
});

app.get("/users", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json("Error occured!");
    });
});

app.post("/getUserById", (req, res) => {
  if (!req.body.id) {
    res.json("No ID found in reqest body.");
  } else {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${req.body.id}`)
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        res.json("Error occured!");
      });
  }
});

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`);
});

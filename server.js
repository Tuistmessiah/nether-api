require("dotenv").config();

const tunoRouter = require("./api/tuno-router");

const express = require("express");

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/tuno", tunoRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message,
  });
});

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Nether API, check available sub-apis!",
    content: {
      tuistWebsiteAPI: {
        description: "(WIP) API for my tuist-website project",
        endpoint: "/tuno",
      },
    },
  });
});

app.listen(PORT, function () {
  console.info(`Express server listening on port ${PORT}`);
});

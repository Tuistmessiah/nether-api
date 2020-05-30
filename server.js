require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Frontend certificate
const auth = require("./server-auth.json");

const tunoRouter = require("./api/tuno-router");
const sectionRouter = require("./api/section-router");
const soundRouter = require("./api/sound-router");

const PORT = process.env.PORT || 5000;

const NUMBER_REQUESTS_PER_INTERVAL = 10; // requests
const TOTAL_NUMBER_REQUESTS_PER_INTERVAL = 1000; // requests
const INTERVAL_OF_IP_CHECKING = 1000; // 1 second
const NUMBER_ALLOWED_OVERFLOWS = 10; // req overflow attempts
const INTERVAL_OF_BLACKLIST = 1000 * 60 * 60; // 1 hour

// TODO: security, protect again stupidly big JSONs
// TODO: improve status codes and messages of errors
// TODO: Make security system with encrypted tokens
// TODO: Make all security sensitive information coming from the server-auth.json

app.use(cors({ origin: auth["cors-origin"], credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Basic DDoS protection
let ipChecker = {};
let blackList = {};
let totalNumber = 0;

setInterval(() => {
  ipChecker = {};
  totalNumber = 0;
}, INTERVAL_OF_IP_CHECKING);

setInterval(() => {
  blackList = {};
}, INTERVAL_OF_BLACKLIST);

app.all("*", (req, res, next) => {
  totalNumber += 1 || 0;
  ipChecker[req.ip] += 1 || 0;

  // Limit req / ip / second
  if (ipChecker.hasOwnProperty(req.ip)) {
    if (ipChecker[req.ip] > NUMBER_REQUESTS_PER_INTERVAL) {
      blackList[req.ip] += 1 || 0;
      res.status(505).json({
        error: "Too many requests!",
      });
      return;
    }
  }

  // Limit ALL req / second
  if (totalNumber > TOTAL_NUMBER_REQUESTS_PER_INTERVAL) {
    res.status(505).json({
      error: "Server is overflooded!",
    });
    return;
  }

  // Black list IPs / hour after
  if (
    blackList.hasOwnProperty(req.ip) &&
    blackList[req.ip] > NUMBER_ALLOWED_OVERFLOWS
  ) {
    res.status(505).json({
      error: `This IP has been tagged in the black list for ${Math.ceil(
        INTERVAL_OF_BLACKLIST / 3600
      )} hours!`,
    });
    return;
  }

  next();
});

// Authentication
app.all("*", (req, res, next) => {
  if (req.get("basicToken") !== auth["api-token"]) {
    res.status(505).json({
      error: `No correct authentication: Include as header 'basicToken'`,
    });
    return;
  }
  next();
});

// Routing
app.use("/tuno", tunoRouter);
app.use("/section", sectionRouter);
app.use("/sound", soundRouter);

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message,
  });
});

// Root
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Nether API, check available sub-apis!",
    content: {
      tuistWebsiteAPI: {
        description: "(WIP) API for my tuist-website project",
        links: ["https://github.com/Tuistmessiah/tuist-website"],
        endpoints: ["/tuno", "/section", "/sound"],
      },
    },
  });
});

app.listen(PORT, function () {
  console.info(`Express server listening on port ${PORT}`);
});

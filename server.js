require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const tunoRouter = require("./api/tuno-router");
const sectionRouter = require("./api/section-router");

const PORT = process.env.PORT || 5000;
const TOTAL_NUMBER_REQUESTS_PER_SECOND = 1000; // 1000 requests
const INTERVAL_OF_IP_CHECKING = 1000; // 1 second
const INTERVAL_OF_BLACKLIST = 1000 * 3600; // 1 hour

// TODO: security, protect again stupidly big JSONs
// TODO: improve status codes and messages of errors

app.use(cors({ origin: "http://localhost:3010", credentials: true }));
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
  // Black list IPs / hour
  if (blackList[req.ip]) {
    res.status(505).json({
      error: "Too many requests!",
    });
  }

  // Limit total req / second
  if (totalNumber < TOTAL_NUMBER_REQUESTS_PER_SECOND) {
    res.status(505).json({
      error: "Too many requests!",
    });
  }

  // Register entry
  if (ipChecker.hasOwnProperty(req.ip)) {
    if (ipChecker[req.ip] > 10) {
      blackList[req.ip] = true;
      res.status(505).json({
        error: "Too many requests!",
      });
    }
    ipChecker[req.ip] = ipChecker[req.ip] + 1;
  } else {
    ipChecker[req.ip] = 0;
  }

  next();
});

// Routing
app.use("/tuno", tunoRouter);
app.use("/section", sectionRouter);

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
        endpoint: "/tuno",
      },
    },
  });
});

app.listen(PORT, function () {
  console.info(`Express server listening on port ${PORT}`);
});

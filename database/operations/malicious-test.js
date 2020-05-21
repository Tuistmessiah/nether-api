for (let i = 0; i < 10000; i++) {
  let request = require("request");

  let options = {
    method: "GET",
    url: "http://localhost:5000/tuno/all",
    headers: {},
  };
  console.info("req:", i);
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.info("res:", i);
  });
}

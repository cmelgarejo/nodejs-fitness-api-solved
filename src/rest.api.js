// * You may uncomment one of these modules:
const express = require("express");
// const koa = require('koa');
// const hapi = require('@hapi/hapi');
// const restify = require('restify');

var app = require("express")();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = (stepService) => {
  const REST_PORT = 8080;

  // * TODO: Write the GET endpoint, using `stepService` for data access
  // * TODO: Return object containing `close()` method for shutting down the server
  // Get number of steps
  app.get("/users/:username/steps", async (req, res) => {
    try {
      var result = await stepService.get(req.params.username);
      res.setHeader("Content-Type", "application/json");
      if (!result) return res.status(404).send({ error: "User doesn't exist" });
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  });

  return app.listen(REST_PORT, function () {
    console.log("listening on *:", REST_PORT);
  });
};

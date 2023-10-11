module.exports = app => {
  const clients = require("../controllers/client.controller.js");

  var router = require("express").Router();

  // Create a new Client
  router.post("/", clients.create);

  router.get("/list_client", clients.findAll);

  app.use('/api/clients', router);
};
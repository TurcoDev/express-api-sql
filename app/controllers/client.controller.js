const Client = require("../models/client.model.js");

// Create and Save a new Client
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Client
  const client = new Client({
    nameClient: req.body.nameClient,
    lastnameClient: req.body.lastnameClient,
    imgURL: req.body.imgURL || false
  });

  // Save Client in the database
  Client.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    else res.send(data);
  });
};
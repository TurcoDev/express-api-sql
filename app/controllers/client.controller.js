const Client = require("../models/client.model.js");
const path = require('path');

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

// Retrieve all Client from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Client.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.render('pages/index', {
      clients: data
    });
  });
};



exports.setClient = (req, res) => {
  res.sendFile(path.resolve('public/form.html'));
};
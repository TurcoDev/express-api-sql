const sql = require("./dbConnect.js");

// constructor
const Client = function(client) {
  this.nameClient = client.nameClient;
  this.lastnameClient = client.lastnameClient;
  this.imgURL = client.imgURL;
};

Client.create = (newClient, result) => {
  sql.query("INSERT INTO clients SET ?", newClient, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }

    console.log("created client: ", { id: res.insertId, ...newClient });
    result(null, { id: res.insertId, ...newClient });
  });
};

module.exports = Client;
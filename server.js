const express = require('express');
const app = express();
const cors = require("cors");
const Client = require("./app/models/client.model.js");



const port = 3000;


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


/**
 * Voy a consumir api random user
 * https://randomuser.me/documentation
 * https://randomuser.me/api/?results=5
 * optimizamos con
 * https://randomuser.me/api/?results=5&inc=gender,name,picture
 */
app.get('/', (req, res) => {
  fetch('https://randomuser.me/api/?results=5&inc=gender,name,picture')
    .then(response => response.json())
    .then(data => {
      console.log(data.results);
      res.json(data.results);
      data.results.forEach(element => {
        // Create a Client
        const client = new Client({
          nameClient: element.name.first,
          lastnameClient: element.name.last,
          imgURL: element.picture.large || false
        });

        // Save Client in the database
        Client.create(client, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Client."
            });
          // else res.send(data);
        });
      });
      // debemos llamar a la funcion que cargará los datos a la base
      /**
       * data.result[0].gender
       * data.result.forEach
       * 
       * setClient(client)
       */
    });
})

require("./app/routes/client.routes.js")(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
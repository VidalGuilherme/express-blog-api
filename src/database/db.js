const mongoose = require("mongoose");

const conn = () => {
  mongoose
    .connect(
      "mongodb+srv://azinovations:bGaYQGiaEqOj0NeL@azinovation.s6bqeg5.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDb Atlas Conectado com Sucesso!"))
    .catch((error) => console.log(error));
};

module.exports = conn;

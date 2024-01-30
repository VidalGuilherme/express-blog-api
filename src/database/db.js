import mongoose from "mongoose";

const conn = () => {
  mongoose
    .connect(
      process.env.MONGODB_URI,
      { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      }
    )
    .then(() => console.log("MongoDb Atlas Conectado com Sucesso!"))
    .catch((error) => console.log(error));
};

export default conn;

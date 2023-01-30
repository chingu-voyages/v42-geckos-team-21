const mongoose = require("mongoose");
DATABASE = require("../server");
const DB_URI_BEGINNING = process.env.DB_URI_BEGINNING;


mongoose
  // .connect(`mongodb://127.0.0.1/${DATABASE}`, {
  .connect(`${DB_URI_BEGINNING}/${DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Established a connection to the database"))
  .catch((err) =>
    console.log("Something went wrong when connecting to the database ", err)
  );
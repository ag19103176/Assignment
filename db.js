const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ankitgupta983983:teqs4NvvTaAQKgBr@cluster0.6zpxc86.mongodb.net/"
);
var db = mongoose.connection;
db.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});
db.on("error", () => {
  console.log(`Mongo DB Connection failed`);
});

module.exports = mongoose;

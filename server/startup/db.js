const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost/startup-template";

module.exports = function () {
  
  

  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB!", err));
};

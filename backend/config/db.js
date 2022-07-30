const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(
      "mongodb://localhost:27017/instagram"
    );
    console.log("connected to database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;

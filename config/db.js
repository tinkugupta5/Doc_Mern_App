const mongoose = require("mongoose");
const colors = require("colors");

//  <!--=============== Data Base Connection  ===============-->

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongdb server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;

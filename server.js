const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB =
  //  <!--=============== Time stap  ===============-->

  //  <!--=============== dot env config ===============-->

  dotenv.config();

//  <!--=============== mongodb connection ===============-->

connectDB();
//  <!--=============== Rest object ===============-->

const app = express();

//  <!--=============== Middlewares ===============-->

app.use(express.json()); //use for preventing from parsing error
app.use(morgan("dev")); // how much time taken by quries and aslo show route end point

//  <!--=============== Routes ===============-->

app.use("/api/v1/user", require("./routes/userRoutes"));

//  <!--=============== Port ===============-->

const port = process.env.PORT || 8080; //process.env.PORT-ENVIRONMENTAL VARIABLE

//  <!--=============== Listen port ===============-->

app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on  port of ${process.env.PORT} `
      .bgCyan.white
  );
});

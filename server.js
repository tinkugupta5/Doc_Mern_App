const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");

//  <!--=============== Time stap  ===============-->
// plylist - 3 - 0000

//  <!--=============== dot env config ===============-->

dotenv.config();

//  <!--=============== Rest object ===============-->

const app = express();

//  <!--=============== Middlewares ===============-->

app.use(express.json()); //use for preventing from parsing error
app.use(morgan("dev"));

//  <!--=============== Routes ===============-->

app.get("/", (req, res) => {
  res.status(200).send({
    message: "server runnning",
  });
});

//  <!--=============== Port ===============-->

const port = process.env.PORT || 8080; //process.env.PORT-ENVIRONMENTAL VARIABLE

//  <!--=============== Listen port ===============-->

app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT} `
      .bgCyan.white
  );
});

const JWT = require("jsonwebtoken");
//  <!--=============== Middle Ware Function  ===============-->

module.export = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {});
};

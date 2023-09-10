const jwt = require("jsonwebtoken");
const User = require("../models/user");
authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, "98kirtikmarseqnjde132323123232kjcdbcf");
    console.log(">>>>>>>>>>user",user)
    User.findByPk(user.userId)
      .then((user) => {
        req.user = user;
        next();
        
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: "false" });
  }
};

module.exports = { authenticate };

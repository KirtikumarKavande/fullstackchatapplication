const signupUserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id, name) => {
  return jwt.sign(
    { userId: id, name: name },
    "98kirtikmarseqnjde132323123232kjcdbcf"
  );
};
const signUpUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
        statusCode: 400,
      });
    }

    const existingUser = await signupUserModel.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists", statusCode: 400 });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      await signupUserModel.create({ name, email, password: hash });
      res
        .status(200)
        .json({ message: "user created successfully", statusCode: 200 });
      if (err) {
        throw new Error("something went wrong");
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
      statusCode: 500,
    });
  }
};

const signInUser = async (req, res, next) => {
  console.log("email", req.body.email);
  try {
    const data = await signupUserModel.findAll({
      where: { email: req.body.email },
    });

    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          throw new Error("something went wrong");
        }

        if (result === true) {
          res.status(201).json({
            success: true,
            message: "sign in success",
            token: generateAccessToken(data[0].id, data[0].name),
            statusCode: 200,
            data,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "password is invalid",
            statusCode: 400,
          });
        }
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "user not found", statusCode: 400 });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err, statusCode: 500 });
  }
};
const getalluser = async (req, res) => {
  try {
    const data = await signupUserModel.findAll();
    res.status(200).json({ success: true, message: data, statusCode: 200 });
  } catch (err) {
    res.status(500).json({ success: false, message: err, statusCode: 500 });
  }
};

module.exports = { generateAccessToken, signUpUser, signInUser, getalluser };

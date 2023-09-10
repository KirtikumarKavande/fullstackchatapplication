const signupUserModel = require("../models/user");

const user = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/signup", user.signUpUser);
router.post("/signin", user.signInUser);

module.exports = router;

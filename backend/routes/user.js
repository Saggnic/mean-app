const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
//var bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  console.log("in node server");
  bcrypt.hash(req.body.password, salt).then(hash => {
    const newUser = new User({
      email: req.body.email, //test2@test.com
      //password: req.body.password, //bad way to save password...it needs to be encrypted first
      password: hash //test1
    });
    newUser
      .save()
      .then(result => {
        res.status(201).json({
          message: "user is created",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

module.exports = router;

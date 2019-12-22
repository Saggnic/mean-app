const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
// var bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  console.log("in node server");
  bcrypt.hash(req.body.password, salt).then(hash => {
    const newUser = new User({
      email: req.body.email,
      // test2@test.com
      // password: req.body.password, //bad way to save password...it needs to be encrypted first
      password: hash // test1
    });
    newUser
      .save()
      .then(result => {
        res.status(201).json({ message: "user is created", result: result });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(405).json({ message: "invalid email" });
      }
      fetchedUser = user;
      //console.log(req.body.password);

      // console.log("User  :" + fetchedUser);
      //console.log("User password :" + fetchedUser.password);
      return bcrypt.compare(req.body.password, "" + user.password); //compare the hashed password in db to non-hashed passwrd in login
    })
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(405).json({ message: "Password mismatched" });
      }
      //if the password matches and all goes well then create the JWT
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "long_secret_key_of_your_choice",
        {
          expiresIn: "1h" //1 hour
        }
      );
      console.log(jwt);
      res.status(200).json({
        token: token,
        message: "logged in",
        expiresIn: 3600
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(405).json({ message: "invalid credential" });
    });
});
module.exports = router;

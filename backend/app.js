const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //to enable CORS :Cross Origin Resource Sharing property since
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept" // the incomming request may have these extra headerS
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  ); //OPTIONS is sent by browser prior to check if request is valid
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  //console.log(post);
  res.status(201).json({
    message: "post creation done"
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "a",
      title: "Default Post1",
      content: "Post from Server"
    },
    {
      id: "b",
      title: "Default Post2",
      content: "Post from Server"
    }
  ];
  res.status(200).json({
    message: "Post Fetched Successfully",
    posts: posts
  });
});

module.exports = app;

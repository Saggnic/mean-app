const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  //schema format like that in front end model
  title: { type: String, required: true }, //in typescript :'string' but in NodeJs ans JS :'String'
  content: { type: String, default: true }
});

//now we convert the schema into model
module.exports = mongoose.model("Post", postSchema); //exporting so that can be used from other class.

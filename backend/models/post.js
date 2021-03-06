const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } //ref means which schema is the object related to
});

//now we convert the schema into model
module.exports = mongoose.model("Post", postSchema); //exporting so that can be used from other class.

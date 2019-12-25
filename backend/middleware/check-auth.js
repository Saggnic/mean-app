//If we do have a token and if that's valid
const jwt = require("jsonwebtoken");

//we are exporting this as a typical middleware so we can import and use it in the post.js file
module.exports = (req, res, next) => {
  try {
    //console.log(req.headers.authorization);
    //the token is of form : "Bearer kkhkjcsmdvn" ,so we split into array and only consider the array and not the 'Bearer
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, "long_secret_key_of_your_choice"); //same secret key as used in server to create
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next(); //if jwt validation is successful then letting the execution continue
  } catch (e) {
    //console.log(e);
    res.status(401).json({
      message: "401:Not Authenticated"
    });
  }
};

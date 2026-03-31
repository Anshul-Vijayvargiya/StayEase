const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const User = require("../models/user");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup");
}



module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log("User saved:", registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
      return next(err);
      }
    });

    req.flash("success", "Welcome to StayEase!");
    res.redirect("/listings");

  } catch (err) {
    console.log("Signup error:", err);
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};


module.exports.renderloginform = (req, res) => {
  res.render("users/login");
};


module.exports.login = (req, res) => {

    req.flash("success", "Welcome Back to StayEase!");

  let redirectUrl = res.locals.redirectUrl || "/listings";
res.redirect(redirectUrl);
  }



  module.exports.logout =  (req, res,next) => {
  req.logout(function(err){
    if (err) {
      next(err);
    } else {
      req.flash("success", "You have successfully logged out.");
      res.redirect("/listings");
    }
  })

  }
const express = require("express");
const router = express.Router();

const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const controller = require("../controllers/user.js");

// ================= SIGNUP =================

// show signup page
router.get("/signup", controller.renderSignup); 



router.post("/signup", wrapAsync(controller.signup)
);


// ================= LOGIN =================

// show login page
router.get("/login",controller.renderloginform);

// handle login
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login"
  }),
  controller.login
);

router.get("/logout",controller.logout);



module.exports = router;
const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");

const controller = require("../controllers/reviews.js");



// ================= CREATE REVIEW =================

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(controller.createReview)
);


// ================= DELETE REVIEW =================

router.delete(
  "/:reviewId",
 
    isLoggedIn,
     isreviewAuthor,
  wrapAsync(controller.deleteReview)
);


module.exports = router;
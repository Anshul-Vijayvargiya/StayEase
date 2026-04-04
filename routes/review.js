const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");

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
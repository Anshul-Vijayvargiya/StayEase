const express = require("express");
const router = express.Router();   // ✅ FIXED
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("./review");
const { validateListing } = require("../middleware.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const controller = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});




// ================= ROUTES =================

// INDEX
router.route("/")
.get( wrapAsync(controller.index))
.post(
  isLoggedIn, 
  upload.single("listing[image]"),
  validateListing, 
  wrapAsync(controller.createListing)
);


// NEW
router.get("/new", isLoggedIn, controller.renderNewForm);

router.route("/:id")
.get( wrapAsync(controller.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(controller.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
   wrapAsync(controller.deleteListing));



//===================== EDIT======================//

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(controller.renderEditForm));











module.exports = router;   // ✅ FIXED
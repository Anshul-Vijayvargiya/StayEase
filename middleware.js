const Listings = require("./models/listing");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const  { reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");



module.exports.isLoggedIn = (req, res, next) => {
    
if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
}
next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
}
next();
};


module.exports.isOwner = async(req,res,next)=>{
    const { id } = req.params;
    const listings =await Listings.findById(id);
    if (!listings.owner.equals(res.locals.currentUser._id)){
        req.flash("error", "You don't have permission to edit this listing");
        return res.redirect(`/listings/${id}`);
      }
      next();
};


module.exports.validateListing = (req, res, next) => {

  const { error } = listingSchema.validate(req.body);  
  // or req.body.listing depending on schema structure

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
  next();
  }
};




module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


module.exports.isreviewAuthor = async(req,res,next)=>{
    const { Id, reviewId} = req.params;
    const review  =await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)){
        req.flash("error", "You don't have permission to edit this review");
        return res.redirect(`/listings/${review.listing}`);
      }
      next();
};
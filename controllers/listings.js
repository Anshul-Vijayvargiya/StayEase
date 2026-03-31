const Listing = require("../models/listing.js");

// Controller functions for listings

module.exports.index = async (req, res,next) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};


//===================== NEW ==============================//

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

//===================== show ==============================//



module.exports.showListing =  async (req, res,next) => {

  const { id } = req.params;

  const listing = await Listing.findById(id)
  .populate({path:"reviews", 
  populate:{path:"author"},
  })
  .populate("owner");

  if (!listing){
   req.flash("error", "Listing Not Found");
  return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};



//===================== CREATE ==============================//

module.exports.createListing = async (req, res,next) => {
let url = req.file.path;
let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id; // Set the owner to the logged-in user's ID
      newListing.image={url,filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  };

  //===================== EDIT======================//

  module.exports.renderEditForm = async (req, res,next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing){
      throw new ExpressError(404, "Listing Not Found");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250")
    res.render("listings/edit", { listing , originalImageUrl});
  };

 //=================== UPDATE ===================//


  module.exports.updateListing = async (req, res,next) => {

    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      req.body.listing,
      {
        runValidators: true,
        new: true,
      }
    );
          if(typeof req.file != "undefined"){
          let url = req.file.path;
          let filename = req.file.filename;
          updatedListing.image={url,filename};
          await updatedListing.save();
           }
    req.flash("success", "Listing Updated!");
    if (!updatedListing)
      throw new ExpressError(404, "Listing Not Found");

    res.redirect(`/listings/${id}`);
  };

//===================== DELETE ==============================//

  module.exports.deleteListing = async (req, res,next) => {
  
    const { id } = req.params;
  
    const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
    if (!deletedListing)
      throw new ExpressError(404, "Listing Not Found");
  
    res.redirect("/listings");
  };
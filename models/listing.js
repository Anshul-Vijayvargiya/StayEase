const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title    : {
       type:  String,
       required : true,
},
 description : String,

image: {
  url:String,
  filename:String,
},
 
price    : Number,
location :  String,
country  :  String,
reviews:[
  {
    type:Schema.Types.ObjectId,
    ref:"Review"
  }
],
owner:{
  type:Schema.Types.ObjectId,
   ref:"User",
},   
});


listingSchema.post("findOneAndDelete", async function(doc){
  if(doc){
    await Review.deleteMany({_id: {$in: doc.reviews}});
  }
});


const Listing = mongoose.model("listing",listingSchema);

module.exports = Listing; 







//Create a Model class called Listing





// 👉 A Model is a JavaScript class that represents a MongoDB collection and lets you work with its data.

// In short:

// Model = bridge between your Node.js code and MongoDB



// Think of MongoDB as a cupboard 📦
// Inside it, you have folders 📁 (collections)
// Inside folders, you have files 📄 (documents)
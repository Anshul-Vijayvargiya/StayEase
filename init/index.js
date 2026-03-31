const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/StayEase';
const Listing = require("../models/listing.js");
const initData = require("./data.js");



main()
.then(() =>{
    console.log("Db is connected");

})
.catch(()=>{
    console.log(err)
});

async function main(){
await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
 initData.data = initData.data.map((obj)=>({...obj, owner: "69afc0b10664ca8d483b6ab8"}))
    await Listing.insertMany(initData.data);
    console.log("data was init");
};

initDB();

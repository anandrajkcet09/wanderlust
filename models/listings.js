const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description:String,
    image:{
        filename: String,
        url: {
            type: String,
        default:"https://unsplash.com/photos/cozy-living-room-with-sectional-sofa-and-coffee-table-Ie3fp14d_NQ",

        set: (v) => v==="" ? "https://unsplash.com/photos/cozy-living-room-with-sectional-sofa-and-coffee-table-Ie3fp14d_NQ" : v,
    },
},
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
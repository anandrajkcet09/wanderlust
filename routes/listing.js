const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");



//Index Route
router.get("/", wrapAsync(async (req, res) => {
    const all = await Listing.find({});
    res.render("./listings/index.ejs", { allListings: all });
}));

//New Route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

//show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews", populate: { path: "author" },
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Does not exists this listing");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("./listings/show.ejs", { listing });
}));

//Create Route
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing Created !");
    res.redirect("/listings");

}));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Does not exists this listing");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "A listing Updated !");
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "A listing Deleted!");
    res.redirect("/listings");
}));


module.exports = router;
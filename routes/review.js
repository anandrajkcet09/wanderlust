const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const { validateReview, isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");



// Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New review Created !");
    res.redirect(`/listings/${listing._id}`);
}));

// Delete Review Route
router.delete("/:reviewId",
    isLoggedIn, isReviewAuthor,
    wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;

        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "A review Deleted !");
        res.redirect(`/listings/${id}`);
    })
);


module.exports = router;
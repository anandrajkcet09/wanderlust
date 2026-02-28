const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const { validateReview, isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/review.js");


// Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Route
router.delete("/:reviewId",
    isLoggedIn, isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
);


module.exports = router;
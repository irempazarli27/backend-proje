const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createReview,
    getMovieReviews
} = require("../controllers/reviewController");

router.post("/movies/:movieId/reviews", authMiddleware, createReview);

router.get("/movies/:movieId/reviews", getMovieReviews);

module.exports = router;
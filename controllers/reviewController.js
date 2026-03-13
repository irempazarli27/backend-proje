const Review = require("../models/Review");
const Movie = require("../models/Movie");

async function createReview(req, res){

    const {rating, comment} = req.body;

    const review = await Review.create({
        movie: req.params.movieId,
        user: req.user.id,
        rating,
        comment
    });

    const stats = await Review.aggregate([
        {
            $match: {movie: review.movie}
        },
        {
            $group:{
                _id: "$movie",
                avgRating: {$avg: "$rating"},
                count: {$sum: 1}
            }
        }
    ]);

    await Movie.findByIdAndUpdate(review.movie, {
        averageRating: stats[0].avgRating,
        reviewCount: stats[0].count
    });

    res.json(review);
}

async function getMovieReviews(req, res){

    const reviews = await Review
      .find({movie: req.params.movieId})
      .populate("user", "username")
      .select("rating comment user createdAt");
    
    res.json(reviews);
}

module.exports = {
    createReview,
    getMovieReviews
};
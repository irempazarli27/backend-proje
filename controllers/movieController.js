const movieService = require("../services/movieService");
const asyncHandler = require("../middleware/asyncHandler");
const Movie = require("../models/Movie");
const apiResponse = require("../utils/apiResponse");

const getMovies = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const skip = (page - 1) * limit;

    const query = {owner: req.user.id};

    if(req.query.year){
        query.year = req.query.year;
    }
   
    if(req.query.search){
        query.title = new RegExp(req.query.search, "i")
    }

    const total = await Movie.countDocuments(query)

   const movies = await movieService.getMovies(
    query,
    skip,
    limit,
    req.query.sort
   )
    
   return apiResponse(res, {
    total,
    page,
    limit,
    pages: Math.ceil(total/limit),
    movies
   });
});

const getMovieById = asyncHandler(async(req, res) => {

    const movie = await movieService.getMovieById(req.params.id);
    
    if(!movie){
        return res.status(404).json({
            success: false,
            message:"Movie not found"
        });
    }

    return apiResponse(res, movie);
});

const createMovie = asyncHandler(async (req, res) => {

    const {title, year, rating} = req.body;

    const movie = await movieService.createMovie({
        title,
        year,
        rating,
        owner: req.user.id
    });

    return apiResponse(res, movie, "Movie created", 201);
});

const updateMovie = asyncHandler(async (req, res) => {

    const movie = await movieService.updateMovie(
        req.params.id,
        req.body
    );

    if(!movie){
        return res.status(404).json({
            success: false,
            message:"Movie not found"
        });
    }

    return apiResponse(res, movie, "Movie updated");
});

const deleteMovie = asyncHandler(async (req, res) => {

    const movie = await movieService.deleteMovie(req.params.id);

    if(!movie){
        return res.status(404).json({
            success: false,
            message:"Movie not found"
        });
    }

    return apiResponse(res, null, "Movie deleted");
    
});

module.exports = {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieById
};
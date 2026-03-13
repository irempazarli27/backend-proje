const Movie = require("../models/Movie");

async function getMovies(query, skip, limit, sort){

    let moviesQuery = Movie.find(query);

    if(sort){
        moviesQuery = moviesQuery.sort(sort);
    }

    const movies = await moviesQuery
      .skip(skip)
      .limit(limit)
      .populate("owner", "username");

    return movies;
}

async function getMovieById(id){

    const movie = await Movie
      .findById(id)
      .populate("owner", "username");

    return movie;
}

async function createMovie(data){

    return await Movie.create(data);

}

async function updateMovie(id,data){

    return await Movie.findByIdAndUpdate(
        id,
        data,
        {new:true}
    );

}

async function deleteMovie(id){

    return await Movie.findByIdAndDelete(id);

}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
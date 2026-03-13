const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById
} = require("../controllers/movieController");

router.get("/movies", getMovies);

router.post("/movies", authMiddleware, createMovie);

router.put("/movies/:id", authMiddleware, updateMovie);

router.delete("/movies/:id", authMiddleware, deleteMovie);

router.get("/movies/:id", authMiddleware, getMovieById);

module.exports = router;
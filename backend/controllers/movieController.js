import asyncHandler from "../middlewares/asyncHandler.js";
import Movie from "../models/Movie.js";

const createMovie = asyncHandler(async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const getAllMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
});

const getSpecificMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.find({ _id: id });

    if (!movie) {
      return res.status(404).json({ message: "movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
});

const updateMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateMovie) {
      return res.status(404).json({ error: "movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
});

const addMovieReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyRevieved = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyRevieved) {
        res.status(400);
        throw new Error("Movie already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("movie not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
});

const deleteComment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;

    await movie.save();
    res.json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getNewMovies = asyncHandler(async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(newMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const getTopMovies = asyncHandler(async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);
    res.status(200).json(topRatedMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    const randomMovie = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(randomMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  addMovieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
};

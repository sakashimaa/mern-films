import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingGenre = await Genre.findOne({ name: name });

    if (existingGenre) {
      return res.json({ error: "Already exists" });
    }

    const genre = await new Genre({ name: name }).save();
    res.json(genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const existingGenre = await Genre.findOne({ _id: id });

    if (!existingGenre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    existingGenre.name = name;

    const updatedGenre = await existingGenre.save();
    res.json(updatedGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Genre.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listGenres = asyncHandler(async (req, res) => {
  try {
    const all = await Genre.find({});

    res.status(200).json(all);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const readGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const genre = await Genre.find({ _id: id });
    if (!genre) {
      return res.status(404).json({ error: "genre not found" });
    }

    res.status(200).json(genre);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export { createGenre, updateGenre, deleteGenre, listGenres, readGenre };

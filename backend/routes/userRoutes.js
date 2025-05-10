import express from "express";
import createUser from "../controllers/userController.js";

// controllers
// middlewares
const router = express.Router();

router.route("/").post(createUser);

export default router;

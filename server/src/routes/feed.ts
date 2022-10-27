import express from "express";
import feedsController from "../controllers/feed";

const router = express.Router();

router.get("/", feedsController.getPosts);

router.post("/", feedsController.createPost);

export default router;

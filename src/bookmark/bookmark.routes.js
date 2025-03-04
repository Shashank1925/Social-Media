import express from "express";
import { addBookmark, removeBookmark, getBookmarks } from "./bookmark.controller.js";
import jwtAuth from "../Middleware/jwtAuthentication.js";
const router = express.Router();

router.get("/", jwtAuth, getBookmarks);
router.post("/:postId", jwtAuth, addBookmark);
router.delete("/:postId", jwtAuth, removeBookmark);

export default router;

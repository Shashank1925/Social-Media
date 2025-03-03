import express from "express";
import jwtAuth from "../Middleware/jwtAuthentication.js";
import LikesController from "./likes.controller.js";
const likesRouter = express.Router();
// this route is for retrieving all likes for specific post 
likesRouter.get("/:postid", jwtAuth, LikesController.getAllLikes);
// this route is for toggling likes for specific post by specific user
likesRouter.get("/toggle/:postId", jwtAuth, LikesController.toggleLike);
export default likesRouter;
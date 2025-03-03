import express from "express";
import jwtAuth from "../Middleware/jwtAuthentication.js";
import PostUploadedController from "./post.uploaded.controller.js";
const postRouter = express.Router();
// this route is for all posts without JWT authentication
postRouter.get("/all", PostUploadedController.getAllPosts);
// this route is for all posts with JWT authentication for secific user
postRouter.get("/", jwtAuth, PostUploadedController.getAllPostsOfUser);
// here in this route id is about post id
postRouter.get("/:id", jwtAuth, PostUploadedController.getSpecificPost);
postRouter.post("/", jwtAuth, PostUploadedController.createPost);
postRouter.delete("/:id", jwtAuth, PostUploadedController.deletePost);
postRouter.put("/:id", jwtAuth, PostUploadedController.updatePost);
export default postRouter;
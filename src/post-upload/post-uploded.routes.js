import express from "express";
import jwtAuth from "../Middleware/jwtAuthentication.js";
import PostUploadedController from "./post.uploaded.controller.js";
import upload from "../Middleware/multer.middleware.js";
const postRouter = express.Router();
// this route is for all posts without JWT authentication
postRouter.get("/all", PostUploadedController.getAllPosts);
// this route is for all posts with JWT authentication for secific user
postRouter.get("/", jwtAuth, PostUploadedController.getAllPostsOfUser);
// here in this route id is about post id
postRouter.get("/:id", jwtAuth, PostUploadedController.getSpecificPost);
postRouter.post("/", jwtAuth, upload.array("files", 5), PostUploadedController.createPost);
postRouter.delete("/:id", jwtAuth, PostUploadedController.deletePost);
postRouter.put("/:id", jwtAuth, upload.array("files", 5), PostUploadedController.updatePost);
// there are rotues for draft and archived posts 
postRouter.post("/draft", jwtAuth, upload.array("files", 5), PostUploadedController.saveAsDraft);
postRouter.put("/archive/:id", jwtAuth, upload.array("files", 5), PostUploadedController.archivePost);
export default postRouter;
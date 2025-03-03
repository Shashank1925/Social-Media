import express from "express";
import jwtAuth from "../Middleware/jwtAuthentication.js";
import CommentsController from "../comments/comments.controller.js";
const commentsRouter = express.Router();
commentsRouter.post("/:id", jwtAuth, CommentsController.getCreatedComments);
commentsRouter.get("/:id", jwtAuth, CommentsController.getAllComments);
commentsRouter.delete("/:id", jwtAuth, CommentsController.deleteComment);
commentsRouter.put("/:id", jwtAuth, CommentsController.updateComment);
export default commentsRouter;  
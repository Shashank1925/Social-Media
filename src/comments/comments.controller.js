import CommentsModel from "./comments.model.js";
import ErrorMiddleware from "../Middleware/error-middleware/error.middleware.js";
import PostUploadedModel from "../post-upload/post.uploaded.model.js";
export default class CommentsController {
    // this method is for creating comments for specific post by specific user
    static getCreatedComments(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }
            const { content } = req.body;
            if (!content) {
                throw new ErrorMiddleware("Please provide content", 400);
            }
            const id = req.params.id;
            const allPosts = PostUploadedModel.getAllPostsOfUser(req.userId);
            const thePost = allPosts.find((p) => p.postId === id);
            if (!thePost) {
                throw new ErrorMiddleware("Post not found", 404);
            }
            const comments = CommentsModel.createComments(req.userId, thePost.postId, content);
            if (!comments) {
                throw new ErrorMiddleware("No comments found", 404);
            }
            res.status(200).json({
                message: "comment created successfully",
                comments,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // this method is for getting all comments of a post 
    static getAllComments(req, res, next) {
        try {
            const comments = CommentsModel.getAllComments();
            if (!comments) {
                throw new ErrorMiddleware("No comments found", 404);
            };
            res.status(200).json({
                message: "comments fetched successfully",
                comments,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static deleteComment(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }
            const commentId = req.params.id;
            if (!commentId) {
                throw new ErrorMiddleware("Please provide comment id in url", 400);
            }
            const specificComment = CommentsModel.getSpecificComment(commentId);
            if (!specificComment) {
                throw new ErrorMiddleware("No comment found", 404);
            }
            const isDeleted = CommentsModel.deleteComment(commentId);
            if (!isDeleted) {
                throw new ErrorMiddleware("Failed to delete comment", 500);
            }
            res.status(200).json({
                message: "Comment deleted successfully",
                isDeleted,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static updateComment(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }
            const commentId = req.params.id;
            if (!commentId) {
                throw new ErrorMiddleware("Please provide comment id in url", 400);
            }
            const specificComment = CommentsModel.getSpecificComment(commentId);
            if (!specificComment) {
                throw new ErrorMiddleware("No comment found", 404);
            }
            const { content } = req.body;
            if (!content) {
                throw new ErrorMiddleware("Please provide content", 400);
            }
            const updatedComment = CommentsModel.updateComment(commentId, content);
            if (!updatedComment) {
                throw new ErrorMiddleware("Update comment not done", 404);
            }
            res.status(200).json({
                message: "Comment updated successfully",
                updatedComment,
            });
        } catch (error) {
            next(error);
        }
    }
}

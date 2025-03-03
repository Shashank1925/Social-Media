import ErrorMiddleware from "../Middleware/error-middleware/error.middleware.js";
import PostUploadedModel from "../post-upload/post.uploaded.model.js";
import LikesModel from "./likes.model.js";
export default class LikesController {
    // this method is for creating likes for specific post by specific user
    static toggleLike(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }
            const postId = req.params.postId;
            if (!postId) {
                throw new ErrorMiddleware("Please provide postId", 400);
            }
            const thePost = PostUploadedModel.getSpecificPost(postId);
            if (!thePost) {
                throw new ErrorMiddleware("No posts found", 404);
            }

            const like = LikesModel.toggleLikes(req.userId, postId);
            if (!like) {
                throw new ErrorMiddleware("No likes found", 404);
            }
            res.status(200).json({
                message: like.message,
                like: like.liked,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static getAllLikes(req, res, next) {
        try {
            const postId = req.params.postid;
            if (!postId) {
                throw new ErrorMiddleware("Please provide postId", 400);
            }
            const postLikes = LikesModel.getSpecificLike(postId);
            if (!postLikes === 0) {
                throw new ErrorMiddleware("No likes found", 404);
            }
            res.status(200).json({
                message: "All likes",
                likes: postLikes,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
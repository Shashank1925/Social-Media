import PostUploadedModel from "./post.uploaded.model.js";
import ErrorMiddleware from "../Middleware/error-middleware/error.middleware.js";
export default class PostUploadedController {
    static createPost(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }
            const { caption, imageUrls } = req.body;
            if (!caption) {
                throw new ErrorMiddleware("Please provide caption ", 400);
            }
            let uploadedImages = [];
            if (req.files && req.files.length > 0) {
                uploadedImages = req.files.map(file => `/uploads/${file.filename}`);
            } else {
                throw new ErrorMiddleware("Please upload at least one image", 400);
            }
            const finalImageUrls = [];
            if (imageUrls) {
                if (typeof imageUrls === "string") {
                    finalImageUrls.push(imageUrls);
                } else if (Array.isArray(imageUrls)) {
                    finalImageUrls.push(...imageUrls);
                }
            }
            finalImageUrls.push(...uploadedImages);
            if (finalImageUrls.length === 0) {
                throw new ErrorMiddleware("Please upload at least one image or provide an image URL", 400);
            }
            const posts = PostUploadedModel.postsData(req.userId, caption, finalImageUrls, next);
            console.log("posts", posts);
            if (!posts) {
                throw new ErrorMiddleware("No posts found", 404);
            }
            res.status(201).json({
                message: "post created successfully",
                posts,
            });
        } catch (error) {
            next(error);
        }
    }
    static getAllPostsOfUser(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }
            const posts = PostUploadedModel.getAllPostsOfUser(req.userId);
            if (!posts) {
                throw new ErrorMiddleware("No posts found", 404);
            }
            res.status(200).json({
                message: "posts fetched successfully",
                posts,
            });
        } catch (error) {
            next(error);
        }
    }
    static getSpecificPost(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }
            const id = req.params.id;
            if (!id) {
                throw new ErrorMiddleware("Please provide post id", 400);
            }
            const specificPost = PostUploadedModel.getSpecificPost(id);
            if (!specificPost) {
                throw new ErrorMiddleware("No post found", 404);
            }
            res.status(200).json({
                message: "Post details fetched Successfully",
                specificPost,
            })
        } catch (error) {
            next(error);
        }
    }
    static getAllPosts(req, res, next) {
        try {
            let posts = PostUploadedModel.getAllPosts();

            //   posts = PostUploadedModel.getAllPosts();
            if (!posts || posts.length == 0) {

                throw new ErrorMiddleware("No posts found", 404);
            }
            res.status(200).json({
                message: "All posts fetched successfully",
                posts,
            });
        } catch (error) {
            next(error);
        }
    }
    static deletePost(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }
            const id = req.params.id;
            if (!id) {
                throw new ErrorMiddleware("Please provide post id", 400);
            }
            const specificPost = PostUploadedModel.getSpecificPost(id);
            if (!specificPost) {
                throw new ErrorMiddleware("No post found", 404);
            }
            const isDeleted = PostUploadedModel.deletePost(id);
            if (!isDeleted) {
                throw new ErrorMiddleware("Failed to delete post", 500);
            }
            res.status(200).json({
                message: "Post deleted successfully",
                isDeleted,
            });
        } catch (error) {
            next(error);
        }
    }
    static updatePost(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }
            const id = req.params.id;
            if (!id) {
                throw new ErrorMiddleware("Please provide post id", 400);
            }
            const { caption, imageUrl } = req.body;
            if (!caption || !imageUrl) {
                throw new ErrorMiddleware("Please provide caption and imageUrl", 400);
            }
            const specificPost = PostUploadedModel.getSpecificPost(id);
            if (!specificPost) {
                throw new ErrorMiddleware("No post found", 404);
            }
            let newImageUrls = specificPost.imageUrl || [];
            if (req.files && req.files.length > 0) {
                newImageUrls = req.files.map(file => `/uploads/${file.filename}`);
            }
            const updatedPost = PostUploadedModel.updatePost(id, caption, newImageUrls);
            if (!updatedPost) {
                throw new ErrorMiddleware("No post found", 404);
            }
            res.status(200).json({
                message: "Post updated successfully",
                updatedPost,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static saveAsDraft(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }

            const { caption, imageUrls } = req.body;
            if (!caption) {
                throw new ErrorMiddleware("Please provide a caption", 400);
            }

            let uploadedImages = [];
            if (req.files && req.files.length > 0) {
                uploadedImages = req.files.map(file => `/uploads/${file.filename}`);
            }

            const newPost = PostUploadedModel.postsData(req.userId, caption, [...uploadedImages, ...(imageUrls || [])], "draft");
            res.status(201).json({
                message: "Post saved as draft successfully",
                post: newPost,
            });
        } catch (error) {
            next(error);
        }
    }
    static archivePost(req, res, next) {
        try {
            if (!req.userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }

            const id = req.params.id;
            if (!id) {
                throw new ErrorMiddleware("Please provide post ID", 400);
            }

            const archivedPost = PostUploadedModel.archivePost(id, req.userId);
            if (!archivedPost) {
                throw new ErrorMiddleware("No post found or unauthorized", 404);
            }

            res.status(200).json({
                message: "Post archived successfully",
                post: archivedPost,
            });
        } catch (error) {
            next(error);
        }
    }

}
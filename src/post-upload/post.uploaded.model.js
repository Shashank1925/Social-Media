import { v4 as uuidv4 } from "uuid";
import ErrorMiddleware from "../Middleware/error-middleware/error.middleware.js";

export default class PostUploadedModel {
    constructor(postId, userId, caption, imageUrl) {
        this.postId = postId;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }
    static allPostsArray = [];
    static postsData(userId, caption, imageUrl, next) {
        try {
            const postId = uuidv4();
            if (!userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }

            const newPost = new PostUploadedModel(postId, userId, caption, imageUrl);
            this.allPostsArray.push(newPost);
            return newPost;

        }
        catch (error) {
            next(error);
        }
    }
    static getAllPostsOfUser(userId) {
        return this.allPostsArray.filter((post) => post.userId === userId);
    }
    static getSpecificPost(id) {
        return this.allPostsArray.find((post) => post.postId === id);
    }
    static getAllPosts() {
        return this.allPostsArray;
    }
    static deletePost(id) {
        const index = this.allPostsArray.findIndex(post => post.postId === id);

        if (index === -1) {
            throw new ErrorMiddleware("Post to be deleted not found", 404)
        }
        this.allPostsArray.splice(index, 1);
        return true;
    }

    static updatePost(id, caption, imageUrl) {
        const index = this.allPostsArray.findIndex((post) => post.postId === id);
        if (index === -1) {
            throw new ErrorMiddleware("Post not found", 404);
        }
        this.allPostsArray[index] = {
            ...this.allPostsArray[index],
            caption,
            imageUrl,
        };
        return this.allPostsArray[index];
    }

}
import { v4 as uuidv4 } from "uuid";
import ErrorMiddleware from "../Middleware/error-middleware/error.middleware.js";

export default class PostUploadedModel {
    constructor(id, userId, caption, imageUrl) {
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }
    static allPostsArray = [];
    static postsData(userId, caption, imageUrl, next) {
        try {
            const id = uuidv4();
            if (!userId) {
                throw new ErrorMiddleware("Unauthorized: No user ID found", 401);
            }

            const newPost = new PostUploadedModel(id, userId, caption, imageUrl);
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
        return this.allPostsArray.find((post) => post.id === id);
    }
    static getAllPosts() {
        return this.allPostsArray;
    }
    static deletePost(id) {
        const initialLength = this.allPostsArray.length;
        this.allPostsArray = this.allPostsArray.filter(post => post.id !== id);
        return this.allPostsArray.length < initialLength; // Returns true if a post was deleted
    }
    static updatePost(id, caption, imageUrl) {
        const index = this.allPostsArray.findIndex((post) => post.id === id);
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
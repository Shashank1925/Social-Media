import { v4 as uuidv4 } from "uuid";
// this is the class for likes model
export default class LikesModel {
    constructor(likeId, userId, postId) {
        this.likeId = likeId;
        this.userId = userId;
        this.postId = postId;
    }
    static allLikesArray = [];
    // this method is for creating likes for specific post by specific user
    static toggleLikes(userId, postId) {
        const likeIndex = this.allLikesArray.findIndex(like => like.userId === userId && like.postId === postId);
        if (likeIndex !== -1) {
            this.allLikesArray.splice(likeIndex, 1);
            return { message: "Like removed successfully", liked: false };
        }
        const likeId = uuidv4();
        const like = new LikesModel(likeId, userId, postId);
        this.allLikesArray.push(like);
        return { message: "Like added successfully", liked: true };
    }
    static getAllLikes() {
        return this.allLikesArray;
    }
    static getSpecificLike(postId) {
        return this.allLikesArray.filter(like => like.postId === postId);

    }
}
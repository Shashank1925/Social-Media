import { v4 as uuidv4 } from "uuid";
// this is the class for comments model
export default class CommentsModel {
    constructor(commentId, userId, postId, content) {
        this.commentId = commentId;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }
    static allCommentsArray = [];
    static createComments(userId, postId, content) {
        const commentId = uuidv4();
        const comment = new CommentsModel(commentId, userId, postId, content);
        this.allCommentsArray.push(comment);
        return comment;
    }
    static getAllComments() {
        return this.allCommentsArray;
    }
    static getSpecificComment(commentId) {
        return this.allCommentsArray.find((comment) => comment.commentId === commentId);
    }
    static deleteComment(commentId) {
        const index = this.allCommentsArray.findIndex((comment) => comment.commentId === commentId)
        if (index === -1) {
            return false;
        }
        this.allCommentsArray.splice(index, 1);
        return true;
    }
    static updateComment(commentId, content) {
        const index = this.allCommentsArray.findIndex((comment) => comment.commentId === commentId);
        if (index === -1) {
            return false;
        }
        this.allCommentsArray[index].content = content;
        return this.allCommentsArray[index];
    }
}
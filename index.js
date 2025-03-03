// import express from "express";
import express from "express";
import userRouter from "./src/user/user.routes.js";
import postRouter from "./src/post-upload/post-uploded.routes.js";
import commentsRouter from "./src/comments/comments.routes.js";
import likesRouter from "./src/likes/likes.routes.js";
import ErrorMiddleware from "./src/Middleware/error-middleware/error.middleware.js";
// this is for dotenv which help in using env file
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();
// create a server instance
const server = express();
// server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// if using FormData in postman but sending only text credential so it help express to not use file type in form data 
server.use(multer().none());
// this is for user  router  
server.use("/api", userRouter);
// this is for post router
server.use("/api/posts", postRouter);
// this is for comments router
server.use("/api/comments", commentsRouter);
// this is for likes router
server.use("/api/likes", likesRouter);
// this is global error handler
server.use(ErrorMiddleware.globalErrorHandler);
const Port = 5000;
server.listen(Port, () => {
    console.log("Server is listening port 5000");
}) 
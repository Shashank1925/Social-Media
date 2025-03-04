// import express from "express";
import express from "express";
import cors from "cors";
// this is for dotenv which help in using env file
import dotenv from "dotenv";
import swaggerMiddleware from "./src/Middleware/SwaggerMiddleware/swagger.middleware.js";
import userRouter from "./src/user/user.routes.js";
import postRouter from "./src/post-upload/post-uploded.routes.js";
import commentsRouter from "./src/comments/comments.routes.js";
import likesRouter from "./src/likes/likes.routes.js";
import ErrorMiddleware from "./src/Middleware/error-middleware/error.middleware.js";
import loggerMiddleware from "./src/Middleware/logger.middleware.js";
import bookmarkRouter from "./src/bookmark/bookmark.routes.js";

// this is for dotenv which help in using env file
dotenv.config();
// create a server instance
const server = express();
// this is for cors which help in cross origin resource sharing


server.use(cors());
// server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// this is for swagger middleware
server.use(swaggerMiddleware);
// this is for logger middleware
server.use(loggerMiddleware);
// this is for bookmark router
server.use("/api/bookmarks", bookmarkRouter);


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
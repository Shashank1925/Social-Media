// first we import the express in this file to use the router which is the object of express 
import express from "express";
import multer from "multer";
// import the user controller
import UserController from "./user.controller.js";
// create a router object
const router = express.Router();
// here i use the multer middleware to handle the file upload because i am using the form data in postman and it requires atleast one file to upload and in registration and login there is no file so i use the multer none  
const none = multer().none();
// create a route for sign up
router.post("/signUp", none, UserController.registerUser);
router.post("/signin", none, UserController.loginUser)
// export the router object
export default router;
// first we import the express in this file to use the router which is the object of express 
import express from "express";
// import the user controller
import UserController from "./user.controller.js";
// create a router object
const router = express.Router();
// create a route for sign up
router.post("/signUp", UserController.registerUser);
router.post("/signin", UserController.loginUser)
// export the router object
export default router;
import UserModel from "./user.model.js";
import ErrorMiddleware from "../Middleware/error-middleware/error.middleware.js";
import jwtToken from "../Middleware/jwtTokenGeneration.js";
export default class UserController {
    //   create user register for new account 
    static registerUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                throw new ErrorMiddleware("Please provide all the required fields", 400);
            }
            if (UserModel.registeredUserData.find((user) => user.email === email)) {
                throw new ErrorMiddleware("User already exists", 409);
            }
            UserModel.signUp(name, email, password);
            // this is the way to write the status code and reflect it in the response 
            const statusCode = 201;
            return res.status(statusCode).json({ message: "User registered successfully", statusCode });
        }
        catch (error) {
            // here does not matter error word inside the next function but it should be something written inside the next function when calls next function in catch block and that word should be which is passed in catch block argument. Express automatically starts searching the error middleware function  which starts with four parameters.
            next(error)
        }
    }
    // create user login for existing account
    static loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new ErrorMiddleware("Please provide all the required fields", 400);
            }
            const user = UserModel.registeredUserData.find((user) => user.email === email);

            if (!user) {
                throw new ErrorMiddleware("User not found", 404);
            }
            if (user.password != password) {
                throw new ErrorMiddleware("Invalid password", 401);
            }
            const info = {
                email: user.email,
                id: user.id
            }
            const token = jwtToken(info);
            const statusCode = 200
            res.status(statusCode).json({ message: "User logged in successfully", statusCode, token });
        }
        catch (error) {
            next(error)
        }
    }
}

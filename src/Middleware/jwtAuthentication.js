import jwt from 'jsonwebtoken';
import ErrorMiddleware from './error-middleware/error.middleware.js';
const jwtAuth = (req, res, next) => {
    try {
        // use bracket notation instead of dot notation as headers is case sensitive and it is an object
        const token = req.headers["authorization"];
        if (!token) {
            throw new ErrorMiddleware("Token not found", 401);
        }
        const privateKey = process.env.JWT_SECRET;
        // verify method returns the decoded token
        const decodedToken = jwt.verify(token, privateKey);
        if (!decodedToken) {
            throw new ErrorMiddleware("Token verification failed", 401);
        }
        req.userId = decodedToken.userId;
        req.userEmail = decodedToken.userEmail;
        console.log(`✅ Token verified! userId: ${req.userId}`); // Debug Log

        next();
    }
    catch (error) {
        next(error);
    }
}
export default jwtAuth;
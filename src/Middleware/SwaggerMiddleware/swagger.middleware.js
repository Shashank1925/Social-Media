import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";

const router = Router();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Post Service",
            version: "1.0.0",
            description: "Post Service API Documentation",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Development Server",
            },
        ],
        components: {
            securitySchemes: {
                JWT: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                },
            },
            schemas: {
                Error: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                        statusCode: { type: "integer" },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        username: { type: "string" },
                        email: { type: "string" },
                    },
                },
                Post: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        content: { type: "string" },
                        authorId: { type: "string" },
                    },
                },
                Comment: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        postId: { type: "string" },
                        content: { type: "string" },
                        userId: { type: "string" },
                    },
                },
                Like: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        postId: { type: "string" },
                        userId: { type: "string" },
                    },
                },
            },
        },
    },
    apis: ["./src/user/*.routes.js", "./src/post-upload/*.routes.js", "./src/comments/*.routes.js", "./src/likes/*.routes.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;

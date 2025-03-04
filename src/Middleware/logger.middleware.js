import winston from 'winston';
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'Post-service logging' },
    transports: [new winston.transports.File({ filename: "log.txt" })],
});
const loggerMiddleware = (req, res, next) => {
    if (!(req.url === "/api/signUp" || req.url === "/api/signin")) {
        const originalJson = res.json;

        res.json = function (body) {
            const now = new Date();
            const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
            const message = body?.message ? body.message : "No message in response";
            // this is the way to apply ternary operator and handle object data in response
            const caption = body?.posts?.caption ? body.posts.caption : "No caption in Posts";
            const logData = `${timestamp} - ${req.method} ${req.url} - Response:"Message:${message}" Posts:"${caption}"`;

            logger.info(logData);

            return originalJson.call(this, body);
        };

    }
    next();
}
export default loggerMiddleware;
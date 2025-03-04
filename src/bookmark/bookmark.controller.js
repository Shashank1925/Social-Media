import fs from "fs";
import path from "path";
import ErrorMiddleware from "../Middleware/error-middleware/error.middleware.js";

const filePath = path.resolve("src/bookmark/bookmarks.json");

// Utility function to read bookmarks file
const readBookmarks = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};

// Utility function to write bookmarks file
const writeBookmarks = (bookmarks) => {
    fs.writeFileSync(filePath, JSON.stringify(bookmarks, null, 2));
};

// Get all bookmarks for a user
export const getBookmarks = (req, res) => {
    const userId = req.userId;
    const bookmarks = readBookmarks().filter((b) => b.userId === userId);
    res.status(200).json(bookmarks);
};

// Add a bookmark
export const addBookmark = (req, res, next) => {
    try {
        console.log("req.user:", req.user);
        const userId = req.userId;
        const { postId } = req.params;

        if (!userId) {
            return next(new ErrorMiddleware("Invalid userId", 404));
        }
        if (!postId) {
            return next(new ErrorMiddleware("Invalid postId", 404))
        }

        let bookmarks = readBookmarks();

        // Check if already bookmarked
        if (bookmarks.some((b) => b.userId === userId && b.postId === postId)) {
            return res.status(400).json({ message: "Post already bookmarked" });
        }

        bookmarks.push({ id: Date.now(), userId, postId });
        writeBookmarks(bookmarks);
        res.status(201).json({ message: "Post bookmarked successfully" });

    } catch (error) {
        next(error);
    }
};

// Remove a bookmark
export const removeBookmark = (req, res) => {
    const userId = req.userId;
    const { postId } = req.params;

    let bookmarks = readBookmarks();
    bookmarks = bookmarks.filter((b) => !(b.userId === userId && b.postId === postId));

    writeBookmarks(bookmarks);
    res.status(200).json({ message: "Bookmark removed successfully" });
};

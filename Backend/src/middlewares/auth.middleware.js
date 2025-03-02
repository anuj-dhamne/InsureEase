import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from either Cookies or Authorization Header
        const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

        if (!token) {
            console.warn("🔴 JWT Token Missing"); // Debugging
            throw new ApiError(401, "Access token missing. Please log in.");
        }

        console.log("🟢 Received Token:", token); // Debugging

        // Verify JWT token
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            console.error("⚠️ ACCESS_TOKEN_SECRET is missing in .env file.");
            throw new ApiError(500, "Server error: Authentication secret not found.");
        }

        const decodedToken = jwt.verify(token, secret);
        console.log("🟢 Decoded Token:", decodedToken); // Debugging

        // Validate user from DB (Optional: Add this only if needed)
        const user = await User.findById(decodedToken._id);
        if (!user) {
            throw new ApiError(401, "User not found. Authentication failed.");
        }

        // Attach user details to the request object
        req.user = {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: decodedToken.role || user.role, // Ensure role exists
        };

        next();
    } catch (error) {
        console.error("🔴 JWT Verification Error:", error.message);

        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Session expired. Please log in again.");
        } else if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid token. Authentication failed.");
        } else {
            throw new ApiError(401, "Authentication failed.");
        }
    }
});

export { verifyJWT };

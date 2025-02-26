import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import env from "../config/env";

// ✅ Define a valid rate limit configuration
const apiLimiter = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true, // Send rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    // ✅ Fix `keyGenerator` (uses IP address)
    keyGenerator: (req: Request): string => {
        return req.ip || "anonymous";
    },

    // ✅ Fix `handler` (custom response for blocked requests)
    handler: (req: Request, res: Response) => {
        res.status(429).json({ error: "Too many requests, slow down!" });
    },

    // ✅ Fix `skip` (optionally allow specific users to bypass the limit)
    skip: (req: Request, res: Response): boolean => {
        // Example: Skip rate limiting for internal API calls
        return req.headers["x-internal-api-key"] === env.INTERNAL_API_KEY;
    },
};

// ✅ Export the rate limiter middleware
export default rateLimit(apiLimiter);

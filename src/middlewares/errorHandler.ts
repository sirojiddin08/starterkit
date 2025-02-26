import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

interface CustomError extends Error {
    status?: number;
    code?: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): Response | void => {
    // CSRF token error
    if (err.code === "EBADCSRFTOKEN") {
        return res.status(403).json({
            success: false,
            statusCode: 403,
            error: "Invalid CSRF token",
            timestamp: new Date().toISOString(),
        });
    }

    logger.error(`${err.message} - ${req.method} ${req.url}`);

    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.status || 500).json({
        success: false,
        statusCode: err.status || 500,
        error: err.status ? err.message : "Internal Server Error",
        timestamp: new Date().toISOString(),
    });
};

export default errorHandler;

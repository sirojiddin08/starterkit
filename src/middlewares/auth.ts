import jwt, { JwtPayload } from "jsonwebtoken";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import env from "../config/env";

const { ACCESS_TOKEN_SECRET } = env;

const isAuthenticated = async (req: any, res: any, next: NextFunction) => {
    try {
        const authToken = req.get("Authorization");
        const accessToken = authToken?.split("Bearer ")[1];

        if (!accessToken) {
            return next(createError.Unauthorized("Access token required."));
        }

        let decodedToken: JwtPayload;
        try {
            decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as JwtPayload;
        } catch (err) {
            return next(createError.Unauthorized("Invalid or expired token."));
        }

        const { id, role_id } = decodedToken;

        // Attach user info to the request object
        req.user_id = id;
        req.role_id = role_id;

        return next();
    } catch (error) {
        return next(createError.BadRequest("Authentication failed."));
    }
};

export default isAuthenticated;
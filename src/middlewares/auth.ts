import jwt, { JwtPayload } from "jsonwebtoken";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import env from "../config/env";

const prisma = new PrismaClient();
const { ACCESS_TOKEN_SECRET } = env;

// Extend Express Request type to include user properties
interface CustomRequest extends Request {
    user_id?: number;
    role_id?: number;
}

const isAuthenticated = async (req: CustomRequest, res: any, next: NextFunction) => {
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

        const { id, unique_id, role_id } = decodedToken;

        // Query the database using Prisma ORM
        const userSession = await prisma.user_sessions.findFirst({
            where: {
                user_id: id,
                unique_id: unique_id,
            },
            include: {
                users: {
                    select: {
                        id: true,
                        role_id: true,
                    },
                },
            },
        });

        if (!userSession || !userSession.users) {
            return next(createError.Unauthorized("Invalid or expired token."));
        }

        // Attach user info to the request object
        req.user_id = id;
        req.role_id = role_id;

        return next();
    } catch (error) {
        return next(createError.BadRequest("Authentication failed."));
    }
};

export default isAuthenticated;
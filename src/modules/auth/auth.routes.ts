import createError from "http-errors";
import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { AuthSchema } from "./auth.schema";
import env from "../../config/env";
import generateToken from "../../utils/jwt"
import { ms } from "../../utils/index";

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE
} = env;

const prisma = new PrismaClient();
const router = Router();

router.post('/login', async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Auth']
        #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $username: "admin",
                $password: "Qwerty@123",
            }
        }
    */
    try {
        // Validate Input
        const validatedData = AuthSchema.parse(req.body);
        const { username, password } = validatedData;

        // Check if the user exists
        const user = await prisma.users.findUnique({
            where: { username: username }
        });

        if (!user) {
            return next(createError.NotFound("User not found."));
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return next(createError.Unauthorized("Username or password is incorect."));
        }

        // Get IP Address
        const ipAddress = req.ip?.split("::ffff:")[1] || req.ip;

        // Insert authentication log
        await prisma.auth_log.create({
            data: {
                time: new Date(),
                user_id: user.id,
                ip: ipAddress,
            },
        });

        // Generate Unique ID for Session
        const unique_id = uuidv4();

        // Generate JWT Tokens
        const refreshToken = generateToken({ id: user.id, unique_id }, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);
        const accessToken = generateToken({ id: user.id, unique_id }, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
        const expirationTime = new Date(Date.now() + ms(REFRESH_TOKEN_LIFE)).getTime();

        // Upsert user's session
        await prisma.user_sessions.upsert({
            where: { user_id: user.id },
            update: {
                refresh_token: refreshToken,
                expiration_time: expirationTime,
                unique_id,
                created_time: new Date(),
            },
            create: {
                user_id: user.id,
                refresh_token: refreshToken,
                expiration_time: expirationTime,
                unique_id,
                created_time: new Date(),
            },
        });

        // Fetch user data (excluding sensitive fields)
        const userData = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            photo: user.photo,
        };

        return res.json({
            success: true,
            statusCode: 200,
            message: "Login successfully",
            data: { userData, accessToken, refreshToken },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        if (error instanceof Error) {
            return next(createError.BadRequest(error.message));
        } else {
            return next(createError.BadRequest());
        }
    }
});

export default router;
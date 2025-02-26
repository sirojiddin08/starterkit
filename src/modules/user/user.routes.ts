import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UserSchema } from "./user.schema";
import createError from "http-errors";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Users']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    try {
        const users = await prisma.users.findMany();
        return res.json({
            success: true,
            statusCode: 200,
            message: "Users retrieved successfully",
            data: users,
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

router.get("/:id", async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Users']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    try {
        const { id } = req.params;
        const user = await prisma.users.findUnique({ where: { id } });

        if (!user) {
            return next(createError.NotFound("User not found"));
        }

        return res.json({
            success: true,
            statusCode: 200,
            message: "User retrieved successfully",
            data: user,
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

router.post("/", async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Users']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $first_name: "John",
                $last_name: "Doe",
                $username: 'john@gmail.com',
                $password: 'qwerty123',
                $is_active: true,
            }
        }
    */
    try {
        const validatedData = UserSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        const newUser = await prisma.users.create({
            data: {
                first_name: validatedData.first_name,
                last_name: validatedData.last_name,
                username: validatedData.username,
                password_hash: hashedPassword,
                is_active: validatedData.is_active ?? true,
            },
        });

        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User created successfully",
            data: newUser,
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

router.put("/:id", async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Users']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                first_name: "John",
                last_name: "Doe",
                email: 'john@gmail.com',
                password: 'qwerty123',
                is_active: true,
            }
        }
    */
    try {
        const { id } = req.params;

        const user = await prisma.users.findUnique({ where: { id } });

        if (!user) {
            return next(createError.NotFound("User not found"));
        }

        const validatedData = UserSchema.partial().parse(req.body);

        const updatedUser = await prisma.users.update({
            where: { id },
            data: validatedData,
        });

        return res.json({
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            data: updatedUser,
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

router.delete("/:id", async (req: Request, res: any, next: NextFunction) => {
    /*  #swagger.tags = ['Users']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    try {
        const { id } = req.params;

        const user = await prisma.users.findUnique({ where: { id } });

        if (!user) {
            return next(createError.NotFound("User not found"));
        }

        await prisma.users.delete({ where: { id } });

        return res.json({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
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

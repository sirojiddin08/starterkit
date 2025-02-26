import { z } from "zod";

export const AuthSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(50, { message: "Username cannot exceed 50 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
        .trim(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(128, { message: "Password cannot exceed 128 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character (@, #, $, etc.)" })
        .trim(),
});

export type AuthType = z.infer<typeof AuthSchema>;
import { z } from "zod";

// ✅ Define User Schema
export const UserSchema = z.object({
    first_name: z.string().min(2, { message: "First name must be at least 2 characters long" }),
    last_name: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
    username: z.string(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    role_id: z.number(),
    is_active: z.boolean().optional(),
});

// ✅ Infer TypeScript Type from Zod Schema
export type UserType = z.infer<typeof UserSchema>;

import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

// Define schema for environment variables validation
const envSchema = z.object({
    PORT: z.string().default("4000"),
    
    INTERNAL_API_KEY: z.string(),

    DB_USER: z.string(),
    DB_HOST: z.string(),
    DB_DATABASE: z.string(),
    DB_PASSWORD: z.string(),
    DB_PORT: z.string(),
    
    DATABASE_URL: z.string().url(),

    ACCESS_TOKEN_SECRET: z.string().min(32, "ACCESS_TOKEN_SECRET must be at least 32 characters long"),
    REFRESH_TOKEN_SECRET: z.string().min(32, "REFRESH_TOKEN_SECRET must be at least 32 characters long"),

    ACCESS_TOKEN_LIFE: z.string().default("15m"),
    REFRESH_TOKEN_LIFE: z.string().default("7d"),

    REDIS_HOST: z.string().default("127.0.0.1"),
    REDIS_PORT: z.string().default("6379"),
    REDIS_DB: z.string().default("1"),

    MAIL_HOST: z.string().default("smtp.gmail.com"),
    MAIL_PORT: z.string().default("587"),
    MAIL_USER: z.string().email(),
    MAIL_APP_PASS: z.string().min(16, "MAIL_APP_PASS must be a valid app password"),
});

// Parse and validate environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error("❌ Invalid environment variables:", env.error.format());
    process.exit(1); // Exit the application if validation fails
}

export default env.data;
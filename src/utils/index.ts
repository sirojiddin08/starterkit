import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

/**
 * Formats different types of errors into a standardized API response format.
 * @param error - The error object (Zod validation error, Prisma error, or general error)
 * @returns Formatted error object
 */
const formatError = (error: unknown) => {
    if (error instanceof ZodError) {
        return {
            type: "ValidationError",
            errors: error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        };
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                return {
                    type: "DatabaseError",
                    code: error.code,
                    message: "Unique constraint failed. The provided value already exists.",
                };
            case "P2003":
                return {
                    type: "DatabaseError",
                    code: error.code,
                    message: "Foreign key constraint failed. The referenced record does not exist.",
                };
            case "P2025":
                return {
                    type: "DatabaseError",
                    code: error.code,
                    message: "Record not found. The operation cannot be completed.",
                };
            default:
                return {
                    type: "DatabaseError",
                    code: error.code,
                    message: error.message || "A database error occurred.",
                };
        }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return {
            type: "DatabaseValidationError",
            message: "Invalid data format sent to the database.",
            details: error.message, // Include Prisma's raw error message
        };
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return {
            type: "UnknownDatabaseError",
            message: "An unknown database error occurred.",
            details: error.message, // Include Prisma's raw error message
        };
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
        return {
            type: "PrismaInternalError",
            message: "Prisma encountered a low-level error.",
            details: error.message, // Include Prisma's raw error message
        };
    }

    if (error instanceof Error) {
        return {
            type: "ApplicationError",
            message: error.message,
        };
    }

    return {
        type: "UnknownError",
        message: "An unknown error occurred.",
    };
};

function ms (time: string): number {
    const unit = time.slice(-1); // Get the last character (h, m, d)
    const value = parseInt(time.slice(0, -1), 10); // Get the numeric part

    if (isNaN(value)) {
        throw new Error(`Invalid time format: ${time}`);
    }

    switch (unit) {
        case "s": return value * 1000;        // Seconds → Milliseconds
        case "m": return value * 60 * 1000;   // Minutes → Milliseconds
        case "h": return value * 60 * 60 * 1000; // Hours → Milliseconds
        case "d": return value * 24 * 60 * 60 * 1000; // Days → Milliseconds
        default: throw new Error(`Unsupported time unit in time: ${unit}`);
    }
}

export {
    ms,
    formatError
};
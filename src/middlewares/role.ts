import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: { role: string };
}

const authorizeRole = (requiredRole: string) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: "Access denied." });
        }
        next();
    };
};

export default authorizeRole;

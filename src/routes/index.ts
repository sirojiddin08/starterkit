import path from "path";
import express, { Router } from "express";
import isAuthenticated from "../middlewares/auth";

import userRoutes from "../modules/user/user.routes";
import authRoutes from "../modules/auth/auth.routes";
import productRoutes from "../modules/product/product.routes";

const router = Router();

// Serve static files without authentication
const uploadsPath = path.resolve(__dirname, "../../uploads");
router.use("/uploads", express.static(uploadsPath));
router.use("/auth", authRoutes);

// Authentication Middleware
router.use(isAuthenticated);

// Routes
router.use("/users", userRoutes);
router.use("/products", productRoutes);

export default router;
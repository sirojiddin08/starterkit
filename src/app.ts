import "dotenv/config";
import fs from "fs";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

// Custom middleware
import rateLimit from "./middlewares/rateLimit";
import errorHandler from "./middlewares/errorHandler";
import csrfProtection from "./middlewares/csrf";

// Routes
import routes from "./routes";

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add cookie parser for `csurf` to work with cookies
app.use(cookieParser());

// Refined CORS configuration
app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

// Refined Helmet configuration
app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
    })
);

// Apply rate limiting to all routes
app.use(rateLimit);

// Apply CSRF protection for state-changing methods
// app.use((req: Request, res: Response, next: NextFunction) => {
//     if (req.originalUrl.startsWith("/api/docs")) {
//         return next(); // Skip CSRF for Swagger routes
//     }
//     const stateChangingMethods = ["POST", "PUT", "PATCH", "DELETE"];
//     if (stateChangingMethods.includes(req.method)) {
//         csrfProtection(req, res, next);
//     } else {
//         next(); // Skip CSRF protection for non-state-changing methods
//     }
// });

// Middleware to pass CSRF token to the client
app.use((req: any, res: Response, next: NextFunction) => {
    if (typeof req.csrfToken === "function") {
        res.cookie("XSRF-TOKEN", req.csrfToken());
    }
    next();
});

// Log all requests
app.use(
    morgan("dev", {
        skip: (req) => req.originalUrl.startsWith("/api/docs"),
    })
);

// Serve Swagger UI
import swaggerFile from "./docs/swagger-output.json";
const swaggerDarkMode = fs.readFileSync("./public/css/theme-monokai.css", "utf8");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { customCss: swaggerDarkMode }));

// Routes
app.use("/api", routes);

// Catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error = new Error("Not Found");
    (error as any).status = 404;
    next(error);
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

export default app;
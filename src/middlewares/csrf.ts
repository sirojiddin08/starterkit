import csrf from "csurf";
import { RequestHandler } from "express";

// CSRF protection middleware
const csrfProtection: RequestHandler = csrf({ cookie: true });

export default csrfProtection;
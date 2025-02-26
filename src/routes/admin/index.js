const express = require("express");
const router = express.Router();

// Import specific admin route modules
const usersRoutes = require("./users");

// Use the imported routes
router.use("/users", usersRoutes);

module.exports = router;

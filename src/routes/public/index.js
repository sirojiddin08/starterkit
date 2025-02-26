const express = require("express");
const router = express.Router();

// Import specific public route modules
const contactRoutes = require("./contacts");

// Use the imported routes
router.use("/contacts", contactRoutes);

module.exports = router;

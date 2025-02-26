const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    /*  #swagger.tags = ['Contacts']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    res.json({ message: "GET contacts" });
});

router.get("/:id", (req, res) => {
    /*  #swagger.tags = ['Contacts']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    res.json({ message: "GET contacts by ID" });
});

router.post("/", (req, res) => {
    /*  #swagger.tags = ['Contacts']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    res.json({ message: "POST /contacts - Submit contact form" });
});

router.put("/", (req, res) => {
    /*  #swagger.tags = ['Contacts']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    res.json({ message: "PUT /contacts - Update contact form" });
});

router.delete("/", (req, res) => {
    /*  #swagger.tags = ['Contacts']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    res.json({ message: "DELETE /contacts - Delete contact form" });
});

module.exports = router;

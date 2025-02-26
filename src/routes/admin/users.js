const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    /*  #swagger.tags = ['Users']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    res.json({ message: "GET /users route" });
});

router.post("/", (req, res) => {
    /*  #swagger.tags = ['Users']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    res.json({ message: "POST /users route" });
});

router.delete("/:id", (req, res) => {
    /*  #swagger.tags = ['Users']
        #swagger.security = [{
            "apiKeyAuth": []
        }]
    */
    const userId = req.params.id;
    res.json({ message: `DELETE /users/${userId} route` });
});

module.exports = router;

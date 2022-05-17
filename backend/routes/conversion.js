/**
 * Conversions Router
 */

// imports
const express = require("express")
const conversionsRouter = express.Router()
const conversion = require("../functions/conversions/conversion")


// endpoints

// 
conversionsRouter.post("/convert", async (req, res) => {
    const result = await conversion.convert(
        req.body.magnitudeName,
        req.body.quantityA,
        req.body.unitA,
        req.body.unitB
    );
	res.send(result);
})


module.exports = conversionsRouter
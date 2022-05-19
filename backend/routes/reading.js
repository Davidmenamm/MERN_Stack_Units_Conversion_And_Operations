/**
 * Read Router
 */

// imports
const express = require("express")
const conversionsRouter = express.Router()
const read = require("../functions/reader/read")


// endpoints

// Magnitude
conversionsRouter.get("/read-magnitude", async (req, res) => {
    const result = await read.getMagnitudes();
	res.send({data: result});
})

// Units
conversionsRouter.get("/read-units", async (req, res) => {
    const result = await read.getAllUnits(req.query.magnitudeName);
	res.send({data: result});
})


module.exports = conversionsRouter
/**
 * Operations Router
 */

// import
const express = require("express")
const operationsRouter = express.Router()
const operation = require("../functions/operations/operation")


// endpoints

// calculate
operationsRouter.post("/calculate", async (req, res) => {
    const result = await operation.operate(
        req.body.operator, 
        req.body.magnitudeName,
        req.body.quantityA,
        req.body.unitA,
        req.body.quantityB,
        req.body.unitB
    );
	res.send(result);
})


module.exports = operationsRouter
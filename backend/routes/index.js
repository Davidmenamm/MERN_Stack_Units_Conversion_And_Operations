/**
 * Base Router
 */

// imports
const express = require("express")
const router = express.Router()
const conversion = require("./conversion")
const operation = require("./operation")

// router paths
// conversions
router.use("/conversion", conversion);
// operations
router.use("/operation", operation);

module.exports = router
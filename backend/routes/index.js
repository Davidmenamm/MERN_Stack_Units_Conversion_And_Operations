/**
 * Base Router
 */

// imports
const express = require("express")
const router = express.Router()
const conversion = require("./conversion")
const operation = require("./operation")
const reading = require("./reading")

// router paths
// conversions
router.use("/conversion", conversion);
// operations
router.use("/operation", operation);
// read
router.use("/reading", reading);

module.exports = router
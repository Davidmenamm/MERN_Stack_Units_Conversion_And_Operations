/**
 * Read Database
 */
// imports
const magnitude = require("../../models/magnitude")
const unit = require("../../models/unit")
const query = require("../../utils/query")

// get magnitude
module.exports.getMagnitudes = async () => {
    // magnitude
    const magnitudes = await magnitude.find();
    return magnitudes;
}

// get all units from a magnitude
module.exports.getAllUnits = async (magnitudeName) => {
    const selectedMagnitude = await magnitude.find(query.getMagnitude(magnitudeName));    
    const selectedUnits = await unit.find(query.getAllUnits(selectedMagnitude[0]._id));
    return selectedUnits;
}
/**
 * Add two quantities in different units together.
 */
// imports
const magnitude = require("../../models/magnitude")
const unit = require("../../models/unit")
const query = require("../../utils/query")

// add two quantities in different units together
module.exports.convert = async (magnitudeName, quantityA, unitA, unitB) => {
    // magnitude
    const selectedMagnitude = await magnitude.find(query.getMagnitude(magnitudeName));
    // units
    const selectedUnits = await unit.find(query.getUnits(selectedMagnitude[0]._id, [unitA, unitB]));
    // base units
    const quantityABaseUnits = selectedUnits.find(u => u.name === unitA).quantity_base_unit;
    // convert quantities to base units
    const quantityFromBase = quantityA * quantityABaseUnits;
    // convert result to initial units
    const quantityToUnits= quantityFromBase / selectedUnits.find(u => u.name === unitB).quantity_base_unit;
    // return result
    const resultObject = {
        _id: Math.random().toString(36).substring(2, 15),
        quantity: quantityToUnits,
        unit: unitB
    }
    return resultObject;
}
/**
 * Add two quantities in different units together.
 */
// imports
const magnitude = require("../../models/magnitude")
const unit = require("../../models/unit")
const query = require("../../utils/query")
const conversion = require("../conversions/conversion")


// add two quantities in different units together
module.exports.operate = async (operator, magnitudeName, quantityA, unitA, quantityB, unitB) => {
    // magnitude
    const selectedMagnitude = await magnitude.find(query.getMagnitude(magnitudeName));
    // convert quantities to base units
    const quantityABase = (await conversion.convert(magnitudeName, quantityA, unitA, selectedMagnitude[0].base_unit)).quantity;
    const quantityBBase = (await conversion.convert(magnitudeName, quantityB, unitB, selectedMagnitude[0].base_unit)).quantity;
    console.log('quantityABase', quantityABase);
    console.log('quantityBBase', quantityBBase);
    // operate quantities
    let result;
    switch (operator) {
        case "add":
            result = quantityABase + quantityBBase;
            break;
        case "subtract":
            result = quantityABase - quantityBBase;
            break;
        case "multiply":
            result = quantityABase * quantityBBase;
            break;
        case "divide":
            result = quantityABase / quantityBBase;
            break;
    }
    // convert result to initial units
    const resultInUnitsA = await conversion.convert(magnitudeName, result,  selectedMagnitude[0].base_unit, unitA);
    const resultInUnitsB = await conversion.convert(magnitudeName, result,  selectedMagnitude[0].base_unit, unitB);
    console.log('resultInUnitsA', resultInUnitsA);
    console.log('resultInUnitsB', resultInUnitsB);
    // return result
    const resultObject = {
        _id: Math.random().toString(36).substring(2, 15),
        quantityA: resultInUnitsA.quantity,
        unitA,
        quantityB: resultInUnitsB.quantity,
        unitB
    }
    return resultObject;
}
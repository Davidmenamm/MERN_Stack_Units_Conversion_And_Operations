/**
 * Queries done in the application
 */

// get magnitude
module.exports.getMagnitude = (magnitudName) => { return {name : magnitudName} }
// get multiple specific units
module.exports.getUnits= (magnitude_id, units) => { return {"$and": [{name : { $in : units }}, {magnitude_id}]} }
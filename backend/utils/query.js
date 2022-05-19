/**
 * Queries done in the application
 */

// get magnitude
module.exports.getMagnitude = (magnitudName) => { return {name : magnitudName} }
// get multiple specific units
module.exports.getUnits= (magnitude_id, units) => { return {"$and": [{name : { $in : units }}, {magnitude_id}]} }
// get all units from a magnitude
module.exports.getAllUnits= (magnitude_id) => { return { magnitude_id: magnitude_id } }
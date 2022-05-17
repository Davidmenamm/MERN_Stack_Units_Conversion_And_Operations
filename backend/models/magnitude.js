let mongoose = require('mongoose');
let Schema = mongoose.Schema;

magnitudeSchema = new Schema({
	_id: Schema.ObjectId,
    name: String,
    base_unit: String,
    date_update: Date,
    active: Boolean
}, { collection: 'magnitude' }),

magnitude = mongoose.model('magnitude', magnitudeSchema);

module.exports = magnitude;
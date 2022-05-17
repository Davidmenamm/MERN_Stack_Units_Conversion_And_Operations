let mongoose = require('mongoose');
let Schema = mongoose.Schema;

unitSchema = new Schema({
	_id: Schema.ObjectId,
    magnitude_id: Schema.ObjectId,
    name: String,
    unit: String,
    quantity_base_unit: Number,
    date_update: Date,
    active: Boolean
}, { collection: 'unit' }),

magnitude = mongoose.model('unit', unitSchema);

module.exports = magnitude;
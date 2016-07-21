var mongoose = require('mongoose');
var BaseSchema = require('./base');
var Schema = mongoose.Schema;

var WatProSchema = BaseSchema.extend({
  name: {type: String},
  isLadder: {type: Boolean, default:false},
  ladder1: {max: Number, items:[{type: Schema.Types.ObjectId, ref: 'Item'}]}
  // ladders: [{max: Number, items: {type: Schema.Types.Array, ref: 'Item'}}]
  // ladder2: {max: Number, items: [itemSchema]},
  // ladder3: {max: Number, items: [itemSchema]},
});

var WatPro = mongoose.model('WatPro', WatProSchema);

exports.WatPro = WatPro;
exports.WatProSchema = WatProSchema;

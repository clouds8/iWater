var mongoose = require('mongoose');
var BaseSchema = require('./base');

var AcPeriSchema = BaseSchema.extend({
  year: {type: Number, require: true},
  month: {type: Number, min:1 ,max:12, require: true},
  time: {type: Number, require: true},
  name: {type: String},
  settled: {type: Boolean, default: false}
});

var AcPeri = mongoose.model('AcPeri', AcPeriSchema);
exports.AcPeri = AcPeri;

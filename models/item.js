var mongoose = require('mongoose');
var BaseSchema = require('./base');
var Schema = mongoose.Schema;

var ItemSchema = BaseSchema.extend({
  name: String,
  price: Number,
  tags: []
});

var Item = mongoose.model('Item', ItemSchema);
exports.Item = Item;

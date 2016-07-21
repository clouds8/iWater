var mongoose = require('mongoose');
var BaseSchema = require('./base');

var UserSchema = BaseSchema.extend({
// name: 
// pass:
// role:
// depa:
});
var User = mongoose.model('User', UserSchema);
exports.User = User;

var mongoose = require('mongoose');
var BaseSchema = require('./base');

var RoleSchema = BaseSchema.extend({

});

var Role = mongoose.model('Role', RoleSchema);
exports.Role = Role;

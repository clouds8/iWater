var mongoose = require('mongoose');
var BaseSchema = require('./base');
var Schema = mongoose.Schema;

var RoleSchema = BaseSchema.extend({
  roleName: {type: String},
  auths: [{type: Schema.Types.ObjectId, ref: 'Auth'}],
  disabled: {type: Boolean, default:false},
  desc: {type: String}
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

RoleSchema.virtual('disabledAlis')
.get(function () {
  return this.disabled?"已禁用":"已启用";
})
.set(function (alis) {
  if (alis == '已禁用') {
    this.disabled = true;
  } else if (alis == '已启用'){
    this.disabled = false;
  }
});

var Role = mongoose.model('Role', RoleSchema);
exports.Role = Role;
exports.RoleSchema = RoleSchema;

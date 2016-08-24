
var mongoose = require('mongoose');
var BaseSchema = require('./base');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var UserSchema = BaseSchema.extend({
  name: {unique:true, type: String},
  // name: {type: String},
  password: {type: String},
  roles: [{type: Schema.Types.ObjectId, ref: 'Role'}],
  disabled: {type: Boolean, default:false}
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

UserSchema.virtual('disabledAlis')
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

// UserSchema.pre('save', function (next) {
//   var user = this;
//   if (user.isNew) {
//     user.createTime = user.modifyTime = Date.now();
//   } else {
//     user.modifyTime = Date.now();
//   }
//
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) {
//       return next(err);
//     } else {
//       bcrypt.hash(user.password, salt, function (err, hash) {
//         if (err) {
//           return next(err);
//         } else {
//           user.password = hash;
//         }
//       });
//     }
//   });
// });

UserSchema.methods = {
  comparePassword: function (_password, cb) {
    bcrypt.compare(_password, this.password, function (err, isMatch) {
      if (err) {
        cb(err);
      } else {
        cb(null, isMatch);
      }
    });
  }
};

var User = mongoose.model('User', UserSchema);
exports.User = User;
exports.UserSchema = UserSchema;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
  Authority Schema 权限的数据结构
 */
var AuthSchema = new mongoose.Schema({
    //
    // _id: {type: Schema.Types.ObjectId, unique: true},
    //
    text: {type: String},
    //
    parentID: {type: Schema.Types.ObjectId},
    //
    icon: {type: String},
    //
    selectedIcon: {type: String},
    //
    href: {type: String},
    //
    selectable:{type: Boolean, default:true},
    //
    state: {
      checked: {type: Boolean, default: false},
      disabled: {type: Boolean, default: false},
      expanded: {type: Boolean, default: false},
      selected: {type: Boolean, default: false}
    }

});

var Auth = mongoose.model('Auth', AuthSchema);
exports.AuthSchema = AuthSchema;
exports.Auth = Auth;
exports.setting = setting;


var setting = {
  data: {
    key: {
      children: "nodes",
      name: "text",

    },
    simpleData: {
      idKey: "_id",
      pIdKey: "parentID",
      rootPId: null
    }
  }
}

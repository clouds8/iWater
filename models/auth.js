var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
  Authority Schema 权限的数据结构
  参考bootstrap tree 的 node结构
 */
var AuthSchema = new mongoose.Schema({
    //
    // _id: {type: Schema.Types.ObjectId, unique: true},
    //权限名称
    text: {type: String},
    //父权限ID
    parentID: {type: Schema.Types.ObjectId},
    //权限图标class
    icon: {type: String},
    //选中的图标class
    selectedIcon: {type: String},
    //链接
    href: {type: String, default: ''},
    //排序值, 数字越小排越前
    order: {type: Number, default: 10},

    //是否可选  （可用于区分是母节点还是叶子节点）
    //Whether or not a node is selectable in the tree.
    //False indicates the node should act as an expansion heading
    //and will not fire selection events
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
// exports.setting = setting;
// var setting = {
//   data: {
//     key: {
//       children: "nodes",
//       name: "text",
//
//     },
//     simpleData: {
//       idKey: "_id",
//       pIdKey: "parentID",
//       rootPId: null
//     }
//   }
// }

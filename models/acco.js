var mongoose = require('mongoose');
var BaseSchema = require('./base');
var Schema = mongoose.Schema;


var AccoSchema = BaseSchema.extend({
  // 身份证号码
  custID: {type: String},
  // 姓名
  custName: {type: String},
  // 电话
  tele: {type: String},
  // 用户地址
  addre: {type: String},
  // 水表ID
  meterID: {type: String},
  // 水表类型
  meterType: {type: String},
  // 用水性质
  watPro: [{type: Schema.Types.ObjectId, ref: 'WatPro'}],
  // 付费模式
  payMode: {type: String},
  // 用水人口
  famiNum: {type: String},
  // 抄表频率
  Freq: [{type: Number, min:1, max:12}]
});

var Acco = mongoose.model('Acco', AccoSchema);
exports.Acco = Acco;

var mongoose = require('mongoose');
var BaseSchema = require('./base');

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
  watPro: [{type: String, ref: 'watPro'}],
  // 付费模式
  payMode: {type: String},
  // 用水人口
  famiNum: {type: String},
  // 抄表频率
  Freq: {type: String},
});

var Acco = mongoose.model('Acco', AccoSchema);
exports.Acco = Acco;

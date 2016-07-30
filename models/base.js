var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
//基础Schema
var BaseSchema = new mongoose.Schema({
    //创建时间
    createTime: {type: Date, default: Date.now},
    //修改时间
    modifyTime: {type: Date, default: Date.now}
});
module.exports = BaseSchema;

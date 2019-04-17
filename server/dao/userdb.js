var mongoose = require('../config/db.js'),
    Schema = mongoose.Schema;
    mongoose.Promise = Promise;

var UserSchema = new Schema({          
    name : { type: String },                    //用户账号
    pwd: {type: String},                        //密码
    email: {type: String},						//邮箱
    explain: {type: String},					//说明
    sex: {type: String, default: 'asexual'},						//性别
    birth: {type: Date},                        //生日日期
    imgurl: {type: String, default: 'user.png'},						//头像路径 
    registerdate : { type: Date},				//注册时间   
    online: {type: Number},                      //是否在线0和1
    grade: {type: Number,default: 0}            //权限等级
});

module.exports = mongoose.model('User',UserSchema);
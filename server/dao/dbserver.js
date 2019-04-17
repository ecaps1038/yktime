var mongoose = require('../config/db.js'),
    Schema = mongoose.Schema;
    mongoose.Promise = Promise;

//文章/作品 id  属性(1、2)   名称   分类(1/2/3)   标签   摘要   正文   保存时间   是否发布(0/1)   封面图片   查看次数 
var WorksSchema = new Schema({          
    name: {type: String},					   					//名称
    types: {type: Number},					   					//属性
    classlfy: {type: Number},					   				//分类
    introduc: {type: String},					   				//摘要
    content: {type: String},					   				//正文内容
    icon: {type: String, default: 'group.png'},					//封面图片
    time: {type: Date},  										//保存时间
    release: {type: Number},  									//是否发布
    times: {type: Number},  									//查看次数
});

// //群成员表
// var GroupuserSchema = new Schema({          
//     groupID: {type:Schema.Types.ObjectId,ref:'Group'},          //群id
//     userID: {type:Schema.Types.ObjectId,ref:'User'},            //用户id
//     name: {type: String},					   					//群内名称
//     time: {type: Date},  										//加入时间
//     status: {type: Number,default: 0},  						//未读消息数
//     lasttime: {type: Date},                      				//最后通话时间
//     shield: {type: Number,default: 0}     						//是否屏蔽（0,1,2）
// });

// //群消息表
// var GroupmsgSchema = new Schema({          
//     groupID: {type:Schema.Types.ObjectId,ref:'Group'},          //群id
//     fromID: {type:Schema.Types.ObjectId,ref:'User'},            //发送者id
//     content: {type: String},					   			    //消息内容
//     time: {type: Date},  										//发送时间
//     fromname: {type: String},  									//发送者昵称
// });

module.exports = mongoose.model('Works',WorksSchema);
// module.exports = mongoose.model('Groupuser',GroupuserSchema);
// module.exports = mongoose.model('Groupmsg',GroupmsgSchema);
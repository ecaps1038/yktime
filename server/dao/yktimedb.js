var mongoose = require('mongoose');
var db = require('../config/yikedb.js'),
    Schema = mongoose.Schema;
    mongoose.Promise = Promise;

//文章/作品 id  属性(1、2)   名称   分类(1/2/3)   标签   摘要   正文   保存时间   是否发布(0/1)   封面图片   查看次数 
var WorksSchema = new Schema({          
    userid: {type: String},					   					//用户id
    types: {type: Number},                                      //属性
    name: {type: String},                                       //名称
    classlfy: {type: Number},					   				//分类
    tep: {type: String},                                        //标签
    introduc: {type: String},					   				//简介
    content: {type: String},					   				//正文内容
    icon: {type: String},					                    //封面图片
    time: {type: Date},  										//保存时间
    release: {type: Number},  									//是否发布
    times: {type: Number,default: 0},  							//查看次数
    likes: {type: Number,default: 0},                            //喜欢次数
});

//评论表
var CommentSchema = new Schema({
    worksID: {type:Schema.Types.ObjectId,ref:'Works'},    //文章id
    comment:{type:String},
    time:{type:Date},
    ip:{type:String},
    name:{type:String},
    icon: {type:String},
});
//喜欢表
var LikeSchema = new Schema({
    worksID: {type:Schema.Types.ObjectId,ref:'Works'},    //文章id
    time:{type:Date},
    userid:{type:String},
});

//日志表
var DiarySchema = new Schema({
    userid: {type: String},                                     //用户id
    content:{type:String},
    time:{type:Date},
    title:{type:String},
    imgs: {type:String},
    love: {type: Number,default: 0},                            //喜欢次数
    types: {type: Number},                                      //属性
});

//回复我表
var ReplySchema = new Schema({
    replys:{type:String},
    time:{type:Date},
    name: {type:String},
    ip: {type:String},
    chak: {type: Number,default: 0},                        //是否查看，0为未查看。
});

//页面浏览记录
var VisitSchema = new Schema({
    ip: {type:String},                                           //访问ip
    time: {type:Date},                                           //访问时间
    types: {type: Number},                                       //访问位置 0，1，2，3，4
});
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

module.exports = db.model('Works',WorksSchema);
module.exports = db.model('Comment',CommentSchema);
module.exports = db.model('Diary',DiarySchema);
module.exports = db.model('Reply',ReplySchema);
module.exports = db.model('Like',LikeSchema);
// module.exports = mongoose.model('Groupuser',GroupuserSchema);
// module.exports = mongoose.model('Groupmsg',GroupmsgSchema);
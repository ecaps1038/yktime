var dbserver = require('./dbserver');

//跳转详情页面前期准备
exports.toDetial = function(req,res){
	var id = req.body.data;
	res.cookie('workid',id,{signed:true, path:'http://localhost:8080', maxAge: 1000*10});
	dbserver.addTimes(id,res);
	//res.send({success:true,tep:0});	
};
//进入detail页面
exports.detial = function(req,res){
	if(req.signedCookies.workid){
		req.session.detialId = req.signedCookies.workid;
		var id = req.session.detialId;
		dbserver.getoneData(id,res);
	}else if(req.session.detialId){
		var id = req.session.detialId;
		dbserver.getoneData(id,res);
	}else{
		var data = {
			tep:0,
		}
		res.send({success:true,data:data});
	}
}

//评论处理
//提交评论
exports.upcomment = function(req,res){
	var comment = req.body.comment;
	var name = req.body.name;
	var icon = req.body.icon;
	var workid = req.session.detialId;
	var comments = {
		worksID: workid,
		comment: comment,
		time: new Date(),
		icon: icon,
		name: name,
	}
	dbserver.insertComment(comments,res);
}

//获取评论
exports.getcomment = function(req,res){
	var workid = req.session.detialId;
	//console.log('workid是'+workid);
	dbserver.getCommentData(workid,res);
}
//获取评论数
exports.getcommentcount = function(req,res){
	var workid = req.session.detialId;
	//console.log('workid是'+workid);
	dbserver.getCommentCount(workid,res);
}
//获取日志
exports.getDiary = function(req,res){
	dbserver.getDiary(req,res);
}
//删除日志
exports.deleteDiary = function(req,res){
	dbserver.deleteDiary(req,res);
}

//后台获取总数
exports.mageCount = function(req,res){
	var num = req.body.num;
	dbserver.mageCount(num,res);
}
//后台获取总数
exports.getAllCommentCount = function(req,res){
	dbserver.getAllCommentCount(res);
}
//后台获取总数
exports.getAllComment = function(req,res){
	dbserver.getAllComment(req,res);
}
//删除评论或留言
exports.deleteCoR = function(req,res){
	var num = req.body.num;
	if(num == 0){
		dbserver.deleteReply(req,res);
	}else if(num ==1){
		dbserver.deleteComment(req,res);
	}
}
//后台获取总数
exports.reply = function(req,res){
	var ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
	var data = {
		replys:req.body.replys,
		name:req.body.name,
		ip:ip,
		time:new Date()
	}
	dbserver.insertReply(data,res);
}
exports.getReplyCount = function(req,res){
	var data = req.body.num;
	dbserver.getReplyCount(data,res);
}
exports.getAllReply = function(req,res){
	dbserver.getAllReply(req,res);
}


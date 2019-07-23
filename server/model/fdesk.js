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
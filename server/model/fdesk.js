var dbserver = require('./dbserver');

//跳转详情页面前期准备
exports.toDetial = function(req,res){
	var id = req.body.data;
	res.cookie('workid',id,{signed:true, path:'http://localhost:8080', maxAge: 1000*10});
	dbserver.addTimes(id,0,res);
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
//移动端进入detail页面
exports.detial1 = function(req,res){
	var id = req.body.id;
	dbserver.getoneData(id,res);
}
//移动端进入detail页面
exports.timesadd = function(req,res){
	var id = req.body.id;
	var tap= req.body.tap;
	dbserver.addTimes(id,tap,res);
}

//评论处理
//提交评论
exports.upcomment = function(req,res){
	var comment = req.body.comment;
	var name = req.body.name;
	var icon = req.body.icon;
	if(req.session.detialId){
		var workid = req.session.detialId;
	}else{
		var workid = req.body.workid;
	}
	if(req.session.userId){
		var uid = req.session.userId;
	}else if(req.body.uid!=1){
		var uid = req.body.uid;
	}else{
		var uid = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
	}
	console.log('id:'+uid)
	var comments = {
		worksID: workid,
		comment: comment,
		time: new Date(),
		icon: icon,
		name: name,
		ip:uid,
	}
	dbserver.insertComment(comments,res);
}

//获取评论
exports.getcomment = function(req,res){
	if(req.session.detialId){
		var workid = req.session.detialId;
	}else{
		var workid = req.body.workid;
	}
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
//获取美图
exports.getPhotos = function(req,res){
	dbserver.getPhotos(req,res);
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

//添加like表
exports.insertLike = function(req,res){
	var tap =req.body.tap;
	var id = req.body.id;
	if(id == 1){
		id = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
	}
	var workid = req.body.wid;
	var likes = {
		worksID: workid,
		userid: id,
		time: new Date(),
	}
	dbserver.insertLike(likes,res);
}
//获取喜欢数
exports.getlikecount = function(req,res){
	var workid = req.body.wid;
	//console.log('workid是'+workid);
	dbserver.getLikeCount(workid,res);
}
//获取是否已经喜欢
exports.getlikesf = function(req,res){
	var workid = req.body.wid;
	var id = req.body.id;
	if(id==1){
		id = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
	}
	//console.log('workid是'+workid);
	dbserver.getLikesf(workid,id,res);
}


var dbserver = require('./dbserver');

//获取上传数据头部
exports.uptitle = function(req,res){   
    console.log(req.body.title);
    //title,label,intro,value,just
    res.send({success:true,tep:0});
};

//提交富文本及基本数据
exports.insertfwb = function(req,res){
	var fwb = req.body.html;
	var id = req.session.userId;
	console.log('id'+id+'是'+fwb);
	var works = {
		userid: id,
		content: fwb,
		time: new Date(),
		release: 0,
	}
	dbserver.insertWorks(works,res);
}

//修改富文本数据
exports.showWorks = function(req,res){
	var wherestr = {};
	var out = {};
	dbserver.showWorks(wherestr,out);
}

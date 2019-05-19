var dbserver = require('./dbserver');

//初次创建文档数据
exports.insert = function(req,res){
	var num = req.body.num;
	var uid = req.session.userId;
	var works = {
			userid: uid,
			types: num,
			time: new Date(),
			release: 0,
		}
		dbserver.insertWorks(works,res);
}

//获取上传数据头部
exports.uptop = function(req,res){ 
	var wid = req.session.workid;
	var num = req.body.num;
	console.log(num);
	if(num == 0){
		var value = req.body.data;
		var data = {
			name:value,
			time: new Date(),
		};
	}else if(num == 1){
		var value = req.body.data;
		var data = {
			classlfy: value,
			time: new Date(),
		}
	}else if(num == 2){
		var value = req.body.data;
		var data = {
			tep: value,
			time: new Date(),
		}
	}else if(num == 3){
		var value = req.body.data;
		var data = {
			introduc: value,
			time: new Date(),
		}
	}else if(num == 4){
		var value = req.body.data;
		var data = {
			icon: value,
			time: new Date(),
		}
	}else if(num == 5){
		var fwb = req.body.html;
		console.log(fwb);
		var data = {
			content: fwb,
			time: new Date(),
		}
	}else if(num == 6){
		var data = {
			release: 1,
			time: new Date(),
		}
	}
	dbserver.update(data,wid,res);
    //console.log(req.body.title);
    //title,label,intro,value,just
    //res.send({success:true,tep:0});
};

//获取数据
exports.getdata = function(req,res){
	wid = req.session.workid;
	dbserver.getoneData(wid,res);
}

/*********其他*********/

//提交富文本及基本数据
exports.fwb = function(req,res){
	var fwb = req.body.html;
	var wid = req.session.workid;
		var works = {
			content: fwb,
			time: new Date(),
		}
		dbserver.updateWorks(works,wid,res);
	
}
exports.fwb1 = function(req,res){
	var fwb = req.body.html;
	var wid = req.body.id;
	var uid = req.session.userId;
	if(wid == 0){
		var works = {
			userid: uid,
			content: fwb,
			time: new Date(),
			release: 0,
		}
		dbserver.insertWorks(works,res);
	}else{
		var works = {
			content: fwb,
			time: new Date(),
		}
		dbserver.updateWorks(works,wid,res);
	}
}

//修改富文本数据
exports.showWorks = function(req,res){
	var wherestr = {};
	var out = {};
	dbserver.showWorks(wherestr,out);
}

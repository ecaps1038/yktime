var login = require('../model/login');
var file = require('../model/file');
var updata = require('../model/upload');
var multer = require("multer");

var aaa='./data/cover/';
var photoname = '';
var wid = '';
var storage = multer.diskStorage({
  	destination: function (req, file, cb) {
	    cb(null, aaa)
  	},
  	filename: function (req, file, cb) {
  		if(wid){
  			var str = file.originalname.split('.');
	        cb(null, wid+'.'+str[1]);
  		}else{
  			var str = file.originalname.split('.');
	    	cb(null, Date.now()+'.'+str[1]);
  		}
  	}
})
var storage1 = multer.diskStorage({
  	destination: function (req, file, cb) {
	    cb(null, './data/works/')
  	},
  	filename: function (req, file, cb) {
  		var str = file.originalname.split('.');
	    cb(null, Date.now()+'.'+str[1]);
  	}
})
var upload = multer({ storage: storage });
var upload1 = multer({storage: storage1});

module.exports = function(app){
	//查询数据库信息
	app.post('/user',function(req,res){
		var from = req.body.firstName;
		var to = req.body.lastName;
		var context = {from,to};
		res.send({success:true,context});
	});	
	//用户登陆
	app.post('/login',function(req,res){
		var email = req.body.name;
		var pswd = req.body.psw;
		login.logIn(email,pswd,req,res);
		// res.send({success:true,context});
	});
	//首页验证
	app.get('/login',function(req,res){
		console.log(req.signedCookies.id)
		if(req.signedCookies.id){
			req.session.userId = req.signedCookies.id;
			req.session.username = req.signedCookies.username;
			req.session.imgurl = req.signedCookies.imgurl;
			var id = req.session.userId;
		    var myimgurl = req.session.imgurl;
		    var myname = req.session.username;
			res.send({success:true,id:id,myimgurl:myimgurl,myname:myname});
			console.log('bbb');
		}else if(req.session.userId){
			var id = req.session.userId;
			var myimgurl = req.session.imgurl;
		    var myname = req.session.username;
			res.send({success:true,id:id,myimgurl:myimgurl,myname:myname});
			console.log('ccc');
		}else{
			//res.redirect('/');
			console.log('ddd');
		}
	});
	//用户退出
	app.get('/quit', function(req,res) {
        login.logout(req,res);
	});	
	//用户管理权限
	app.get('/manage', function(req,res) {
		if(req.session.userId){
			var myimgurl = req.session.imgurl;
			var myname = req.session.username;
			res.send({success:true,tep:1,myname:myname,myimgurl:myimgurl});
			//aaa = path;
		}else{
			res.send({success:true,tep:0});
		}
	});	
	//后台上传图片
	app.post("/uploadphoto",upload.array("file",20),function(req,res,next){
		
		var arr = [];
		for(var i in req.files){
			arr.push(req.files[i].filename);
		}
		res.json({
			code:200,
			data:arr
		})
		//res.send({success:true});
	});
	//fwb上传图片
	app.post("/fwbuploadphoto",upload.array("file",20),function(req,res,next){
		
		res.json({
			code:200,
		})
		//res.send({success:true});
	});
	//删除图片
	app.post('/delfile',function(req,res){
		var path = req.body.path;
		file.delFiles(res,path);
	});

	//文章操作
	//初创建文章表
	app.post('/creatework',function(req,res){
		var num = req.body.num;
		//console.log(num);
		updata.insert(req,res);
	});
	//进入upwork前判断
	app.post('/upwork', function(req,res) {
		console.log('upwork');
		if(req.signedCookies.workid && req.session.userId){
			console.log('b');
			req.session.workid = req.signedCookies.workid;
			wid = req.session.workid;
			var data = {
				tep:1,
				wid:wid,
			}
			res.send({success:true,data:data});
			//aaa = path;
		}else if(req.session.workid){
			//wid = req.session.workid;
			updata.getdata(req,res);
			//console.log('不是初次编辑');
			//res.send({success:true,tep:2});
		}
		else{
			res.send({success:true,tep:0});
		}
	});	

	//后台上传封面图片
	app.post("/uploadcover",upload.array("file",20),function(req,res,next){
		//获取文件名
		photoname = req.files[0].filename;
		console.log(photoname);
		res.json({
			code:200,
			data:photoname
		})
		//res.send({success:true});
	});

	//获取图片
	app.post('/showphoto',function(req,res){
		var path = req.body.path;
		aaa = path;
		file.showFiles(req,res,path);
	});

	//文章上传头部
	app.post('/uptitle',function(req,res){
		updata.uptop(req,res);
	});
	//fwb收集
	app.post('/upfwb',function(req,res){
		updata.uptop(req,res);
	});
	app.get('/fwbonload',function(req,res){
		if(req.session.workid){
			updata.getfwb(req,res);
		}
	});

	//前台页面
	//home页面获取文章数据
	app.post('/showwork',function(req,res){
		updata.getall(req,res);
	})
}

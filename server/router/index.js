var login = require('../model/login');
var file = require('../model/file')
var multer = require("multer");

var aaa='./data/work/';
var storage = multer.diskStorage({
  	destination: function (req, file, cb) {
	    cb(null, aaa)
  	},
  	filename: function (req, file, cb) {
	  	var str = file.originalname.split('.');
	    cb(null, Date.now()+'.'+str[1]);
  	}
})
var upload = multer({ storage: storage });

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

	//获取图片
	app.post('/showphoto',function(req,res){
		var path = req.body.path;
		//console.log('哈哈'+path);
		aaa = path;
		file.showFiles(req,res,path);
	});

	app.get('/test',function(req,res){
		console.log('你来了');
	})

}

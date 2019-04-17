var User = require("../dao/userdb.js");
var bcrypt = require('bcryptjs');

//登陆
exports.logIn = function(data,pwd,req,res){
    var wherestr = {$or:[{'email': data},{'name': data}]};
    var out = {'name':1,'pwd':1,'email':1,'online':1,'imgurl':1};
    User.find(wherestr, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
            return res.redirect('/');
        }
        else {
            if(ress==''){
                res.send({success:true,tep:1,return:'输入邮箱或用户名有误，请重新输入'});
            }
            ress.map(function(ver){
                const pwdMatchFlag =bcrypt.compareSync(pwd, ver.pwd);
                if(pwdMatchFlag){
                    res.cookie('id',ver._id,{signed:true,path:'http://localhost:8080', maxAge: 1000});
                    res.cookie('username',ver.name,{signed:true,path:'http://localhost:8080', maxAge: 1000});
                    if(ver.imgurl){
                        res.cookie('imgurl',ver.imgurl,{signed:true,path:'http://localhost:8080', maxAge: 1000}); 
                   }else{
                        res.cookie('imgurl','user.jpg',{signed:true,path:'http://localhost:8080', maxAge: 1000});
                   }
                  
                    res.send({success:true,tep:0});
                   //return res.redirect('/yike');
                }else{
                    //console.log('匹配失败！');
                    res.send({success:true,tep:1,return:'用户或密码错误，请重新输入'});
                    //return res.render('home',{return:'用户或密码错误，请重新输入',ret:data});
                }            
            })
        }
    })
};

//退出
exports.logout = function(req,res){
    var id = req.session.userId;
    delete req.session.userId;
    res.send({success:true});
};

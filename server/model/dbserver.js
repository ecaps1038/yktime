var workdb = require("../dao/yktimedb.js");
var Works = workdb.model('Works');
var bcrypt = require('bcryptjs');

//获取数据添加works表
exports.insertWorks = function(data,ress){

    var works = new Works(data);

    works.save(function (err, res) {
        if (err) {
            console.log("works添加失败" + err);
        }
        else {
        	ress.send({success:true,rest:res._id});
            //ress.cookie('workid',res._id,{signed:true, path:'http://localhost:8080', maxAge: 1000*60*60*2});
            //console.log("群添加成功");
        }
    });
};

//查询
exports.showWorks = function(wherestr,out){
    //var wherestr = {'username' : '小黄'};
    //var age = {'userage':{$gte:12,$lte:14}};
    //var out = {'username':1,'userage':1,'_id':0};
    User.find(wherestr, out, function(err, ress){
        if(err){
            console.log('搜索失败');
        }else{
            var context = {
                res: res.map(function(vacation){
                    return {
                        id: vacation._id,
                        userid: vacation.userid,
                        content: vacation.content,
                        // explain: vacation.explain,
                        // sex: vacation.sex,
                        // imgurl: vacation.imgurl,
                        // online: vacation.online,
                    }
                })
            };
            res.send({success:true,context});
        }
    });
};

//退出
exports.logout = function(req,res){
    var id = req.session.userId;
    delete req.session.userId;
    res.send({success:true});
};

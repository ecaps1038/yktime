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
            ress.cookie('workid',res._id,{signed:true, path:'http://localhost:8080', maxAge: 1000*10});
        	ress.send({success:true});
            //console.log("群添加成功");
        }
    });
};
//更新文本提交内容
exports.update = function(data,wid,ress){
    var id = {_id:wid};
    Works.findOneAndUpdate(id, data, function(err, res){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            ress.send({success:true,tep:0});
        }
    });
}
//更新富文本内容
exports.updateWorks = function(data,wid,ress){
    var id = {_id:wid};
    Works.findOneAndUpdate(id, data, function(err, res){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            ress.send({success:true,rest:res._id});
        }
    });
}

//根据id查询一条数据
exports.getoneData = function(id,res){
    //var id = {'username' : '小黄'};
    //var age = {'userage':{$gte:12,$lte:14}};
    var out = {};
    Works.findById(id, out, function(err, ress){
        if(err){
            console.log('搜索失败');
        }else{
            var data = {
                res:ress,
                tep:2,
            }
            res.send({success:true,data:data});
        }
    });
};

//查询所有数据
exports.getallData = function(res){
    var wherestr = {'release':1};
    var updatestr = {'status': 1};
    //var age = {'userage':{$gte:12,$lte:14}};
    var out = {};
    Works.find(wherestr, out, function(err, ress){
        if(err){
            console.log('搜索失败');
        }else{
            res.send({success:true,ress});
        }
    });
};

//分页查询所有数据
exports.getallData1 = function(res,id,nowPage){
    var sel = {'release':1};
    // if(select){
    //     sel = {'name':{$regex : select}};
    // }
    var pageSize = 8;                   //一页多少条
    var sort = {'time':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (nowPage - 1) * pageSize;   //跳过数
    var d = skipnum;

    var query = Works.find({});
    //根据userID查询
    query.where(sel);
    //按照最后会话时间倒序排列
    query.sort(sort);
    //跳过数
    query.skip(skipnum);
    //一页多少条
    query.limit(pageSize);
    //查询结果
    query.exec().then(function(ress){
        res.send({success:true,ress});
    }).catch(function(err){
        console.log(err);
    });
}


//退出
exports.logout = function(req,res){
    var id = req.session.userId;
    delete req.session.userId;
    res.send({success:true});
};

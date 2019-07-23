var workdb = require("../dao/yktimedb.js");
var Works = workdb.model('Works');
var Comments = workdb.model('Comment')
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
//更新文本查看数
exports.addTimes = function(id,ress){
    var id = {_id:id};
    var data = {$inc:{times:1}};
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
//删除一条信息
exports.remove = function(id,ress){
    //var id ={'_id':'5bc852dd89cdd953d0dc0938'};
    
    Works.findByIdAndRemove(id, function(err, res){
        if (err) {
            console.log("数据删除失败：" + err);
        }
        else {
            ress.send({success:true,tep:0});
        }
    });
};

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
                tep:1,
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

//获取文章数据总数
exports.getCount = function(req,res){
    var judge = req.body.judge;
    var sel = {};
    if(judge == 0){
        sel = {'release':1};
    }else if(judge == 1){
        sel = {'types':0};
    }else if(judge == 2){
        sel = {'types':1}
    }else if(judge == 3){
        sel = {'types':0,'release':1}
    }else if(judge == 4){
        sel = {'types':1,'release':1}
    }
    Works.count(sel,function(err, ress){
        if(err){
            console.log('搜索失败');
        }else{
            res.send({success:true,ress});
        }
    });
}

//分页查询发布数据
exports.getpublish= function(res,id,nowPage){
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
//分页查询数据
exports.getdata = function(req,res){
    var nowPage = req.body.num;
    var judge = req.body.judge;
    var display = req.body.display;
    var sel = {};
    if(judge == 0){
        sel = {'release':1};
    }else if(judge == 1){
        sel = {'types':0};
    }else if(judge == 2){
        sel = {'types':1}
    }else if(judge == 3){
        sel = {'types':0,'release':1}
    }else if(judge == 4){
        sel = {'types':1,'release':1}
    }
    // if(select){
    //     sel = {'name':{$regex : select}};
    // }
    var pageSize = display;                   //一页多少条
    var sort = {'time':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (nowPage-1) * pageSize;   //跳过数
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



//comment数据表

//获取数据添加comments表
exports.insertComment = function(data,ress){

    var comment = new Comments(data);

    comment.save(function (err, res) {
        if (err) {
            console.log("works添加失败" + err);
        }
        else {
            //ress.cookie('workid',res._id,{signed:true, path:'http://localhost:8080', maxAge: 1000*10});
            ress.send({success:true,tep:0});
            //console.log("群添加成功");
        }
    });
};

// 获取comment数据
exports.getCommentData = function(workid,res){
    var wherestr = {'worksID':workid};
    var updatestr = {'status': 1};
    //var age = {'userage':{$gte:12,$lte:14}};
    var out = {};
Comments.find(wherestr, out, {sort: {'time': -1}},function(err, ress){
        if(err){
            console.log('搜索失败');
        }else{
            res.send({success:true,ress});
        }
    });
};

//获取文章评论总数
exports.getCommentCount = function(workid,res){
    var wherestr = {'worksID':workid};
    Comments.count(wherestr,function(err, ress){
        if(err){
            console.log('搜索失败');
        }else{
            res.send({success:true,ress});
            //console.log(ress)
        }
    });
}





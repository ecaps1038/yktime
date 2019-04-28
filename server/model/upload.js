//获取上传数据头部
exports.uptitle = function(req,res){   
    console.log(req.body.title);
    //title,label,intro,value,just
    res.send({success:true,tep:0});
};

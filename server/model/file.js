//获取项目工程里的图片
var fs = require('fs');//引用文件系统模块
var image = require("imageinfo"); //引用imageinfo模块

function readFileList(path, filesList) {
        var files = fs.readdirSync(path);
        files.forEach(function (itm, index) {
            var stat = fs.statSync(path + itm);
            if (stat.isDirectory()) {
            //递归读取文件
                readFileList(path + itm + "/", filesList)
            } else {
    
                var obj = {};//定义一个对象存放文件的路径和名字
                obj.path = path;//路径
                obj.filename = itm//名字
                filesList.push(obj);
            }
    
        })
    
    }
//获取路径下所有文件 
exports.showFiles = function(req,res,path){   
    var filesList = [];
    readFileList(path, filesList);
    //return filesList;
    res.json({
		code:200,
		data:filesList
	})
}
//获取路径下所有图片
exports.showimgFiles = function(req,res,path){   

        var imageList = [];

        this.getFileList(path).forEach((item) => {
            var ms = image(fs.readFileSync(item.path + item.filename));

            ms.mimeType && (imageList.push(item.filename))
        });
        //return imageList;
    
    res.json({
		code:200,
		data:filesList
	})
}
//删除对应文件
exports.delFile = function(res,path){  
    path.map(function(ver){
	   fs.unlinkSync(ver); 
    });
  
    res.json({
		code:200,
		data:''
	})
}
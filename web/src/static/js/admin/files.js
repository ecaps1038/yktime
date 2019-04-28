var outs = [23,43,76];
var navss = [
	{
		path: "/works/",
        name: "作品资料",
        num: ''
    },
    {
		path: "/article/",
        name: "文章资料",
        num: ''
    },
    {
		path: "/diary/",
        name: "日志图片",
        num: ''
	}, {
		path: "/cover/",
        name: "封面图片",
        num: ''
	},
];
var photos = [
    {
        photo     : 'http://127.0.0.1:4000/client/images/sql/1.png',
        title     : '1232334341241.png',
    }
];


//加入跳转页面的位置
import Router from '../../../router/index'
//引入文字图标
import s from '../lib/iconfont.js'

export default {
	data () {
		return {
		    name: '',
		    spath: 'http://127.0.0.1:4040',  //服务器根路径
		    fpath: '/works/',                //初始化文件路径
		    pharr: [],                       //服务器图片读取列表
		    navs: [],	                     //文件数列表
		    changes: 0,						 //文件切换当前位置
		    nowpath: './data/works/',		 //文件当前路径
		    selectFile: [],					 //当前选择的文件
		    num: 0,							 //汇总选择文件数
		    path: [],						 //汇总选择文件路径
		    pathnb: [],						 //汇总选择文件位置
		    nowphoto: '',					 //当前选择图片
		    photoclick: false,				 //点击照片
		    photoindex: '',					 //点击照片当前排位
		}
	},
	computed:{
  		mouseOver: function(){

  		}
  	},
	methods:{
		totaldata: function(){
			var _this = this;
			for(var i=0;i<navss.length;i++){
				//navss[i].num = _this.outs[i];
				_this.navs.push(navss[i]);
			}
		},
		//上传文件
		uploadFile: function(){
			var _this = this;
			var file = document.getElementById("file");
			//console.log(file.files);
			if(file.files.length>0){
	            var formData = new FormData();
	            for(var i in file.files){//这里如果单张上传就不必遍历直接formData.append('file',file.files[0])
	                   formData.append('file',file.files[i]);
	            }
	            //console.log(formData);
	            _this.$axios.post('http://127.0.0.1:4040/uploadphoto', 
					    formData
					)
					.then(function (response) {
						if(response.data.code === 200){
							//alert('上传成功');
							_this.showPhoto(_this.nowpath);
						}				    
					})
					.catch(function (error) {
					    console.log(error);
					    alert(error)
					});
			}
		},
		showPhoto: function(path){
			var _this = this;
            _this.$axios.post('http://127.0.0.1:4040/showphoto', {path:path})
			.then(function (response) {
				if(response.data.code === 200) {
					_this.pharr = [];
					_this.selectFile = [];
					var patt1 = /\.(\w+)/;
					var ver = response.data.data;
					//获取文件数
					for(var i=0;i<navss.length;i++){
						if(navss[i].path == _this.fpath){
							navss[i].num = ver.length;
						}
					}
					for(var i=0;i<ver.length;i++){
						var aa = ver[i].filename.match(patt1)[1];
						if(aa == 'jpg' || aa == 'png' || aa == 'jpeg'){
							_this.pharr.push(ver[i]);
							_this.selectFile.push(false);
                        }
					}
				}

			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},

		//内容切换标题
		selected: function(index){
			var _this = this;
			_this.fpath = _this.navs[index].path;
			_this.changes =index;
			_this.pharr = [];
			_this.nowpath = './data'+_this.fpath;
			_this.showPhoto(_this.nowpath);

		},
		//选择文件
		selectfile: function(index){
			var _this = this;
			if(_this.selectFile[index] == 0){
				_this.selectFile.splice(index,1,true);
				_this.num ++;
			}else{
				_this.selectFile.splice(index,1,false);
				_this.num --;
			}
		},
		//取消全选
		cancel: function(){
			var _this = this;
			for(var i=0;i<_this.selectFile.length;i++){
				_this.selectFile.splice(i,1,false);
				_this.num = 0;
			}
		},
		//删除单个
		delfile: function(index){
			var _this = this;
			_this.path[0] = _this.nowpath+_this.pharr[index].filename;
			console.log(_this.path)
            _this.$axios.post('http://127.0.0.1:4040/delfile', {path:_this.path})
			.then(function (response) {
				if(response.data.code === 200) {
					_this.pharr.splice(index,1);
					console.log(_this.pharr)
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		//删除多个
		delfiles: function(){
			var _this = this;
			_this.path=[];
			for(var i=0;i<_this.selectFile.length;i++){
				if(_this.selectFile[i]){
					var path = _this.nowpath+_this.pharr[i].filename;
					_this.path.push(path);
					_this.pathnb.push(i);
				}
			}
			console.log(_this.pathnb)
			if(_this.path.length>0){
	            _this.$axios.post('http://127.0.0.1:4040/delfile', {path:_this.path})
				.then(function (response) {
					if(response.data.code === 200) {
						_this.path = [];
						_this.showPhoto(_this.nowpath);
						_this.num = 0;
					}
				})
				.catch(function (error) {
				    console.log(error);
				    alert(error)
				});
			}
		},
		//点击图片预览
		detialPhoto: function(index){
			var _this = this;
			_this.nowphoto = _this.spath+_this.fpath+_this.pharr[index].filename;
			_this.photoclick = true;
			_this.photoindex = index;
		},
		//点击大图片切换
		clickleft: function(){
			var _this = this;
			if(_this.photoindex>0){
				_this.photoindex --;
				_this.nowphoto = _this.spath+_this.fpath+_this.pharr[_this.photoindex].filename;
			}
		},
		clickright: function(){
			var _this = this;
			var num = 0;
			for(var i=0;i<navss.length;i++){
				if(navss[i].path == _this.fpath){
					num = navss[i].num;
				}
			}
			if(_this.photoindex<num-1){
				_this.photoindex ++;
				_this.nowphoto = _this.spath+_this.fpath+_this.pharr[_this.photoindex].filename;
			}
		}
	},
	created:function(){this.totaldata();this.showPhoto('./data/works/')},

}
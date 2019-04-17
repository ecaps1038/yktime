var outs = [23,43,76];
var navss = [
	{
		path: "/works/",
        name: "作品资料",
        num: '0'
    },
    {
		path: "/article/",
        name: "文章资料",
        num: '0'
    },
    {
		path: "/diary/",
        name: "日志图片",
        num: '0'
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
		    spath: 'http://127.0.0.1:4040',
		    fpath: '/works/',
		    ph: '/images/logo1.svg',
		    pharr: [],
		    navs: [],
		    changes: 0,
		    nowpath: '',
		}
	},
    computed:{
  
  },
	methods:{
		totaldata: function(){
			var _this = this;
			for(var i=0;i<outs.length;i++){
				navss[i].num = outs[i];
				_this.navs.push(navss[i]);
			}
		},
		//上传文件
		uploadFile: function(){
			var _this = this;
			var file = document.getElementById("file")
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
		},
		showPhoto: function(path){
			var _this = this;
            //var path = './data/works/';
            _this.$axios.post('http://127.0.0.1:4040/showphoto', {path:path})
			.then(function (response) {
				if(response.data.code === 200) {
					var patt1 = /\.(\w+)/;
					var ver = response.data.data;
					for(var i=0;i<ver.length;i++){
						var aa = ver[i].filename.match(patt1)[1];
						if(aa == 'jpg' || aa == 'png' || aa == 'jpeg'){
							_this.pharr.push(ver[i]);
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

		}
	},
	created:function(){this.totaldata();this.showPhoto('./data/works/')},

}
import Router from '../../router/index'
import s from './myfunc.js'


export default {
	data () {
		return {
		  	types: '',                                      //属性
		    name: '',                                       //名称
		    classlfy: '',					   				//分类
		    tep: '',                                        //标签
		    introduc: '',					   				//简介
		    content: '',					   				//正文内容
		    time: '',  										//保存时间
		    times: '',  							        //查看次数
			works:['摄影','插画','UI','平面','杂'],
			article: ['我的故事','观点','非我'],
			comment: '',									//评论
			comname:'',										//评论者
			num1: 10,										//限定评论名长度
			commentnum:'',									//评论数
			icons: 14,										//评论头像数
			icon: '00.png',										//当前头像
			show: false,
			abled: true,
			comlist: [],
			imgs: [],
			pharr: [],
		}
	},
    computed:{
    	commentnb: function(){
			var _this = this;
			var num = s.getByteLen(_this.comname);
			return _this.num1-num;
		},
		upable: function(){
			var _this = this;
			if(_this.comment.length>0){
				return _this.abled=false;
			}else{
				return _this.abled = true;
			}
		},
		 
	},
	methods:{
		//初始化
		primary: function(){
			var _this = this;
			_this.$axios.post(_this.GLOBAL.baseUrl+'/detial', {
				id:_this.$route.query.id,
			})
			.then(function (response) {
				var tep = response.data.data.tep;
			    if(tep == 1){
			    	var res = response.data.data.res;
			    	_this.name = res.name;
			    	_this.introduc = res.introduc;
			    	_this.content = res.content;
			    	_this.time = s.changeTime2(res.time);
			    	_this.times = res.times;
					if(typeof res.tep!=="undefined"){
						_this.tep = res.tep;
					}
					if(res.types == 0){
						_this.classlfy = _this.article[res.classlfy];
					}else if(res.types == 1){
						_this.classlfy = _this.works[res.classlfy];
					}
				}else if(tep == 0){
					console.log('没有')
				}
				_this.commentcont();
			_this.commentlist();
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});

		},
		getnb: function(num){
			var _this = this;
			_this.icon = num;
			_this.show = !_this.show;
		},

		//获取评论列表
		commentlist: function(){
			var _this = this;
			_this.$axios.post(_this.GLOBAL.baseUrl+'/commentlist', {
				workid: _this.workid,

			})
			.then(function (response) {
				var data = response.data;
				_this.comlist = data.ress;
				//console.log(_this.comlist);
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		//获取评论数
		commentcont: function(){
			var _this = this;
			_this.$axios.post(_this.GLOBAL.baseUrl+'/getCommentCount', {
				judge: 0,
			})
			.then(function (response) {
				var data = response.data;
				//_this.count = data.ress;
				_this.commentnum = data.ress;
				//console.log(data.ress)
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    //Router.push({path: '/'});
			});
		},
		//上传评论
		publish: function(){
			var _this = this,cname='匿名';
			if(_this.comname.length>0){
				cname = _this.comname
			}
			_this.$axios.post(_this.GLOBAL.baseUrl+'/upcomment', {
				workid: _this.workid,
			    comment: _this.comment,
			    name: cname,
			    icon: _this.icon,

			})
			.then(function (response) {
				var tep = response.data.tep;
			    if(tep == 0){
			    	//alert('评论成功！')
			    	_this.commentlist();
			    	_this.commentcont();
			    	_this.comment='';
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		detia: function(data){
			return s.detiaTime(data);
		},
		//光标定位
		write: function(){
			document.getElementById("comment").focus(); 
		},
		//获取头像
		showPhoto: function(path){
			var _this = this;
            _this.$axios.post(_this.GLOBAL.baseUrl+'/showphoto', {path:'./data/avatar/'})
			.then(function (response) {
				if(response.data.code === 200) {
					_this.pharr = [];
					var patt1 = /\.(\w+)/;
					var ver = response.data.data;
					//获取文件数
					for(var i=0;i<ver.length;i++){
						var aa = ver[i].filename.match(patt1)[1];
						if(aa == 'jpg' || aa == 'png' || aa == 'jpeg'){
							_this.pharr.push(ver[i]);
                        }
					}
					//console.log(_this.pharr);
				}

			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
	},
	mounted:function(){this.primary();this.showPhoto()},
	updated() {
		//console.log(document.body.offsetWidth)
    this.imgs = this.$refs.detailCont.querySelectorAll("img");
    for (let i = 0; i < this.imgs.length; i++) {
      this.imgs[i].addEventListener("load", ele => {
        let e = ele || window.event;
        let target = e.target || e.srcElement;
        //target.style.marginBottom = "30px";
        if (target.offsetWidth >= 1200) {
        	//let mwidth = document.body.offsetWidth*0.8;
        	target.style.width = "1200px";
          target.style.left = "-200px";
        }else if(target.offsetWidth >= 800 && target.offsetWidth < 1200){
          let lwidth = (target.offsetWidth-800)/2;
          target.style.left = "-"+lwidth+"px";
        } 
      });
    }
  },
	watch: {
        comname() {
            if (this.comname.length > this.num1) {
                this.comname = String(this.comname).slice(0, this.num1);
            }
        }
    }
}
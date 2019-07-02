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
			commentnum:'123',								//评论数
			icons: 13,										//评论头像数
			icon: 1,										//当前头像
			show: false,
			abled: true,
			comlist: [],
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
			_this.$axios.post('http://127.0.0.1:4040/detial', {
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

					_this.commentlist();
				}else if(tep == 0){
					console.log('没有')
				}
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
			_this.$axios.post('http://127.0.0.1:4040/commentlist', {
				workid: _this.workid,

			})
			.then(function (response) {
				var data = response.data;
				_this.comlist = data.ress;
				console.log(_this.comlist);
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		//上传评论
		publish: function(){
			var _this = this,cname='匿名';
			if(_this.comname.length>0){
				cname = _this.comname
			}
			_this.$axios.post('http://127.0.0.1:4040/upcomment', {
				workid: _this.workid,
			    comment: _this.comment,
			    name: cname,
			    icon: _this.icon,

			})
			.then(function (response) {
				var tep = response.data.tep;
			    if(tep == 0){
			    	//alert('评论成功！')
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		detia: function(data){
			return s.detiaTime(data);
		}

	},
	mounted:function(){this.primary();},
	watch: {
        comname() {
            if (this.comname.length > this.num1) {
                this.comname = String(this.comname).slice(0, this.num1);
            }
        }
    }
}
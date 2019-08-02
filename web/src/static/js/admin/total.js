var outs = [23,43,76];
var ins = [54,73];
//加入跳转页面的位置
import Router from '../../../router/index'
import s from '../myfunc.js'
import c from '../common.js';

export default {
	data () {
		return {
			navs: [
				{	
					icon: "#icon-wenzhang",
					path:'/add/upwork?n=1',
					num: ""
				},
				{
					icon: "#icon-sheying",
					path:'/add/upwork?n=2',
					num: ""
				},
				{
					icon: "#icon-biji",
					path:'/',
					num: ""
				},
			],
			innavs: [
				{
					name: "私信",
					num: "22"
				},
				{
					name: "留言",
					num: ""
				},
			],
			teps: [	
				'即使没有人给你鼓掌，也要优雅的谢幕感谢自己认真的付出。',
				'勇敢坚毅真正之才智乃刚毅之志向',
				'志向不过是记忆的奴隶，生气勃勃地降生，但却很难成长。',
				'人所缺乏的不是才干而是志向，不是成功的能力而是勤劳的意志。',
				'人的理想志向往往和他的能力成正比。',
				'人生并不像火车要通过每个站似的经过每一个生活阶段。人生总是直向前行走，从不留下什么。',
				'理想是人生的太阳。',
				'真实是人生的命脉，是一切价值的根基。'
			],
			note: {
			backgroundImage: "url(" + require("../../images/logo2.svg") + ") ",
			backgroundPosition: "center center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
        	},

			outsum: 0,
			insum: 0,
			imgurl: '',
			tep: '哈哈',
			drawer: false,
			drawer1: false,
			direction: 'rtl',
			title:'',
			nowPage: 1,
			display: 10,
			comments: [],
			isbottom: false,
			comentclick: '加载更多',
		}
	},
    computed:{
		
	},
	methods:{
		//时间换算
		detia: function(data){
			return s.detiaTime(data);
		},
		//详情页跳转
        detial: function(id){
            var _this = this;
            return c.detial(_this,id);
        },
        //加载判断
		manage: function(){
			var _this = this;
			_this.$axios.get('http://127.0.0.1:4040/manage', {
			})
			.then(function (response) {
				var data = response.data;
				var tep = data.tep;
				if(tep == 0){
					Router.push({path: '/'});
				}else if(tep == 1){
					_this.imgurl = 'http://127.0.0.1:4040/user/user1.png';
					_this.name = data.myname;
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
		},
		//获取付出数据
		mageCount: function(){
            var _this = this;
            for(var i=0;i<3;i++){
            	_this.$axios.post('http://127.0.0.1:4040/mageCount',{num:i})
	            .then(function (response) {
	                var data = response.data.data;
	                _this.navs[data.num].num = data.ress;
	                //console.log(data);
	                _this.outsum += data.ress;
	            })
	            .catch(function (error) {
	                console.log(error);
	                alert(error);
	                //Router.push({path: '/'});
	            });
            }
        },
        //获得评论总数
        inmageCount: function(){
            var _this = this;
        	_this.$axios.post('http://127.0.0.1:4040/getAllCommentCount')
            .then(function (response) {
                var data = response.data.ress;
                _this.innavs[1].num = data;
                //console.log(data);
                _this.insum += data;
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
                //Router.push({path: '/'});
            });
        },
        //侧边栏内容
        draw: function(index){
        	var  _this = this;
        	if(index == 0){
        		_this.drawer = true;
        		_this.title = '私信管理';
        	}else{
        		_this.getcomment();
        	}
        },
        //获取评论
        getcomment: function(){
        	var _this = this;
        	//获取评论
    		_this.drawer1 = true;
    		_this.title = '评论管理'+_this.innavs[1].num;
    		if(!_this.isbottom){
	    		_this.$axios.post('http://127.0.0.1:4040/getAllComment',{
	    			num:_this.nowPage,
	    			display:_this.display,
	    		})
	            .then(function (response) {
	                var data = response.data.ress;
	                if(data.length>0){
	                	_this.comments = _this.comments.concat(data);
	                	_this.nowPage++;
	                	//console.log(_this.comments)
	                }else{
	                	_this.isbottom = true;
	                	_this.comentclick = "已经到底...";

	                }
	                //console.log(data);
	            })
	            .catch(function (error) {
	                console.log(error);
	                alert(error);
	                //Router.push({path: '/'});
	            });
	        }
        },
        //获取随机语句
		random: function(){
			var _this = this;
			var i = 0; var j = _this.teps.length;
			var e = Math.floor(Math.random() * (j - i)) + i;
			_this.tep = _this.teps[e];
		},
		//创建数据条
		createdb: function(index){
			var _this = this;
			if(index == 0 || index == 1){
				_this.$axios.post('http://127.0.0.1:4040/creatework', 
				    {num: index}
				)
				.then(function (response) {
					//var nowid = data.rest;
					Router.push({path: '/add/upwork?n='+index});
				})
				.catch(function (error) {
				    console.log(error);
				    alert(error)
				});			
			}else if(index == 2){
				Router.push({path: '/add/diary'});
			}
		},
		//删除对应的评论
		deleteComment: function(id,index){
			var _this = this;
			_this.$axios.post('http://127.0.0.1:4040/deleteComment', 
			    {id: id}
			)
			.then(function (response) {
				var tep = response.data.tep;
				if(tep == 0){
					_this.comments.splice(index,1);
					_this.innavs[1].num--;
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});	
		},
	},
	mounted:function(){this.manage();this.mageCount();this.inmageCount();this.random();},

}
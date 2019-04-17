//加入跳转页面的位置
import Router from '../../../router/index'
//引入文字图标
import s from '../lib/iconfont.js'
export default {
	data () {
		return {
			navs: [
				{
					path: "/manage/total",
					icon: "#icon-zonglan",
					name: "总览"
				},
				{
					path: "/manage/files",
					icon: "#icon-wenjian",
					name: "文件"
				},
				{
					path: "/manage/article",
					icon: "#icon-wenzhang",
					name: "作品"
				},
				{
					path: "/manage/diary",
					icon: "#icon-sheying",
					name: "文章"
				},
				{
					path: "/manage/suiji",
					icon: "#icon-biji",
					name: "随记"
				},
			],
			note: {
			backgroundImage: "url(" + require("../../images/logo2.svg") + ") ",
			backgroundPosition: "center center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
        	},

		  name: 'ssAss',
		  imgurl: '',
		  news: true,
		  icon:'#icon-zonglan',
		  title:'总览',
		}
	},
    computed:{
		
	},
	methods:{
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
					_this.imgurl = 'http://127.0.0.1:8080/vacation-photo/'+data.myimgurl;
					_this.name = data.myname;
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
		},
		//内容切换标题
		selected: function(index){
			var _this = this;
			_this.icon = _this.navs[index].icon;
			_this.title = _this.navs[index].name;

		}
	},
	mounted:function(){this.manage();},

}
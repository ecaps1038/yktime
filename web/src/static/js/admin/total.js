var outs = [23,43,76];
var ins = [54,73];

export default {
	data () {
		return {
			navs: [
				{
					icon: "#icon-wenzhang",
					num: ""
				},
				{
					icon: "#icon-sheying",
					num: ""
				},
				{
					icon: "#icon-biji",
					num: ""
				},
			],
			innavs: [
				{
					name: "私信",
					num: ""
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
		outdata: function(){
			var _this = this;
			for(var i=0;i<outs.length;i++){
				_this.navs[i].num = outs[i];
				_this.outsum += outs[i];
			}
		},
		indata: function(){
			var _this = this;
			for(var i=0;i<ins.length;i++){
				_this.innavs[i].num = ins[i];
				_this.insum += ins[i];
			}
		},
		random: function(){
			var _this = this;
			var i = 0; var j = _this.teps.length;
			var e = Math.floor(Math.random() * (j - i)) + i;
			_this.tep = _this.teps[e];
		}
	},
	mounted:function(){this.outdata();this.indata();this.random()},

}
var arr = [
                {
                    icon      : '0',
                    date      : '2019/03/22',
                    photo     : require('../images/sql/1.png'),
                    title     : '人的向往和美好',
                    introduce : '致那些我曾喜爱过的一切，虽现在疏散远离，但你们都曾在我的每一个不同的阶段，带给我不一样的欢笑。心存感激，在某个时刻会突然想念，还有地方可以回头看望看望'
                },
                {
                    icon      : '1',
                    date      : '2019/03/12',
                    photo     : require('../images/sql/2.png'),
                    title     : '人的向往和美好所见',
                    introduce : '致那些我曾喜爱过的一切，虽现在疏散远离，但你们都我的每一个不同的阶段，带给我不一样的欢笑。心存感激，在某个时刻会突然想念，还有地方可以回头看望看望'
                },
                {
                    icon      : '2',
                    date      : '2019/03/03',
                    photo     : require('../images/sql/3.png'),
                    title     : '人的向往和美好在哪里',
                    introduce : '致那些我曾喜爱过的一切，虽现在们都曾在我的每一个不同的阶段，带给我不一样的欢笑。心存感激，在某个时刻会突然想念，还有地方可以回头看望看望'
                },
                {
                    icon      : '3',
                    date      : '2019/02/28',
                    photo     : require('../images/sql/4.png'),
                    title     : '人的向往和美好是什么',
                    introduce : '致那些我曾喜爱过的一切，虽现在疏散远同的阶段，带给我不一样的欢笑。心存感激，在某个时刻会突然想念，还有地方可以回头看望看望'
                },
                
            ];


import s from './myfunc.js';
import c from './common.js';
import * as loading from "../images/loading.json";

export default {
	data () {
		return {
		    note: {
				backgroundImage: "url(" + require("../images/banner1.png") + ") ",
				backgroundPosition: "center center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
	        },
	        suiy: {
				backgroundImage: "url(" + require("../images/suiy.svg") + ") ",
				backgroundPosition: "center center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
	        },
			msg: '溶于世，却恋那山石。<br/>世上太多美好，却折磨着选择。<br/>如果不能选择，那就自己创造一块境地。<br/>依旧恋那山石。为此汇记纯粹的自己。',
			htmls: [],
			num: 1,
			display: 4,
			total: '',
			defaultOptions: { animationData: loading },     //lottie动画
	        animationSpeed: 1,
	        anim: {},
	        lotties: true,
	        tobottom: '',
		}
	},
    computed:{


	},
	methods:{
		mobile: function(){
			var _this = this;
			_this.$router.push({path:'/mobile/home'});
		},
		//时间转换
		dtime: function(time){
    		return s.changeTime2(time);
    	},
    	counts: function(){
			var _this = this;
			_this.$axios.post(_this.GLOBAL.baseUrl+'/getCount', {
				judge: 0,
			})
			.then(function (response) {
				var data = response.data;
				//_this.count = data.ress;
				_this.total = data.ress;
				//console.log(data.ress)
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    //Router.push({path: '/'});
			});
		},
		//初始化
        content: function(num){
			var _this = this;
			_this.$axios.post(_this.GLOBAL.baseUrl+'/getData', {
				num:_this.num,
				display: _this.display,
				judge: 0,
			})
			.then(function (response) {
				var data = response.data;
				_this.htmls = _this.htmls.concat(data.ress);
				_this.num ++;
				_this.lotties = true;
				//console.log(data.ress)
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
			_this.counts();
		},
		//详情页跳转
		detials: function(id){
			var _this = this
			return c.detial(_this,id);
		},
		//lottie动画
        handleAnimation: function(anim) {
	        this.anim = anim;
	        console.log(anim); //这里可以看到 lottie 对象的全部属性
	    },
	    //加载更多
	    morepage: function(){
	    	var _this = this;
	    	var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	    	// console.log(scrolltop);
	    	// console.log(window.pageYOffset+'a');
	    	// console.log(document.documentElement.scrollTop+'b');
	    	// console.log(document.body.scrollTop+'c');
	    	if(scrolltop + window.innerHeight >= document.body.offsetHeight-100) {
                if(_this.num<Math.ceil(_this.total/_this.display+1)){
                	_this.tobottom = "";
                	var nowm = _this.num +1;
                	this.lotties = false;
                	this.content(nowm);
                }else{
                	_this.tobottom = "已到底部...";
                }
                
            }
	    },
	},
	mounted:function(){this.content(this.num);s.addEvent(window,'scroll',this.morepage);},
	watch:{
            '$route':function(to,from){
　　　　　　　　　　 document.body.scrollTop = 0;
                 document.documentElement.scrollTop = 0; 
           }
        },

}
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


import s from './myfunc.js'

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
			mum: 1,
		}
	},
    computed:{


	},
	methods:{
		//时间转换
		dtime: function(time){
    		return s.changeTime2(time);
    	},
		aaa: function(){
			alert('aaa');
			this.$axios.post('/user', {
			    firstName: 'Fred',
			    lastName: 'Flintstone'
			})
			.then(function (response) {
				var data = response.data.context.from;
			    //console.log(response);
			    console.log(data)
			})
			.catch(function (error) {
			    console.log(error);
			    alert('aa')
			});
		},
		img: function(){
			this.htmls = arr;
		},
		//初始化
        content: function(){
			var _this = this;
			_this.$axios.post('http://127.0.0.1:4040/showwork', {
				num:_this.num
			})
			.then(function (response) {
				var data = response.data;
				_this.htmls = data.ress;
				console.log(data.ress)
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
		},
	},
	mounted:function(){this.content();},

}
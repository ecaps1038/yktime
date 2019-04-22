//加入跳转页面的位置
import Router from '../../../router/index'

import s from '../myfunc.js'

//文章
var article=[
	{
	 	value: '选项1',
	    label: '我的故事'
	}, {
	    value: '选项2',
	    label: '观点'
	}, {
	    value: '选项3',
	    label: '非我'
	}];
var diary=[
	{
	 	value: '选项1',
	    label: '摄影'
	}, {
	    value: '选项2',
	    label: '插画'
	}, {
	    value: '选项3',
	    label: 'UI'
	}, {
	    value: '选项4',
	    label: '平面'
	}, {
	    value: '选项5',
	    label: '杂'
}];


export default {
	data () {
		return {
			title: '',	
			label: '',
			intro: '',
			num1: 56,
			num2: 120,
			just: '',
			options: [],
	        value: ''
		}
	},
    computed:{
		numchange: function(){
			var _this = this;
			var num = s.getByteLen(_this.title);
			return _this.num1-num;
		},
		titlelen: function(){
			
		}
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
					_this.user = '<img src="http://127.0.0.1:4040/user/user1.png">';
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
		},
		//判断入口
		justit: function(){
			var _this = this;
			if(_this.$route.query.n==1){
				_this.options = [];
				_this.just = '文章';
				for(var i=0;i<article.length;i++){
					_this.options.push(article[i]);
				}
				
			}else if(_this.$route.query.n==2){
				_this.options = [];
				_this.just = '作品';
				for(var i=0;i<diary.length;i++){
					_this.options.push(diary[i]);
				}
				
			}
		}
	},
	mounted:function(){this.manage();this.justit()},
	watch: {
        title() {
            if (this.title.length > this.num1) {
                this.title = String(this.title).slice(0, this.num1);
            }
        }
    }
}
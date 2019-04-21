//加入跳转页面的位置
import Router from '../../../router/index'

import s from '../myfunc.js'


export default {
	data () {
		return {
			title: '',	
			label: '',
			intro: '',
			num1: 56,
			num2: 120,
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
	},
	mounted:function(){this.manage();},
	watch: {
        title() {
            if (this.title.length > this.num1) {
                this.title = String(this.title).slice(0, this.num1);
            }
        }
    }
}
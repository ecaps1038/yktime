//加入跳转页面的位置
import Router from '../../../router/index'
export default {
	data () {
		return {
		  name: '',
		  psw: '',
		  returns: '',
		}
	},
    computed:{
		
	},
	methods:{
		submit: function(){
			var _this = this;
			if(_this.name && _this.psw){
				_this.$axios.post('http://127.0.0.1:4040/login', {
				    name: _this.name,
				    psw: _this.psw
				})
				.then(function (response) {
					var tep = response.data.tep;
				    if(tep == 0){
				    	//匹配成功
						//alert('tep=0');
						Router.push({path: '/'})
					}else if(tep == 1){
						//匹配不成功
						_this.psw = '';
						_this.returns = response.data.return;
					}
				})
				.catch(function (error) {
				    console.log(error);
				    alert(error)
				});
			}
		}
	}

}

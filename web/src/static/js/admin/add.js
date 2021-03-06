//加入跳转页面的位置
import Router from '../../../router/index'
export default {
	data () {
		return {
		    note: {
			backgroundImage: "url(" + require("../../images/logo1.svg") + ") ",
			backgroundPosition: "center center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
        },
			img: '',	
			user: '',
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
}
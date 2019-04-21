export default {
	data () {
		return {
		    note: {
			backgroundImage: "url(" + require("../images/logo1.svg") + ") ",
			backgroundPosition: "center center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
        },
			id: '',
			name: '',
			img: '',	
			sub: '',
			user: '',
		}
	},
    computed:{
		
	},
	methods:{
		aaa: function(){
			alert('aaa');
			this.$axios.post('http://127.0.0.1:4040/user', {
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
			    //alert('aa')
			});
		},
		login: function(){
        	var _this = this;
        	_this.$axios.get('http://127.0.0.1:4040/login',{})
        	.then(function (response) {
				var data = response.data;
			    _this.user = '<a href="manage"><img src="http://127.0.0.1:4040/user/user1.png"></a>';
			    _this.sub = '退出';
			})
			.catch(function (error) {
			    console.log(error);
			    //alert('aa')
			});
        },
        quit: function(){
        	var _this = this;
        	_this.$axios.get('/quit',{})
        	.then(function (response) {
				var data = response.data;
			    _this.user = '';
			    _this.sub = '';
			})
			.catch(function (error) {
			    console.log(error);
			    alert('请求失败')
			});
        }
	},
	mounted:function(){this.login();},

}

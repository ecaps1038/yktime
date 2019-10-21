<template>
    <div>
		<div class="header">
			<div class="logo"><router-link to="/home"><svg class="logo-icon" aria-hidden="true">
					<use xlink:href="#icon-logo"></use>
				</svg></router-link></div>
			<div class="nav">
				<router-link to="/home">首页<i></i></router-link>
				<router-link to="/works">作品<i></i></router-link>
				<router-link to="/article">文章<i></i></router-link>
				<router-link to="/diary">随记<i></i></router-link>
				<router-link to="/about">关于<i></i></router-link>
			</div>
			<div class="user">
				<div class="user-inner" v-if="id == 0">
					<p class="nol" @click="showl"></p>
				</div>
				<div class="user-inner" v-if="id != 0" v-html="user">
				</div>
				<p class="quit" v-on:click="quit">{{sub}}</p>
			</div>
		</div>
		<div class="logins" :style="showlogin">
			<div class="bg" @click="closel"></div>
			<div class="login-div">
				<svg class="title-icon" aria-hidden="true">
					<use xlink:href="#icon-logo"></use>
				</svg>
				<div>
					<input type="text" value="" placeholder="用户" v-model="name">
				</div>
		    	<div>
		    		<input type="password" value="" placeholder="密码" v-model="psw">
		    	</div>
		    	<button class="submit" v-on:click="submit">登陆</button>
		    	<p class="bakcts">{{returns}}</p>
			</div>
		</div>
		<router-view></router-view>
		<footer>
				<div>
					
				</div>
		</footer>
    </div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
			    
				id: 0,
				img: '',	
				sub: '',
				user: '',
				name: '',
				psw: '',
				returns: '',
				showlogin: 'display:none',
			}
		},
	    computed:{
			
		},
		methods:{
			aaa: function(){
				alert('aaa');
				this.$axios.post(_this.GLOBAL.baseUrl+'/user', {
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
			//显示登录
			showl: function(){
				this.showlogin='display:block';
			},
			//隐藏登录
			closel: function(){
				this.showlogin='display:none';
			},
			//登录提交
			submit: function(){
				var _this = this;
				if(_this.name && _this.psw){
					_this.$axios.post(_this.GLOBAL.baseUrl+'/login', {
					    name: _this.name,
					    psw: _this.psw
					})
					.then(function (response) {
						var tep = response.data.tep;
					    if(tep == 0){
							_this.login();
							_this.psw = '';
							_this.returns = '';
							_this.showlogin = 'display:none';
							console.log(response.data.ress);
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
			},
			login: function(){
	        	var _this = this;
	        	_this.$axios.get(_this.GLOBAL.baseUrl+'/login',{})
	        	.then(function (response) {
					var data = response.data;
					if(data.success){
						_this.id = data.id;
					    _this.user = '<a href="manage"><img src="'+_this.GLOBAL.baseUrl+'/user/user1.png"></a>';
					    _this.sub = '退出';
					}
				})
				.catch(function (error) {
				    console.log(error);
				    //alert('aa')
				});
	        },
	        quit: function(){
	        	var _this = this;
	        	_this.$axios.get(_this.GLOBAL.baseUrl+'/quit',{})
	        	.then(function (response) {
					var data = response.data;
				    _this.user = '';
				    _this.sub = '';
				    _this.id = 0;
				})
				.catch(function (error) {
				    console.log(error);
				    alert('请求失败')
				});
	        },
		},
		mounted:function(){this.login();},

	};
</script>
<style lang="scss">
@import "../static/css/common.scss";
.header{
	@include w-h(100%,80px,#1c1c21,block);
	@include positions(fixed,0px,0px);
	z-index: 1001;
	text-align: center;
	.logo{
		@include positions(absolute,24px,40px);
		a{
			@include w-h(72px,32px,#1c1c21);
			.logo-icon{
				width: 64px;
				height: 36px;
				fill: rgba(255,255,255,0.8);
				text-align: center;
			}
		}
	}
	.nav{
		display: inline;
		a{
			display: inline-block;
			position: relative;
			width: 76px;
			@include fonts(14px,rgba(255,255,255,0.5),80px,center);
			&:hover{
				color: #fff;
				background: #232329;
			}
		}
		.router-link-active{
			color: #fff;
			i{
				@include positions(absolute,58px,31px);
				@include w-h(16px,2px,#fff);
			}
		}
	}
	.user{

		@include positions(absolute,20px,auto,40px,auto);
		width: 40px;
		.user-inner{
			@include w-h(40px,40px,#232329);
			border-radius: 50%;
			overflow: hidden;
			//cursor: pointer;
			img{
				width: 40px;
			}	
			.nol{
				@include w-h(100%,100%,#1c1c21)
			}	
		}
		.quit{
			// @include w-h(40px,28px,#3b3c41);
			background: #3b3c41;
			border-radius: 5px;
			@include fonts(14px,$scolor,28px,center);
			display: none;
			cursor: pointer;
			opacity: 0.5;
			&:hover{
				opacity: 1;
			}
		}
		&:hover .quit{
			display: block;
		}
	}
}
.main{
	min-height: $mh;
	padding-top: $h1;
}
.logins{
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	z-index: 1001;
	.bg{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.6);
	}
	.login-div{
		width: 400px;
		height: 360px;
		position: absolute;
		top: 0;
		bottom:0;
		left: 0;
		right: 0;
		margin: auto;
		background: #fff;
		text-align: center;
		.title-icon{
			padding-top: 20px;
			padding-bottom: 30px;
			width: 80px;
			height: 120px;
			fill: #ea7727;
			vertical-align: top;
			text-align: center;
		}
		input{
			width: 320px;
			height: 42px;
			margin-bottom: 20px;
			border-width: 0px 0px 1px 0px;
		}
		.submit{
			margin-top: 10px;
			border: 0px;
			@include w-h(320px,42px,rgba(0,0,0,1));
			color: #fff;
			cursor: pointer;
			&:hover{
				@include w-h(320px,42px,rgba(0,0,0,0.8));
			}
		}
		.bakcts{
			@include fonts(14px,#ff504b,42px,center);
		}
	}
}
footer{
	position: relative;
	height: 160px;
	z-index: 10;
	background: #000;
}
</style>

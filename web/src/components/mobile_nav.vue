<template>
	<div class="outtt">
		<van-popup
		  v-model="show"
		  round
		  position="bottom"
		  :style="{ height: '80%' }"
		>
			<van-icon name="close" @click="closePopup" />
			<div class="login">
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
		</van-popup>
	  	<div class="mobile-nav">
			<div class="mr" @click="zksq">
				<div class="xian"><i></i><i :class="{shou:dj}"></i><i></i></div>
			</div>
			<div class="out">
				<div :class="{nav: true,wit:!dj}" @click="zksq">
					<div :class="{adddiary:dl}" @click="toDiary">
						<i class="one"></i><i class="two"></i>
					</div>
					<div :class="{upload:true,islogin:dl}" @click="showPopup">
						<van-icon name="fire"/>
					</div>
					<router-link to="/mobile/home">首页<i :style="xzx"></i></router-link>
					<router-link to="/mobile/diary">随记<i :style="xzx"></i></router-link>
					<router-link to="/mobile/about">关于我<i :style="xzx"></i></router-link>
				</div>
			</div>
			<!-- <div class="add-diary"></div> -->
		</div>
		<router-view></router-view>
    </div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import { Popup } from 'vant';
	import { Icon } from 'vant';

	Vue.use(Icon);
	Vue.use(Popup);
	
	import c from '../static/js/common.js';
	
	export default{
    data(){
        return {
        	xzx: {
				backgroundImage: "url(" + require("../static/images/mobile/xzbg.png") + ") ",
				backgroundPosition: "bottom center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "contain",
	        },
        	dj: false,
        	dl: false,
        	show: false,
        	name:'',
        	psw:'',
        	returns:'',
        	
        }
    },
    computed:{
        
    },
    methods:{
        dtime: function(num){
            return s.changeTime2(num);
        },
        //展开和关闭弹出层
        showPopup() {
	        this.show = true;
	    },
        closePopup() {
	        this.show = false;
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
						_this.show = false;
						_this.dl = true;
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
					_this.dl = true;
				}else{
					this.dl = false;
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
        //展开与收起导航
        zksq: function(){
        	this.dj =!this.dj;
        },
        //跳到日志发表页面
        toDiary(){
            this.$router.push({ path:'/mobile/add'})
        }
    },
    mounted:function(){
    	//this.manage();
    	this.login();
    }
};


</script>
<style lang="scss">
@import "../static/css/common.scss";
.mobile-nav{
	position: fixed;
	bottom: 20px;
	width: 100%;
	padding: 0 30px;
	z-index: 10;
	.mr{
		width:50px;
		height:50px;
		background:rgba(255,255,255,1);
		box-shadow:0px 4px 12px 0px rgba(0,0,0,0.1);
		border-radius:25px;
		position: absolute;
		right: 20px;
		bottom: 0px;
		z-index: 1000;
		.xian{
			padding-top: 12px;
			padding-left: 15px;
		}
		i{
			width: 20px;
			height: 2px;
			display: block;
			background: rgba(40,41,45,1);
			margin: 5px 0;
		}
		.shou{
			width: 14px;
		}
	}
	.out{
		height: 70px;
		//overflow: hidden;
		position: relative;
		.nav{
			background: #fff;
			height: 50px;
			width: 100%;
			position: absolute;
			bottom: 0px;
			right: 0px;
			box-shadow:0px 4px 12px 0px rgba(0,0,0,0.1);
			border-radius:25px;
			padding-left: 42px;
			transition: all 0.3s;
			a{
				position: relative;
				display: inline-block;
				@include fonts(16px,rgba(40,41,45,0.6),50px);
				width: 24%;
				text-align: center;

			}
			.router-link-active{
				color: rgba(40,41,45,1);
				font-weight:500;
				i{
					position: absolute;
					bottom: 0;
					left: 0;
					display: inline-block;
					height: 10px;
					width: 100%;
				}
			}
		}
		.wit{
			right: -100%;
			opacity: 0;
		}
	}
	.adddiary{
		width:42px;
		height:42px;
		background:rgba(254,127,37,1);
		box-shadow:0px 4px 12px 0px rgba(0,0,0,0.1);
		border-radius:25px;
		position: absolute;
		left: 4px;
		bottom: 4px;
		z-index: 1000;
		i{
			display: inline-block;
			background: #fff;
		}
		.one{
			width: 2px;
			height: 20px;
			position: absolute;
			left: 20px;
			top: 10px;
		}
		.two{
			width: 20px;
			height: 2px;
			position: absolute;
			left: 11px;
			top: 19px;
		}
	}
	.islogin{
		display:none;
	}
	.upload{
		width:42px;
		height:42px;
		background:rgba(40,41,45,.06);
		border-radius:25px;
		position: absolute;
		left: 4px;
		bottom: 4px;
		z-index: 1000;
		.van-icon-fire{
			font-size: 20px;
			padding: 10px;
			color: rgba(254,127,37,1);
		}
	}
}
.outtt{
	.van-icon-close{
		font-size: 20px;
		padding: 16px;
		float: right;
		color: rgba(40,41,45,0.3);
	}
	.van-popup--bottom.van-popup--round{
		border-radius: 24px 24px 0 0;
	}
	.login{
		width: 100%;
		margin-top: 48px;
		padding: 20px 40px;
		//border: 1px solid red;
		background: #fff;
		text-align: center;
		.title-icon{
			display: block;
			margin: 0 auto;
			padding-top: 0px;
			padding-bottom: 20px;
			width: 80px;
			height: 100px;
			fill: rgba(40,41,45,1);
			//text-align: center;
		}
		input{
			width: 100%;
			height: 48px;
			margin-bottom: 20px;
			border-width: 0px 0px 1px 0px;
		}
		.submit{
			margin-top: 20px;
			border: 0px;
			@include w-h(100%,48px,rgba(40,41,45,1));
			border-radius: 8px;
			color: #fff;
			cursor: pointer;
		}
		.bakcts{
			@include fonts(14px,#ff504b,42px,center);
		}
	}
}
</style>


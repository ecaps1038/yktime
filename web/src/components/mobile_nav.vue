<template>
	<div class="outtt">
	  	<div class="mobile-nav">
			<div class="mr" @click="zksq">
				<div class="xian"><i></i><i :class="{shou:dj}"></i><i></i></div>
			</div>
			<div class="out">
				<div :class="{nav: true,wit:!dj}" @click="zksq">
					<div :class="{adddiary:dl}" @click="toDiary">
						<i class="one"></i><i class="two"></i>
					</div>
					<router-link to="/mobile/home">首页<i :style="xzx"></i></router-link>
					<router-link to="/mobile/diary">随记<i :style="xzx"></i></router-link>
					<router-link to="/about">关于我<i :style="xzx"></i></router-link>
				</div>
			</div>
			<!-- <div class="add-diary"></div> -->
		</div>
		<router-view></router-view>
    </div>
</template>
<script type="text/javascript">
	
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
        	
        }
    },
    computed:{
        
    },
    methods:{
        dtime: function(num){
            return s.changeTime2(num);
        },
        //判断是否登录
        manage: function(){
			var _this = this;
			_this.$axios.get(_this.GLOBAL.baseUrl+'/manage', {
			})
			.then(function (response) {
				var data = response.data;
				var tep = data.tep;
				if(tep == 0){
					_this.dl = false;
				}else if(tep == 1){
					_this.dl = true;
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
		},
        //展开与收起导航
        zksq: function(){
        	if(this.dj){
        		this.dj = false;
        	}else{
        		this.dj = true;
        	}
        },
        //跳到日志发表页面
        toDiary(){
            this.$router.push({ path:'/mobile/add'})
        }
    },
    mounted:function(){
    	this.manage();
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
}
</style>


<template>
    <div class="me">
		<div class="header">
			<p class="title">无所事事</p>
		</div>
    </div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
			    
				img: '',	
				sub: '',
				user: '',
				name: '',
				psw: '',
			}
		},
	    computed:{
			
		},
		methods:{
			//显示登录
			showl: function(){
				this.showlogin='display:block';
			},
			//隐藏登录
			closel: function(){
				this.showlogin='display:none';
			},
		},
		mounted:function(){},

	};
</script>
<style lang="scss">
@import "../static/css/common.scss";
	.me{
		.header{
			@include w-h(100%,80px,#1c1c21);

		}
	}
</style>

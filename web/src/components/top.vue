<template>
   <div :class="{top:aa,showtop:tops}" @click="goTop">
    	<p>top</p>
    </div>
</template>
<script type="text/javascript">
import s from '../static/js/myfunc.js'
	export default {
	data () {
		return {
			tops: false,
			aa: true,
		}
	},
     computed:{
     	
	},
	methods:{
	    aaa: function(){
			var _this = this;
    		if(window.pageYOffset >800) {
                this.tops = true;
        	}else{
        		this.tops = false;
        	}
		},
		toTop: function(){
	        var sTop =document.documentElement;
	        sTop.scrollTop = 0;
		},
		goTop: function() {	
		var timer;			// 回到顶部方法
        clearInterval(timer);
        timer = setInterval(function() {
            let curHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;  // 得到当前高度
            var now = curHeight;
            var speed = (0 - now) / 7;								// 随着高度减速
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        
            if (curHeight === 0) {							//当前高度为零,停止这次计时器
              clearInterval(timer);  							// C1
            }
            document.documentElement.scrollTop = curHeight + speed;			//直接给高度赋值,会调用needtotop方法
            document.body.scrollTop = curHeight + speed;				//谷歌的
            stop = false;								// A
       }, 20);
      },
	},
	mounted:function(){
		s.addEvent(window,'scroll',this.aaa);
	},
};
</script>
<style lang="scss">
.top{
	width: 48px;
	height: 48px;
	background: rgba(160,160,160,0.3);
	position: fixed;
	bottom: -60px;
	left: 50%;
	margin-left: 560px;
	transition: all 0.3s;
	cursor:pointer;
	z-index: 1000;
	p{
		line-height: 48px;
		padding-left:12px;
		color:#fff;
	}
	&:hover{
		background: rgba(160,160,160,0.5);
	}
}
.showtop{
	bottom: 60px !important; 
}
</style>
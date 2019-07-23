<template>
   <div class="work-content">
        <ul>
        	<li v-for=" (rem, index) in  articles">
        		<a class="photo-img-div" href="/detial" target="_blank"  @click="detial(rem._id)">
                    <img :src="'http://127.0.0.1:4040/cover/'+rem.icon" class="photo-img"/>
                </a>
                <div class="introduce-div">
                  <a class="title"  href="/detial" target="_blank" @click="detial(rem._id)">{{rem.name}}</a>
                  <p class="introduce">{{rem.introduc}}</p>
                </div>
                <div class="work-other">
                	<p class="type"><span>{{nowType[rem.classlfy]}}</span>
						<span class="fen">/</span>
						<span class="fenge">{{rem.tep}}</span>
					</p>
                	<p class="dates">{{dtime(rem.time)}}</p>
                </div>
        	</li>
        </ul>
        <div class="clear"></div>
    </div>
</template>
<script type="text/javascript">
import s from '../static/js/myfunc.js';
import c from '../static/js/common.js';
	export default {
	data () {
		return {
			articles:[],
			works:['摄影','插画','UI','平面','杂'],
			article:['我的故事','观点','非我'],
		}
	},
	props: {
      display: {// 每页显示条数
        type: Number,
        default: 4
      },
      nowpage: {// 当前页码
        type: Number,
        default: 1
      },
      judge:{
      	type: Number,
      	default: 1
      },
      path:{
      	type: Number,
      	default: 1
      }
    },
     computed:{
     	nowType: function(){
     		if(this.path == 1){
     			return this.works;
     		}else if(this.path == 2){
     			return this.article;
     		}
     	}
     	
	},
	methods:{
	        //时间转换
        dtime: function(time){
            return s.changeTime2(time);
        },
        //初始化
        content: function(current){
            var _this = this;
            _this.$axios.post('http://127.0.0.1:4040/getData', {
                num:current,
                display: _this.display,
                judge: _this.judge,
            })
            .then(function (response) {
                var data = response.data;
                _this.articles = data.ress;
                //_this.nowpage ++;
                //console.log(data.ress)
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
        },
        //详情页跳转
        detial: function(id){
            var _this = this;
            return c.detial(_this,id);
        },

	},
	mounted:function(){
		this.content(this.nowpage);
	},
};
</script>
<style lang="scss">
@import "../static/css/common.scss";
.work-content{
	width: 1120px;
	margin: 0 auto;
	padding-top: 20px;
	clear: both;
	li{
		@include w-h(260px,320px,#fff);
		float: left;
		margin: 10px;
		.photo-img-div{
			@include w-h(260px,195px,#f0f0f0);
			overflow: hidden;
			opacity: 1;
			transition: all 0.3s;
			&:hover{
				opacity: 0.9;
			}
		}
		img{
			height: 100%;
		}
		.introduce-div{
			height: 80px;
			padding: 10px 20px;
		}
		.title{
			@include fonts(14px,#333,24px);
			display: block;
			white-space:nowrap; 
			text-overflow:ellipsis; 
			overflow: hidden; 
		}
		.introduce{
			@include fonts(12px,#999,16px);
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp:2;
			-webkit-box-orient: vertical;
		}
		.work-other{
			height: 42px;
			width: 260px;
			position: relative;
			border-top: 1px solid #eee;
			.type{
				float: left;
				padding-left: 20px;
				span{
					@include fonts(12px,#999,42px);
					float:left;
				}
				.fenge{
					width: 100px;
					display: block;
					white-space:nowrap; 
					text-overflow:ellipsis; 
					overflow: hidden;
				}
				.fen{
					padding: 0 4px;
				}
			}
			.dates{
				@include fonts(12px,#999,42px);
				position: absolute;
				right: 20px;
			}
		}
	}
}
</style>
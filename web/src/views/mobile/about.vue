<template>
    <div class="mobile-a">
    	<div class="bg"></div>
    	<van-popup
		  v-model="show"
		  round
		  position="bottom"
		  :style="{ height: '90%' }"
		>
			<van-icon name="close" @click="closePopup" />
			<p class="ltitle">私信</p>
			<div class="lmain">
				<van-cell-group>
				  <van-field
				    v-model="reply"
				    type="textarea"
				    placeholder="朋友，你好..."
				    rows="8"
				  />
				</van-cell-group>
			</div>
			<div class="lname">
				<van-cell-group>
				  <van-field
				    v-model="mname"
				    type="textarea"
				    placeholder="你是谁呢～"
				    rows="1"
				  />
				</van-cell-group>
			</div>
			<div class="send" @click="publish"><p>发送</p></div>
		</van-popup>
    	<div class="mmsg">
    		<div class="mis">
				 <div class="icon">
                    <van-image
                      width="100%"
                      height="100%"
                      fit="cover"
                      :src="GLOBAL.baseUrl+'/user/user1.png'"
                    />    
                </div>
                <div class="msg">
                	<p class="name">逸刻时光</p>
                	<p class="tip">这里暂时只有我</p>
                </div>
                <p class="six" @click="linkm">私信</p>
			</div>
			<div class="mdata">
				<ul>
					<li>
						<p class="num">12</p>
						<p class="ntit">文章</p>
					</li>
					<li>
						<p class="num">34</p>
						<p class="ntit">作品</p>
					</li>
					<li>
						<p class="num">121</p>
						<p class="ntit">日志</p>
					</li>
					<li>
						<p class="num">1</p>
						<p class="ntit">评论</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="mabout">
			<div class="abme">
				<div class="top">
					<p class="abtit">我大概收集的我</p>
					<span>更多<van-icon name="arrow" /></span>
				</div>
				<div class="main1">
					<p>
						我火火，生于90年，家乡那是个山清水秀！我自认为我在一个最美的时代诞生。就如家乡的变化，小时候我住过泥墙瓦房，夏天屋里泥墙上一个一个洞的野蜂巢有蜂飞进飞出，泥墙底座是红砂石。无知的小孩在上面刻满纹路。
					</p>
					<div class="img"></div>
				</div>
			</div>
			<div class="abweb">
				<div class="top">
					<p class="abtit">我建立这个网站</p>
					<span>更多<van-icon name="arrow" /></span>
				</div>
				<div class="main2">
					<p>
						我火火，生于90年，家乡那是个山清水秀！我自认为我在一个最美的时代诞生。就如家乡的变化，小时候我住过泥墙瓦房，夏天屋里泥墙上一个一个洞的野蜂巢有蜂飞进飞出，泥墙底座是红砂石。无知的小孩在上面刻满纹路。
					</p>
					<div class="img"></div>
				</div>
			</div>
		</div>
    </div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import { Skeleton } from 'vant';
	import { Image } from 'vant';
	import { Icon } from 'vant';
	import { Popup } from 'vant';
	import { Field } from 'vant';
	import { Toast } from 'vant';
	import s from '../../static/js/myfunc.js';
	import c from '../../static/js/common.js';

	Vue.use(Icon);
	Vue.use(Skeleton);
	Vue.use(Image);
	Vue.use(Popup);
	Vue.use(Field);
	Vue.use(Toast);
	export default{
    data(){
        return {
        	total: 0,					//总数
        	num: 1,						//当前页面
			display: 8,					  //一页条数
            list: [],
		    loading: false,
		    finished: false,
		    types:[['摄影','插画','UI','平面','杂'],['我的故事','观点','非我']],
		    show: false,
		    mname: '',
		    reply: '',
        }
    },
    computed:{
        
    },
    methods:{
        dtime: function(num){
        	return s.changeTime2(num);
        },
		//控制私信弹出层
		linkm(){
			this.show = true;
		},
        closePopup() {
	        this.show = false;
	    },
	    //上传信息
	    publish: function(){
            var _this = this,mname='匿名';
            if(_this.mname.length>0){
                mname = _this.mname;
            }
            if(_this.reply.length>0){
            	_this.$axios.post(_this.GLOBAL.baseUrl+'/reply', {
                    replys: _this.reply,
                    name: mname,
                })
                .then(function (response) {
                    var tep = response.data.tep;
                    if(tep == 0){
                      Toast('信息发送成功，感谢您的回信～');
                        _this.reply='';
                        _this.show = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
            } else{
            	Toast('你没有填写内容哦～');
            }
        },
    },
    mounted:function(){
    	//this.content();
    }
};


</script>
<style lang="scss">
@import "../../static/css/common.scss";
  .mobile-a{
  	background: #000;
  	height: 100%;
  	width: 100%;
  	.ltitle{
  		@include fonts(24px,rgba(41,43,51,1),32px);
  		padding: 24px 20px 10px 20px;
  		//border-bottom: 1px solid rgba(41,43,51,.1);
  	}
  	.van-hairline--top-bottom::after{
  		border: 0px;
  	}
  	.van-field{
  		padding: 6px 20px;
  	}
  	.lmain{
  		.van-field__body{
	  		border-bottom: 1px solid rgba(41,43,51,.1);
	  	}
  	}
 	.send{
 		position: fixed;
 		bottom: 0px;
 		@include w-h(100%,68px,#fff);
 		padding: 10px 20px;
 		p{
 			 @include w-h(100%,48px,rgba(41,43,51,1));
 			 border-radius: 8px;
 			 @include fonts(16px,#fff,48px,center);
 		}
 	}
  	.bg{
  		position: fixed;
  		z-index: 0;
  		height: 50%;
  		width: 100%;
  		background: rgba(40,41,45,1);
  	}
  	.mabout{
  		position: fixed;
  		bottom: 0px;
  		width: 100%;
  		height: 80%;
  		background: #fff;
  		border-radius: 24px 24px 0 0;
  		padding-top: 190px;
  		overflow-y: auto; 
  	}
  	.mmsg{
  		position: fixed;
  		top: 20%;
  		z-index: 1000;
  		width: 100%;
  		background: #fff;
  		border-radius: 24px 24px 0 0 ;
  	}
  	.mis{
  		padding: 0 24px;
  		position: relative;
  		.icon{
  			@include w-h-n(80px,80px);
  			border-radius: 50%;
  			border:3px solid rgba(40,41,45,0.1);
  			overflow: hidden;
  			margin-top: -40px;
  		}
  		.name{
  			@include fonts(22px,rgba(40,41,45,1),1.5);
  			font-weight: bold;
  			padding-top: 12px;
  		}
  		.tip{
  			@include fonts(14px,rgba(40,41,45,0.4),1.5);
  		}
  		.six{
  			display: inline-block;
  			position: absolute;
  			right: 24px;
  			top: 68px;
  			width:120px;
			height:42px;
			background:rgba(40,41,45,1);
			box-shadow:0px 10px 20px 0px rgba(0,0,0,0.2);
			border-radius:24px;
			@include fonts(16px,#fff,42px);
			text-align: center;
  		}
  	}
  	.mdata{
		border-bottom: 1px solid rgba(40,41,45,0.1);
		height: 84px;
		padding-top: 28px;
		li{
			float: left;
			width: 25%;
			text-align: center;
			.num{
				@include fonts(18px,rgba(41,43,51,1),24px,center);
			}
			.ntit{
				@include fonts(12px,rgba(41,43,51,0.4),18px,center);
			}
		}
	}
	.abme,.abweb{
		padding: 20px;
		width: 100%;
		.top{
			p{
				@include fonts(18px,rgba(41,43,51,1),24px);
				float: left;
			}
			span{
				@include fonts(14px,rgba(41,43,51,0.4),24px);
				float: right;
				.van-icon{
					@include fonts(14px,rgba(41,43,51,0.4),24px);
					vertical-align: top;
				}
			}
		}
		.main1{
			position: relative;
			clear: both;
			padding-top: 10px;
			p{
				@include fonts(14px,rgba(41,43,51,0.8),21px);
				padding-right: 120px;
			}
			.img{
				position: absolute;
				right: 0;
				top: 10px;
				@include w-h(118px,142px,#f0f0f0);
			}
		}
		.main2{
			position: relative;
			clear: both;
			padding-top: 10px;
			p{
				@include fonts(14px,rgba(41,43,51,0.8),21px);
				padding-left: 120px;
			}
			.img{
				position: absolute;
				left: 0;
				top: 10px;
				@include w-h(118px,142px,#f0f0f0);
			}
		}
	}
  }
  .van-toast__text{
	color: #fff;
}
</style>


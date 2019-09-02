<template>
    <div class="mobile-sj">
    	<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
		<h2 class="title" >随记</h2>
		<van-list
	    v-model="loading"
	    :finished="finished"
	    finished-text="没有更多了"
	    @load="onLoad"
		>
		 
	  	<van-skeleton
	  		v-for="item in display"
	  		:key="item"
		    :row="4"
		    :loading="loading"
			> 
			</van-skeleton>
			<div v-for="(item,index) in list" class="list-call">
				<ul class="imgs" v-if="item.imgs[0]!=''">
                    <li class="img" v-for="(img,indexs) in item.imgs">
                    	<van-image
						  width="100%"
						  height="100%"
						  fit="cover"
						  :src="GLOBAL.baseUrl+'/diary/'+img"
						  @click="imagb(index,indexs)"
						/>
                        
                    </li>
                </ul>
			    <p class="name">{{item.title}}</p>
			    <p class="contents" v-html="item.content"></p>
			    <div class="date"><p>{{dtime(item.time)}}</p></div>
			</div>
		</van-list>
		</van-pull-refresh>
    </div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import { Skeleton } from 'vant';
	import { List } from 'vant';
	import { Image } from 'vant';
	import { ImagePreview } from 'vant';
	import s from '../../static/js/myfunc.js';
	import c from '../../static/js/common.js';
	Vue.use(Skeleton);
	Vue.use(List);
	Vue.use(Image);
	Vue.use(ImagePreview);
	export default{
    data(){
        return {
        	num: 1,						//当前页面
			display: 8,					  //一页条数
            list: [],
            show: false,
      		index: 0,
		    loading: false,
		    finished: false,
      		isLoading: false
        };
    },
    computed:{
        
    },
    methods:{
        dtime: function(num){
        	return s.changeTime3(num);
        },
        onRefresh() {
        	this.$router.go(0);
	      setTimeout(() => {
	        //this.$toast('刷新成功');
	        this.isLoading = false;
	      }, 500);
	    },
		//异步加载列表
		getDairy: function(){
            var _this = this;
            _this.$axios.post(_this.GLOBAL.baseUrl+'/getDairy',{
                num:_this.num,
                display: _this.display,
            })
            .then(function (response) {
                var data = response.data.ress;   
                //console.log(data)
                //处理取出的数据
                for(var i=0;i<data.length;i++){
                    data[i].imgs =  data[i].imgs.split(",");
                    data[i].content = data[i].content.replace(/[\r\n]/g, "</br>");
                }
                _this.list = _this.list.concat(data);
                _this.num++;
                _this.loading = false;
                if(data.length<_this.display){
					_this.finished = true;
				}
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
                //Router.push({path: '/'});
            });
        },
	    onLoad() {
	    // 异步更新数据
	      this.getDairy()
	    },
	    //图片轮播
	    imagb(index,indexs){
	    	var aaa = this.list[index].imgs;
	    	var bbb = [];
	    	for(var i=0;i<aaa.length;i++){
	    		bbb[i] = this.GLOBAL.baseUrl+'/diary/'+aaa[i];
	    	}
	    	ImagePreview({
	    		images:bbb,
		    	startPosition: indexs,
		    	onClose() {
				    //alert('aaa')
				}
		    });
	    },
    },
    mounted:function(){
    }
};


</script>
<style lang="scss">
@import "../../static/css/common.scss";
  .mobile-sj{
  	background: #fff;
  	padding: 0;
  	.title{
  		padding-left: 20px;
  		padding-top: 20px;
  		@include fonts(32px,#262626,1.5);
  		font-weight:500;
  	}
  	.van-skeleton{
  		margin-bottom: 30px;
  		padding-left: 20px;
  	}
  	.list-call{
  		margin: 20px 0px 40px 50px;
  		padding-bottom: 20px;
  		display: block;
  		background:rgba(255,255,255,1);
		box-shadow:0px 4px 20px 0px rgba(0,0,0,0.1);
		position: relative;
  		.name{
  			@include fonts(24px,#262626,30px);
  			padding: 10px 16px;
  			font-weight:400;
  		}
  		.contents{
  			font-weight: 400;
  			@include fonts(15px,rgba(40,41,45,0.8),21px);
  			padding:0 16px;
  		}
  		.date{
  			height: 24px;
  			width: 130px;
  			position: absolute;
  			left: -80px;
  			top: 52px;
  			transform:rotate(-90deg);
  			p{
				font-weight: 400;
	  			@include fonts(14px,rgba(40,41,45,0.4),24px);  	
	  			letter-spacing:4px;
	  			float: right;
	  		}
  		}
  		li{
  			width: 52px;
  			height: 52px;
  			float: right;
  			margin-top: -30px;
  			margin-left: -2px;
  			img{
  				border: 1px solid #fff;
  			}
  			
  		}
  		li:first-child{
  			width: 100%;
  			height: 240px;
  			margin-top: 0;
  			margin-left: 0;
  			float: none;
  			position: relative;
  			left: 0;
  			top: 0;
  			img{
  				border: 0px solid #fff;
  			}
  		}
  		.more-img{
  			background:rgba(254,127,37,1);
  		}
  	}
  }
  .van-pull-refresh{

  }
</style>


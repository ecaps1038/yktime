<template>
  <div class="mobile-h">
		<h2 class="title" >首页</h2>
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
			<a href="/mobile/detial" v-for="item in list" class="list-call" @click="detials(item._id)">
				<div class="mimgh">
					<van-image
				  width="100%"
				  height="100%"
				  fit="cover"
				  :src="GLOBAL.baseUrl+'/cover/'+item.icon"
				/>
			</div>
		    <p class="name">{{item.name}}</p>
		    <p class="date">{{dtime(item.time)}}</p>
		    <p class="type"><span>{{types[item.types][item.classlfy]}}</span>
					<span class="fen">/</span>
					<span class="fenge">{{item.tep}}</span>
				</p>
			</a>
		</van-list>
		<!-- <router-view></router-view> -->
  </div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import { NavBar } from 'vant';
	import { Skeleton } from 'vant';
	import { List } from 'vant';
	import { Cell, CellGroup } from 'vant';
	import { Image } from 'vant';
	import s from '../../static/js/myfunc.js';
	import c from '../../static/js/common.js';
	Vue.use(NavBar);
	Vue.use(Skeleton);
	Vue.use(List);
	Vue.use(Cell).use(CellGroup);
	Vue.use(Image);
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
        }
    },
    computed:{
        
    },
    methods:{
        dtime: function(num){
        	return s.changeTime2(num);
        },
		//异步加载列表
        content: function(num){
			var _this = this;
			_this.$axios.post(_this.GLOBAL.baseUrl+'/getData', {
				num:_this.num,
				display: _this.display,
				judge: 0,
			})
			.then(function (response) {
				var data = response.data;
				_this.list = _this.list.concat(data.ress);
				_this.num ++;
				_this.loading = false;
				if(data.ress.length<_this.display){
					_this.finished = true;
				}
				//console.log(data.ress)
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
			//_this.counts();
		},
		//详情页跳转
		detials: function(id){
			var _this = this
			return c.detial(_this,id);
		},
	    onLoad() {
	    // 异步更新数据
	      this.content()
	    }

    },
    mounted:function(){
    	//this.content();
    }
};


</script>
<style lang="scss">
@import "../../static/css/common.scss";
  body,html{
  	//background: #fff;
  }
  .mobile-h{
  	background: #fff;
  	padding: 0;
  	.title{
  		padding-left: 20px;
  		padding-top: 20px;
  		@include fonts(32px,#262626,1.5);
  		font-weight:bold;
  	}
  	.van-skeleton{
  		margin-bottom: 30px;
  		padding: 0 20px;
  	}
  	.list-call{
  		padding: 10px 20px 20px 20px;
  		display: block;
  		.name{
  			@include fonts(18px,#262626,27px);
  			padding-top: 10px;
  			font-weight:bold;
  		}
  		.date, .type span{
  			@include fonts(12px,rgba(40,41,45,0.4),17px);
  		}
  	}
  	.mimgh{
  		width: 100%;
  		height: 250px;
  	}
  }
</style>


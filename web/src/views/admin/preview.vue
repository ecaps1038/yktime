<template>
    <div class="main detial">
		<div class="title">
			<div class="inner">
				<p class="name">{{name}}</p>
				<p class="time">{{time}}</p>
				<div class="inner-bt">
					<div class="classlfy">
						<span>{{classlfy}}</span>
						<span class="fenge">/</span>
						<span>{{tep}}</span>
					</div>
					<div class="see">
						<svg class="title-icon" aria-hidden="true">
							<use xlink:href="#icon-chakan"></use>
						</svg>
						<span>{{times}}</span>
						<svg class="title-icon" aria-hidden="true">
							<use xlink:href="#icon-comment"></use>
						</svg>
						<span>{{commentnum}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="introduc">
			<p class="introduc-p">{{introduc}}</p>
		</div>
		<div class="contain">
			<div class="inner" v-html="content">
			</div>
		</div>
		<div class="btn-pre">
			<div class="inner-pre">
				<button class="backw" @click="backw">编辑</button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Router from '../../router/index'
	import s from '../../static/js/myfunc.js';
	import c from '../../static/js/common.js';

	export default {
		data () {
			return {
			  	types: '',                                      //属性
			    name: '',                                       //名称
			    classlfy: '',					   				//分类
			    tep: '',                                        //标签
			    introduc: '',					   				//简介
			    content: '',					   				//正文内容
			    time: '',  										//保存时间
			    times: '',  							        //查看次数
				works:['摄影','插画','UI','平面','杂'],
				article: ['我的故事','观点','非我'],
				show: false,
				comlist: [],
				commentnum:'',									//评论数
			}
		},
	    computed:{
	    	commentnb: function(){
				var _this = this;
				var num = s.getByteLen(_this.comname);
				return _this.num1-num;
			},
		},
		methods:{
			//初始化
			primary: function(){
				var _this = this;
				_this.$axios.post('http://127.0.0.1:4040/detial', {
				})
				.then(function (response) {
					var tep = response.data.data.tep;
				    if(tep == 1){
				    	var res = response.data.data.res;
				    	console.log(res);
				    	_this.name = res.name;
				    	_this.introduc = res.introduc;
				    	_this.content = res.content;
				    	_this.time = s.changeTime2(res.time);
				    	_this.times = res.times;
						if(typeof res.tep!=="undefined"){
							_this.tep = res.tep;
						}
						if(res.types == 0){
							_this.classlfy = _this.article[res.classlfy];
						}else if(res.types == 1){
							_this.classlfy = _this.works[res.classlfy];
						}	
					}else if(tep == 0){
						console.log('没有')
					}
					_this.commentcont();
				//_this.commentlist();
				})
				.catch(function (error) {
				    console.log(error);
				    alert(error)
				});

			},
			getnb: function(num){
				var _this = this;
				_this.icon = num;
				_this.show = !_this.show;
			},
			//获取评论数
			commentcont: function(){
				var _this = this;
				_this.$axios.post('http://127.0.0.1:4040/getCommentCount', {
					judge: 0,
				})
				.then(function (response) {
					var data = response.data;
					//_this.count = data.ress;
					_this.commentnum = data.ress;
					//console.log(data.ress)
				})
				.catch(function (error) {
				    console.log(error);
				    alert(error);
				    //Router.push({path: '/'});
				});
			},
			detia: function(data){
				return s.detiaTime(data);
			},
			//返回前页
			backw: function(){
        		this.$router.go(-1);//返回上一层
			}

		},
		mounted:function(){this.primary();},
	};
</script>
<style lang="scss">
	@import "../../static/css/common.scss";
	.detial{
		background: #fff;
	}
	.inner{
		@include w-h-n(1080px,auto);
		margin: 12px auto;
	}
	.detial .title{
		padding-top: 12px;
		border-bottom: 1px solid #eee;
		.name{
			@include fonts(24px,#333,42px);
		}
		.time,.classlfy span{
			@include fonts(14px,#999,34px);
		}
		.inner-bt{
			height: 34px;
		}
		.classlfy{
			float: left;
		}
		.see{
			float: right;
			.title-icon{
				width: 18px;
				height: 26px;
				vertical-align: top;
				fill:#999;
			}
			span{
				@include fonts(14px,#999,26px);
			}
		}
	}
	.introduc{
		background: #f8f8f8;
		border-bottom: 1px solid #eee;
		padding: 40px 0;
		p{
			width: 800px;
			margin: 0 auto;
			@include fonts(16px,#666,30px);
		}
	}
	.contain{
		.inner{
			padding-left:140px;
		}
		p{
			width: 800px;
			@include fonts(14px,#333,24px);
			padding: 12px 0;
			img{
				margin-left: -140px;
				padding: 4px 0;
			}
		}
	}
	.btn-pre{
		width: 100%;
		background: #f3f3f3;
		margin: 20px auto 0 auto;
		padding-top: 30px;
		border-top: 1px solid #eee;
		height: 102px;
		button{
			@include w-h-n(120px,42px);
			border-radius: 4px;
			line-height: 42px;
			border-width: 1px;
			cursor: pointer;
		}
		.inner-pre{
			margin:0 auto;
			width: 1080px;
		}
		.backw{
			background:  rgba(255, 127, 38, 0.9);
			border-color: rgba(255, 127, 38, 0.9);
			color: #fff;
			&:hover{
				background:  rgba(255, 127, 38, 1);
				border-color: rgba(255, 127, 38, 1);
			}
		}
	}
</style>
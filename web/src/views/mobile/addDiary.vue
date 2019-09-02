<template>
    <div class="mobile-add">
		<h2 class="title" >发表日志</h2>
		<p class="closes" @click="back">取消</p>
		<div class="dtitle">
			<van-field v-model="title" placeholder="标题" />
		</div>
		<div class="mdiary">
			<van-field
			    v-model="intro"
			    type="textarea"
			    placeholder="日志内容"
			    rows="4"
			    autosize
			/>
		</div>
		<div class="upphoto">
			<ul class="mimg-n">
				<li v-for="(num,index) in photohtml">
					<span @click="deleteimg(index)" class="delete">-</span>
					<div class="img"><van-image
						  width="100%"
						  height="100%"
						  fit="cover"
						  :src="num"
						/>
					</div>
				</li>
				<p class="minput-img">
					<i class="heng"></i><i class="shu"></i>
					<input 
					type="file" 
					name="file" 
					id="file" 
					multiple="multiple" 
					ref="aaa" 
					@change="eimg" 
					>
				</p>
			</ul>
			
			<!-- <p @click="upphoto">上传</p> -->
		</div>
		<div class="mdiary-up">
			<button class="publish" @click="publish">发布</button>
		</div>
    </div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import { Image } from 'vant';
	import { ImagePreview } from 'vant';
	import { Field } from 'vant';
	import { Uploader } from 'vant';
	import { Toast } from 'vant';
	import { PullRefresh } from 'vant';
	import s from '../../static/js/myfunc.js';
	import c from '../../static/js/common.js';
	Vue.use(Image);
	Vue.use(ImagePreview);
	Vue.use(Field);
	Vue.use(Uploader);
	Vue.use(Toast);
	Vue.use(PullRefresh);
	export default{
    data(){
        return {
        	title:'无题',
        	intro:'',
        	fileList: [],
        	photohtml:[],           //前端显示用
	        files:[],				//后台保存用
	        photonames: '',			//图片名称拼接
	        isok: '0',				//判断填写项
        };
    },
    computed:{
        
    },
    methods:{
        dtime: function(num){
        	return s.changeTime3(num);
        },
        //返回上一级
		back(){
        	this.$router.go(-1);//返回上一层
    	},
	    //图片显示
		eimg: function(){
			var _this = this;
			var aa='';
			var file = document.getElementById("file");
			for(var i=0;i<file.files.length;i++){
				aa=s.getObjectURL(file.files[i]);
				_this.photohtml.push(aa);
				_this.files.push(file.files[i]);
			}
		},
		//删除图片
		deleteimg: function(index){
			var _this = this;
			_this.photohtml.splice(index,1);
			_this.files.splice(index,1);
		},
		//封面上传
		upphoto: function(){
			var _this = this;
			var formData = new FormData();
			if(_this.files.length>0){
				for(var i=0;i<_this.files.length;i++){
	            	formData.append('file',_this.files[i]);
	        	}
			}
	        _this.$axios.post(_this.GLOBAL.baseUrl+'/uploaddiary', 
			    formData
			)
			.then(function (response) {
				if(response.data.code === 200){
					//将数组转为用","隔开的字符串
					_this.photonames = response.data.data.join(",");
					var data = {
						title:_this.title,
						content:_this.intro,
						imgs:_this.photonames,
						time:new Date()
					}
					_this.upfile(data);			
				}				    
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		//文章判断
	    judge: function(){
			var _this = this;
			//基本信息上传
	        _this.isok = 0;
			if(_this.title==''){
				_this.isok = 1;
				Toast('请填写标题');
			}
			if(_this.intro==''){
				_this.isok = 1;
				Toast('请填写内容');
			}
			return _this.isok;
		},
		//上传文章部分
		upfile: function(data){
			var _this = this;
				//_this.save = '正在保存...';
				_this.$axios.post(_this.GLOBAL.baseUrl+'/updiary', data)
				.then(function (response) {
					var tep = response.data.tep;
				    if(tep == 0){
				    	console.log('上传成功了')
						//_this.save = '已自动保存';
					}
				})
				.catch(function (error) {
				    console.log(error);
				    alert(error)
				});
		},
		//点击发布
		publish: function(){
			var _this = this;
			//_this.$message(_this.title);
			_this.judge();
			if(_this.isok == 0){
				_this.upphoto();
				_this.$router.go(-1);
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
  .mobile-add{
  	background: #fff;
  	padding: 0 0 68px 0;
  	.title{
  		padding-left: 20px;
  		padding-top: 20px;
  		@include fonts(32px,#262626,1.5);
  		font-weight:500;
  	}
  	.closes{
  		float: right;
  		margin-top: -40px;
  		@include fonts(14px,rgba(40,41,45,0.6),1.5);
  		padding:10px 20px;
  	}
  	.dtitle{
		padding: 20px 20px 0 20px;
		.van-cell{
			background:rgba(40,41,45,0.06);
			border-radius:8px;
		}
  	}
  	.mdiary{
  		padding: 4px;
  	}
  	.mdiary-up{
  		position: fixed;
  		bottom: 0;
  		height: 68px;
  		width: 100%;
  		padding: 10px 20px;
  		background: #fff;
  		z-index: 1000;
  		.publish{
  			height: 48px;
  			width: 100%;
  			background:rgba(38,38,38,1);
			border-radius:8px;
			border: 0;
			color: #fff;
			font-size: 16px;
  		}
  	}
  	.upphoto{
	}
	.mimg-n{
		float:left;
		padding-left: 20px;
		height: 60px;
		.delete{
			@include w-h(20px,20px,rgba(255,83,83,0.8));
			border-radius: 50%;
			//border: 2px solid #fff;
			position: absolute;
			right: -6px;
			top: -6px;
			z-index: 10;
			cursor: pointer;
			color: #fff;
			font-size: 18px;
			font-weight:500;
			line-height: 18px;
			text-align: center;
		}
		li{
			@include w-h-n(60px,60px);
			display: inline-block;
			position: relative;
			margin-right: 10px;
			margin-bottom: 10px;
			.img{
				overflow: hidden;
				border-radius: 8px;
				height: 100%;
				width: 100%;
			}
			img{
				height:100%;
				width: 100%;
				object-fit: cover;
			}
		}
	}
	.minput-img{
		position: relative;
		vertical-align: top;
		#file{
				display: inline-block;
				height: 54px;
				width: 54px;
				opacity: 0;
				cursor: pointer;
			}
		border: 1px dashed #ddd;
		display: inline-block;
		height: 60px;
		width: 60px;
		border-radius: 8px;
		opacity: 1;
		cursor: pointer;
		.heng{
			@include w-h(24px,1px,#ddd);
			position: absolute;
			left: 17px;
			top: 28px;
		}
		.shu{
			@include w-h(1px,24px,#ddd);
			position: absolute;
			left: 28px;
			top: 17px;
		}
	}
  }
  	.van-toast__text{
		color: #fff;
	}
</style>


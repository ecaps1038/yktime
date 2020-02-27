<template>
    <div class="upwork">
    	<div class="inner">
			<div class="inform">
				<p class="inf-title">日志</p>
				<div class="inf-input">
					<div class="input">
						<i class="tp"></i>
						<input type="text" name="title" :placeholder="'日志标题'" v-model="title" @blur="uptitle">
						<span class="num">{{titlechange}}</span>
						<span class="tx">{{titlea}}</span>
					</div>
					<div class="diary">
						<i class="dian"></i>
						<el-input
						  type="textarea"
						  placeholder="请输入内容"
						  v-model="intro"
						  @blur="upintro" 
						>
						</el-input>
						<span class="nume">{{introchange}}</span>
						<span class="txe">{{introa}}</span>
					</div>
					<div class="upphoto">
						<ul class="img-n">
							<li v-for="(num,index) in photohtml">
								<span @click="deleteimg(index)" class="delete">x</span>
								<div class="img"><img :src="num"/></div>
							</li>
						</ul>
						<p class="input-img">
							<i class="heng"></i><i class="shu"></i>
							<input type="file" name="file" id="file" multiple="multiple" ref="aaa" @change="eimg" >
						</p>
						<!-- <p @click="upphoto">上传</p> -->
					</div>
				</div>
			</div>
			<div class="btn-div diary-up">
				<button class="publish" @click="publish">发布</button>
				 <button class="tupian" @click="publish1">图文并发</button>
			</div>
		</div>
    </div>
</template>
<script type="text/javascript">
//加入跳转页面的位置
import Router from '../../router/index'
import s from '../../static/js/myfunc.js';

export default {
	data () {
		return {
			title: '无题',	
			intro: '',
			num1: 56,
			num2: 1200,
	        src: this.GLOBAL.baseUrl+'/user/nomare.png',
	        isok: '0',
	        titlea:'',
	        introa: '',
	        icon: '',
	        save: '文档自动保存',
	        photohtml:[],           //前端显示用
	        files:[],				//后台保存用
	        photonames: '',
	        selects:true,
		}
	},
    computed:{
		titlechange: function(){
			var _this = this;
			var num = s.getByteLen(_this.title);
			return _this.num1-num;
		},
		introchange: function(){
			var _this = this;
			var num = s.getByteLen(_this.intro);
			return _this.num2-num;
		},
	},
	methods:{
        manage: function(){
			var _this = this;
			_this.$axios.get(_this.GLOBAL.baseUrl+'/manage', {
			})
			.then(function (response) {
				var data = response.data;
				var tep = data.tep;
				if(tep == 0){
					Router.push({path: '/'});
				}else if(tep == 1){
					_this.imgurl = _this.GLOBAL.baseUrl+'/user/user1.png';
					_this.name = data.myname;
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
		},
		
		//inpiut失去焦点判断
		uptitle: function(){
			var _this = this;
			_this.titlea = '';
			if(_this.title==''){
				_this.titlea = '请填标题';
			}else{
				//_this.upfile(_this.title,0);
			}
		},
		upintro: function(){
			var _this = this;
			_this.introa = '';
			if(_this.intro==''){
				_this.introa = "请填内容";
			}else{
				//_this.upfile(_this.intro,3);
			}
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
		upphoto: function(vel){
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
					//_this.upfile(response.data.data,4);	
					//console.log(response.data.data);
					//将数组转为用","隔开的字符串
					_this.photonames = response.data.data.join(",");
					var data = {title:_this.title,content:_this.intro,imgs:_this.photonames,time:new Date(),types:vel}
					//console.log(_this.photonames);
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
			_this.titlea='';
	        _this.introa= '';
	        _this.isok = 0;
			if(_this.title==''){
				_this.titlea = '请填标题';
				_this.isok = 1;
			}
			if(_this.intro==''){
				_this.introa = "请填内容";
				_this.isok = 1;
			}
			if(_this.isok == 1){
				_this.$message('有未填写项');
			}
			return _this.isok;
		},
		//上传文章部分
		upfile: function(data){
			var _this = this;
			_this.icon = 'el-icon-loading';
				_this.save = '正在保存...';
				_this.$axios.post(_this.GLOBAL.baseUrl+'/updiary', data)
				.then(function (response) {
					var tep = response.data.tep;
				    if(tep == 0){
				    	console.log('上传成功了')
				    	_this.icon = '';
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
				_this.upphoto(0);
				_this.$message('发布成功！');
				_this.$router.push({path: '/manage'});
			}
		},//点击发布
		publish1: function(){
			var _this = this;
			//_this.$message(_this.title);
			_this.judge();
			if(_this.isok == 0){
				_this.upphoto(1);
				_this.$message('发布成功！');
				_this.$router.push({path: '/manage'});
			}
		},
		//点击预览
		preview: function(){
			var _this = this;
			_this.$router.push({path: '/add/preview'});
		},
	},
	mounted:function(){
		this.manage();
		//this.justit();
	},
	watch: {
        title() {
            if (this.title.length > this.num1) {
                this.title = String(this.title).slice(0, this.num1);
            }
        },
        intro() {
            if (this.intro.length > this.num2) {
                this.intro = String(this.intro).slice(0, this.num2);
            }
        }
    }
};
</script>
<style lang="scss">
    @import "../../static/css/common.scss";
.upwork{
	background: #f3f3f3;
}
.inform{
	@include w-h(100%,auto,#fff);
	margin-top: 24px;
	.inf-title{
		@include fonts(14px,#333,50px);
		padding-left: 30px;
		border-bottom:1px solid #eee;
		span{
			color: #999;
			padding-left: 6px;
		}
	}
}
.inf-input{
	padding: 15px 30px;
	.input{
		position: relative;
		padding: 15px 0;	
		input{
			@include input(880px);
			padding-right: 40px;
		}
		.el-textarea{
			width: 880px;
			vertical-align: middle;

		}
		textarea{
			@include input(880px);
			line-height: 20px;
			padding-top: 10px;
			padding-bottom: 10px;
			padding-right: 40px;
			resize:none;

		}
	}
	.diary{
		position: relative;
		padding: 15px 0;	
		.el-textarea{
			width: 880px;
			vertical-align: middle;

		}
		textarea{
			height: 430px;
			margin-left: 16px;
			// @include input(880px);
			line-height: 20px;
			padding-top: 10px;
			padding-bottom: 10px;
			padding-right: 10px;
			resize:none;
			border-radius: 4px 4px 0 0;
			&::-webkit-input-placeholder{color:#999;}    /* 使用webkit内核的浏览器 */
			&:-moz-placeholder{color:#999;}                  /* Firefox版本4-18 */
			&::-moz-placeholder{color:#999;}                  /* Firefox版本19+ */
			&:-ms-input-placeholder{color:#999;}
			&:focus{
				border-color: #666 !important;
			}
		}
		.txe{
		padding-left: 14px;
		color: #ff504b;
		position: absolute;
		top: 24px;
		right: 48px;
		}
		.dian{
			@include mast();
			position: absolute;
			top: 34px;
		}
		.nume{
		position: absolute;
		right: 140px;
		bottom: 15px;
		line-height: 42px;
		color: #999;
	}
	}
	.sort{
		width: 148px;
	}
	.num{
		position: absolute;
		right: 140px;
		top: 15px;
		line-height: 42px;
		color: #999;
	}
	.tx{
		padding-left: 14px;
		color: #ff504b;
	}
	.tp{
		@include mast();
		margin-right: 8px;
		margin-top: 12px;
		margin-bottom: 2px;
	}
	.upphoto{
		border: 1px solid #ddd;
		border-radius: 0 0 4px 4px;
		@include w-h(880px,128px,#fff);
		margin-left: 16px;
		margin-top: -16px;
	}
	.img-n{
		float:left;
		padding-left: 16px;
		height: 80px;
		margin-top: 24px;
		.delete{
			@include w-h(18px,18px,#fc8c30);
			border-radius: 9px;
			//border: 2px solid #fff;
			box-shadow: 2px 3px 6px rgba(0,0,0,0.2);
			position: absolute;
			left: -6px;
			top: -6px;
			cursor: pointer;
			color: #fff;
			line-height: 16px;
			text-align: center;
			display: none;
		}
		li{
			@include w-h(80px,80px,#eee);
			position: relative;
			margin-right: 16px;
			&:hover{
				.delete{
					display: block;
				}
			}
			.img{
				overflow: hidden;
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
	.input-img{
		float: left;
		position: relative;
		#file{
				display: inline-block;
				height: 54px;
				width: 54px;
				opacity: 0;
				cursor: pointer;
			}
		border: 1px dashed #ddd;
		display: inline-block;
		height: 54px;
		width: 54px;
		border-radius: 10px;
		opacity: 1;
		cursor: pointer;
		margin-top: 36px;
		margin-left: 10px;
		.heng{
			@include w-h(24px,2px,#ddd);
			position: absolute;
			left: 14px;
			top: 25px;
		}
		.shu{
			@include w-h(2px,24px,#ddd);
			position: absolute;
			left: 25px;
			top: 14px;
		}
	}
}
.inf-num,.inf-photo{
	padding: 22px 38px;
	.tp{
		@include mast();
		float:left;
		margin-top: 24px;
		margin-left: -8px;
	}
}
.last-inf{
	margin-bottom: 24px;
	position: relative;
	.up-cover{
		@include w-h(280px,210px,#f1f1f1);
		overflow: hidden;
		margin: 8px 0 8px 10px;
		position: relative;
		text-align: center;
		.file-input{
			@include w-h-n(64px,64px);
			position: absolute;
			top: 54px;
			left: 108px;
			#file{
				display: inline-block;
				height: 64px;
				opacity: 0;
				cursor: pointer;
			}
			p{
				line-height: 20px;
				color: #f1f1f1;
				margin-top: -30px;
			}
		}
		img{
			width: 280px;

		}
		#upload{
			position: absolute;
			top: 30px;
			left: 50px;
		}
	}
	.tx{
		position: absolute;
		left: 350px;
		top: 90px;
		color: #ff504b;
	}
}
.diary-up{
	margin-top: 30px;
}
.btn-div{
	height: 92px;
	button{
		@include w-h-n(120px,42px);
		border-radius: 4px;
		line-height: 42px;
		border-width: 1px;
		cursor: pointer;
	}
	.publish{
		background:  rgba(255, 127, 38, 0.9);
		border-color: rgba(255, 127, 38, 0.9);
		color: #fff;
		&:hover{
			background:  rgba(255, 127, 38, 1);
			border-color: rgba(255, 127, 38, 1);
		}
	}
	.tupian{
		margin-left: 18px;
		background:  #f3f3f3;
		border-color: #bbb;
		color: #666;
		&:hover{
			background:  #f3f3f3;
			border-color: #aaa;
			color: #333;
		}
	}
	.save{
		padding-left: 16px;
		color: #999;
	}
}
#fwbFrame{
	width: 880px;
	height: 568px;
}
</style>

<template>
    <div class="upwork main">
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
								<span @click="deleteimg(index)">删</span>
								<img :src="num"/>
							</li>
						</ul>
						<p class="input-img">
							<i class="heng"></i><i class="shu"></i>
							<input type="file" name="file" id="file" multiple="multiple" ref="aaa" @change="eimg" >
						</p>
					</div>
				</div>
			</div>
			<div class="btn-div">
				<button class="publish" @click="publish">发布</button>
				<span class="save"><i :class="icon"></i>{{save}}</span>
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
			title: '',	
			label: '',
			intro: '',
			num1: 56,
			num2: 1200,
			just: '',
			options: [],
	        value: '',
	        editor2: '',
	        src: 'http://127.0.0.1:4040/user/nomare.png',
	        titlea: '',
	        selecta: '',
	        introa: '',
	        photoa: '',
	        isok: '0',
	        icon: '',
	        save: '文档自动保存',
	        photohtml:[],
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
		titlelen: function(){
			
		}
	},
	methods:{
        manage: function(){
			var _this = this;
			_this.$axios.post('http://127.0.0.1:4040/upwork', {
			})
			.then(function (response) {
				var data = response.data.data;
				var tep = data.tep;
				//alert(tep);
				var wid = data.wid;
				if(tep == 0){
					Router.push({path: '/'});
				}else if(tep == 1){
					var res = data.res;
					//console.log(res)
					if(typeof res.name!=="undefined"){
						_this.title = res.name;
					}
					if(typeof res.tep!=="undefined"){
						_this.label = res.tep;
					}
					if(typeof res.classlfy!=="undefined"){
						_this.value = _this.options[res.classlfy].label;
					}
					if(typeof res.introduc!=="undefined"){
						_this.intro = res.introduc;
					}
					// _this.title = res.name;
					// _this.label = res.tep;
					// _this.value = _this.options[res.classlfy].label;
					// _this.intro = res.introduc;
					if(typeof res.icon!=="undefined"){
						_this.src = 'http://127.0.0.1:4040/cover/'+res.icon;
					}					 
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
		},
		
		//上传文件
		upfile: function(data,num){
			var _this = this;
			_this.icon = 'el-icon-loading';
				_this.save = '正在保存...';
				_this.$axios.post('http://127.0.0.1:4040/uptitle', {
				    data: data,
				    num: num,
				})
				.then(function (response) {
					var tep = response.data.tep;
				    if(tep == 0){
				    	_this.icon = '';
						_this.save = '已自动保存';
					}
				})
				.catch(function (error) {
				    console.log(error);
				    alert(error)
				});
		},

		//inpiut失去焦点自动上传
		uptitle: function(){
			var _this = this;
			_this.titlea = '';
			if(_this.title==''){
				_this.titlea = '请填标题';
			}else{
				//_this.upfile(_this.title,0);
			}
		},
		uplabel: function(){
			var _this = this;
			if(_this.label==''){
			}else{
				//_this.upfile(_this.label,2);
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
		//上传文章上部分
		uptitle1: function(){
			var _this = this;
			_this.$axios.post('http://127.0.0.1:4040/uptitle', {
			    title: _this.title,
			    label: _this.label,
			    intro: _this.intro,
			    value: _this.value,
			    just: _this.just,

			})
			.then(function (response) {
				var tep = response.data.tep;
			    if(tep == 0){
			    	//_this.upphoto();
					//Router.push({path: '/'})
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		//图片显示
		eimg1: function(){
			var _this = this;
			var aa = s.getObjectURL(document.getElementById("file").files[0]);
			_this.src = aa;
			_this.photohtml +='<span><img src="'+aa+'"/></span>';
			//_this.upphoto();
		},
			//图片显示
		eimg: function(){
			var _this = this;
			var aa=[];
			for(var i=0;i<document.getElementById("file").files.length;i++){
				aa[i]=s.getObjectURL(document.getElementById("file").files[i]);
				_this.photohtml.push(aa[i]);
			}
		},
		//删除图片
		deleteimg: function(index){
			var _this = this;
			_this.photohtml.splice(index,1);
		},
		//封面上传
		upphoto: function(){
			var _this = this;
			var file = document.getElementById("file");
			//console.log(file.files);
			if(file.files.length>0){
	            var formData = new FormData();
	            formData.append('file',file.files[0])
	            //console.log(formData);
	            _this.$axios.post('http://127.0.0.1:4040/uploadcover', 
					    formData
					)
					.then(function (response) {
						if(response.data.code === 200){
							_this.upfile(response.data.data,4);	
							//alert('aaa')						
						}				    
					})
					.catch(function (error) {
					    console.log(error);
					    alert(error)
					});
			}
		},
		//文章判断
	    judge: function(){
			var _this = this;
			//基本信息上传
			_this.titlea='';
	        _this.selecta= '';
	        _this.introa= '';
	        _this.photoa='';
	        _this.isok = 0;
			if(_this.title==''){
				_this.titlea = '请填标题';
				_this.isok = 1;
			}
			if(_this.value==''){
				_this.selecta = "请选择分类";
				_this.isok = 1;
			}
			if(_this.intro==''){
				_this.introa = "请填简介";
				_this.isok = 1;
			}
			if(_this.src== 'http://127.0.0.1:4040/user/nomare.png'){
				_this.photoa = "请选择封面";
				_this.isok = 1;
			}
			if(_this.isok == 1){
				_this.$message('有未填写项');
			}
			return _this.isok;
		},
		//点击发布
		publish: function(){
			var _this = this;
			//_this.$message(_this.title);
			_this.judge();
			if(_this.isok == 0){
				_this.upfile('ok',6);
				_this.$message('发布成功！');
				_this.$router.push({path: '/manage'});
			}
		},
		//点击预览
		preview: function(){
			var _this = this;
			_this.$router.push({path: '/add/preview'});
		},


		//cookie测试
		 cookie: function(){
			var _this = this;
			_this.$axios.get('http://127.0.0.1:4040/getcookie', {
			})
			.then(function (response) {
				var data = response.data;
				var id = data.id;
				alert(id);
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
		},
	    
	},
	mounted:function(){
		//this.manage();
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
	.select{
		position: relative;
		padding: 15px 0;
		input{
			@include input(148px)
		}
		.label{
			width: 320px;
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
		li{
			@include w-h(80px,80px,#eee);
			overflow: hidden;
			margin-right: 16px;
			img{
				width:100%;
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
	.preview{
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

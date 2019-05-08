//加入跳转页面的位置
import Router from '../../../router/index'

import s from '../myfunc.js'
import {fileSelect} from'../filefwb.js'
import E from 'wangeditor'
import F from '../lib/wangEditor'


//文章
var article=[
	{
	 	value: '选项1',
	    label: '我的故事'
	}, {
	    value: '选项2',
	    label: '观点'
	}, {
	    value: '选项3',
	    label: '非我'
	}];
var diary=[
	{
	 	value: '选项1',
	    label: '摄影'
	}, {
	    value: '选项2',
	    label: '插画'
	}, {
	    value: '选项3',
	    label: 'UI'
	}, {
	    value: '选项4',
	    label: '平面'
	}, {
	    value: '选项5',
	    label: '杂'
}];


export default {
	data () {
		return {
			title: '',	
			label: '',
			intro: '',
			num1: 56,
			num2: 120,
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
			_this.$axios.get('http://127.0.0.1:4040/manage', {
			})
			.then(function (response) {
				var data = response.data;
				var tep = data.tep;
				if(tep == 0){
					Router.push({path: '/'});
				}else if(tep == 1){
					_this.user = '<img src="http://127.0.0.1:4040/user/user1.png">';
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
		},
		//判断入口
		justit: function(){
			var _this = this;
			if(_this.$route.query.n==1){
				_this.options = [];
				_this.just = '文章';
				for(var i=0;i<article.length;i++){
					_this.options.push(article[i]);
				}
				
			}else if(_this.$route.query.n==2){
				_this.options = [];
				_this.just = '作品';
				for(var i=0;i<diary.length;i++){
					_this.options.push(diary[i]);
				}
				
			}
		},
		//载入富文本编辑器
		fwb1: function(){
			var _this = this;
	        //var E = window.F;
			_this.editor2 = new F('#divs');
			_this.editor2.create();
		},
		//载入富文本编辑器
		fwb: function(){
			var _this = this;
	         _this.editor2 = new E('#divs')
        _this.editor2.create();
       
		},
		//图片显示
		eimg: function(){
			var _this = this;
			var aa = s.getObjectURL(document.getElementById("file").files[0]);
			_this.src = aa;
			console.log(_this.src);
		},


		//上传文章上部分
		uptitle: function(){
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
							alert('上传成功');
							
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
			//_this.judge();
			if(_this.isok == 0){
				//_this.upphoto();
				_this.uptitle();
				//_this.$router.push({path: '/home'});
			}
			for(let i = 0; i<10; i++){
				console.log(i)
			}
		},
		//测试获取ifrem内容
		huoqu: function(){
			var _this = this;
			var aa = document.getElementById('fwbFrame').contentWindow.document.getElementById('btn1').attr('data-id')
			alert(aa);
		}
	    
	},
	mounted:function(){this.manage();this.justit();},
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
}
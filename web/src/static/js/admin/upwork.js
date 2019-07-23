//加入跳转页面的位置
import Router from '../../../router/index'

import s from '../myfunc.js'


//文章
var article=[
	{
	 	value: '0',
	    label: '我的故事'
	}, {
	    value: '1',
	    label: '观点'
	}, {
	    value: '2',
	    label: '非我'
	}];
var works=[
	{
	 	value: '0',
	    label: '摄影'
	}, {
	    value: '1',
	    label: '插画'
	}, {
	    value: '2',
	    label: 'UI'
	}, {
	    value: '3',
	    label: '平面'
	}, {
	    value: '4',
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
	        icon: '',
	        save: '文档自动保存',
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
		//测试
		out:function(){
			var _this = this;
			console.log(_this.inputData);
		},
		//判断入口
		justit: function(){
			var _this = this;
			if(_this.$route.query.n==0){
				_this.options = [];
				_this.just = '文章';
				for(var i=0;i<article.length;i++){
					_this.options.push(article[i]);
				}
				
			}else if(_this.$route.query.n==1){
				_this.options = [];
				_this.just = '作品';
				for(var i=0;i<works.length;i++){
					_this.options.push(works[i]);
				}
				
			}
		},
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
				_this.upfile(_this.title,0);
			}
		},
		upvalue: function(){
			var _this = this;
			_this.selecta = '';
			if(_this.value==''){
				_this.selecta = "请选择分类";
			}else{
				_this.upfile(_this.value,1);
			}
		},
		uplabel: function(){
			var _this = this;
			if(_this.label==''){
			}else{
				_this.upfile(_this.label,2);
			}
		},
		upintro: function(){
			var _this = this;
			_this.introa = '';
			if(_this.intro==''){
				_this.introa = "请填简介";
			}else{
				_this.upfile(_this.intro,3);
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
		eimg: function(){
			var _this = this;
			var aa = s.getObjectURL(document.getElementById("file").files[0]);
			_this.src = aa;
			_this.upphoto();
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
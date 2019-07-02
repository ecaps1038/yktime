//加入跳转页面的位置
import Router from '../../../router/index'
import s from '../myfunc.js'


export default {
	data () {
		return {
		  	htmls: [],
		  	total: 0,
			pages: 0,
			nowpage: 1,
			display: 4,
			works:['摄影','插画','UI','平面','杂'],
		}
	},
    computed:{
		
	},
	methods:{
		//时间转换
		dtime: function(time){
    		return s.changeTime2(time);
    	},
    	counts: function(){
			var _this = this;
			_this.$axios.post('http://127.0.0.1:4040/getCount', {
				judge: 2,
			})
			.then(function (response) {
				var data = response.data;
				//_this.count = data.ress;
				_this.total = data.ress;
				_this.pages = Math.ceil(data.ress/2);
				//console.log(data.ress)
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    //Router.push({path: '/'});
			});
		},
		//初始化
        content: function(){
			var _this = this;
			_this.$axios.post('http://127.0.0.1:4040/getData', {
				num:_this.nowpage,
				display:_this.display,
				judge: 2,
			})
			.then(function (response) {
				var data = response.data;
				_this.htmls = data.ress;
				//console.log(data.ress)
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error);
			    Router.push({path: '/'});
			});
			_this.counts();
		},
        
		//发布
		//上传文件
		upfile: function(data,num){
			var _this = this;
			//_this.icon = 'el-icon-loading';
			//_this.save = '正在保存...';
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
		//点击发布
		publish: function(id){
			var _this = this;
			_this.$axios.post('http://127.0.0.1:4040/dataChange', {
			    data: id,
			    num: 0,
			})
			.then(function (response) {
				var tep = response.data.tep;
			    if(tep == 0){
			    	//_this.icon = '';
					_this.$message('发布成功！');
					_this.content();
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		//点击撤回
		revoke: function(id){
			var _this = this;
			_this.$axios.post('http://127.0.0.1:4040/dataChange', {
			    data: id,
			    num: 1,
			})
			.then(function (response) {
				var tep = response.data.tep;
			    if(tep == 0){
			    	//_this.icon = '';
					_this.$message('撤回成功！');
					_this.content();
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		//点击修改
		modify: function(id){
			var _this = this;
			_this.$axios.post('http://127.0.0.1:4040/dataChange', {
			    data: id,
			    num: 2,
			})
			.then(function (response) {
				var tep = response.data.tep;
			    if(tep == 0){
			    	_this.$router.push({path: '/add/upwork?n=1'});
				}
			})
			.catch(function (error) {
			    console.log(error);
			    alert(error)
			});
		},
		//点击删除
		deletef(id) {
	        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	        }).then(() => {
	        	var _this = this;
				_this.$axios.post('http://127.0.0.1:4040/dataChange', {
				    data: id,
				    num: 3,
				})
				.then(function (response) {
					var tep = response.data.tep;
				    if(tep == 0){
				    	_this.content();
				    	_this.$message({
				            type: 'success',
				            message: '删除成功!'
				        });
					}
				})
				.catch(function (error) {
				    console.log(error);
				    alert(error)
				});
	        }).catch(() => {
	            this.$message({
	                type: 'info',
	            	message: '已取消删除'
	            });          
	        });
	    },

	    //页码部分
		pagechange: function(nowpages){
			var _this = this;
			_this.nowpage = nowpages;
			_this.content();
		}
	},
	mounted:function(){this.content();},

}
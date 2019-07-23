<template>
  <div class="main work">
    <router-view name="workMd" :nowpage='nowpage' :display="display" :judge="judge" :path="path" ref="child2"></router-view>
    <router-view name="pages" :total="total" :nowpage='nowpage' :display="display" @pagechange="pagechange"></router-view>
  </div>
</template>
<script type="text/javascript">
	import s from '../static/js/myfunc.js';
	import c from '../static/js/common.js';

 export default{
    data(){
        return {
            pages: 0,
            nowpage: 1,
            display: 8,
            total: '',
            path:2,
            judge: 3,
        }
    },
     computed:{
    },
    methods:{
        counts: function(){
            var _this = this;
            _this.$axios.post('http://127.0.0.1:4040/getCount', {
                judge: _this.judge,
            })
            .then(function (response) {
                var data = response.data;
                //_this.count = data.ress;
                _this.total = data.ress;
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
        },
      
        //页码部分
        pagechange: function(nowpages){
            var _this = this;
            _this.nowpage = nowpages;
            //父级调用子级方法
            this.$refs.child2.content(_this.nowpage); 
        },
    },
    mounted(){
        this.counts();
    }
};

</script>
<style lang="scss">
@import "../static/css/common.scss";
.work{
	padding-bottom: 60px;
	.pages{
		text-align: center;
		margin-top: 30px;
		ul{
			float: none;
			display: inline-block;
			li{
			    margin: 0 4px;
			    height: 36px;
			    min-width: 36px;
			    border-radius: 0px;
			    font-size: 14px;
			    line-height: 36px;
			}
		}
	}
}
</style>
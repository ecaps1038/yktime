 
import s from './myfunc.js';
import c from './common.js';

 export default{
    data(){
        return {
            total: 0,
            pages: 0,
            nowpage: 1,
            display: 8,
            judge: 4,
            path:1,
            //works:['摄影','插画','UI','平面','杂'],
        }
    },
     computed:{
        judges: function(){
            var _this = this;
            if(this.$route.params.id==1){
                return 4;
            }else if(this.$route.params.id==2){
                return 3;
            }
        },
    },
    methods:{
        //时间转换
        dtime: function(time){
            return s.changeTime2(time);
        },
        counts: function(){
            var _this = this;
            //_this.path=this.$route.path;
            _this.$axios.post(_this.GLOBAL.baseUrl+'/getCount', {
                judge: _this.judge,
            })
            .then(function (response) {
                var data = response.data;
                //_this.count = data.ress;
                _this.total = data.ress;
                //console.log(data.ress)
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
                //Router.push({path: '/'});
            });
        },
        //初始化
        content: function(num){
            var _this = this;
            _this.$axios.post(_this.GLOBAL.baseUrl+'/getData', {
                num:_this.nowpage,
                display: _this.display,
                judge: _this.judge,
            })
            .then(function (response) {
                var data = response.data;
                _this.articles = data.ress;
                _this.nowpage ++;
                //console.log(data.ress)
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
            _this.counts();
        },
        //详情页跳转
        detial: function(id){
            var _this = this;
            return c.detial(_this,id);
        },

        //页码部分
        pagechange: function(nowpages){
            var _this = this;
            _this.nowpage = nowpages;
            //父级调用子级方法
            this.$refs.child1.content(_this.nowpage); 
        },
    },
    mounted(){
        this.counts();
    }
}

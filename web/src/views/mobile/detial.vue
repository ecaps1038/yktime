<template>
    <div class="mobile-xq">
        <div class="mback">
    		<van-icon name="arrow-left"  @click="back"/>
        </div>
		 
	  	<van-skeleton
		:row="8"
		:loading="loading"
	    />  
        <div class="mdetial">
            <p class="name">{{detial.name}}</p>
            <div class="msg">
                    <span class="types">{{types[detial.types][detial.classlfy]}}</span>
                    <span class="tep">{{detial.tep}}</span>
                    <span class="time">{{dtime(detial.time)}}</span>
            </div>
            <div class="img">
                <van-image
                  width="100%"
                  height="100%"
                  fit="cover"
                  :src="GLOBAL.baseUrl+'/cover/'+detial.icon"
                />                
            </div>
            <p class="introduc">{{detial.introduc}}</p>
            <div class="content" ref="detailCont" v-html="detial.content"></div>
        </div>   
		<div class="mcomment">
            <p class="bt">评论<span>{{commentnum}}</span></p>      
        </div>	
    </div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import { Skeleton } from 'vant';
    import { Icon } from 'vant';
	import { Image } from 'vant';
	import { ImagePreview } from 'vant';
	import s from '../../static/js/myfunc.js';
	import c from '../../static/js/common.js';
	Vue.use(Skeleton);
	Vue.use(Image);
	Vue.use(ImagePreview);
    Vue.use(Icon);
    export default {
        data () {
            return {
                loading: true,
                types:[['摄影','插画','UI','平面','杂'],['我的故事','观点','非我']],
                detial: '',                                     //文章详情
                comment: '',                                    //评论
                comname:'',                                     //评论者
                num1: 10,                                       //限定评论名长度
                commentnum:'',                                  //评论数
                icons: 14,                                      //评论头像数
                icon: 1,                                        //当前头像
                show: false,
                abled: true,
                comlist: [],
                imgs: [],
            }
        },
        computed:{
            commentnb: function(){
                var _this = this;
                var num = s.getByteLen(_this.comname);
                return _this.num1-num;
            },
            upable: function(){
                var _this = this;
                if(_this.comment.length>0){
                    return _this.abled=false;
                }else{
                    return _this.abled = true;
                }
            },
             
        },
        methods:{
            dtime: function(num){
                return s.changeTime2(num);
            },
            //返回上一级
            back(){
                this.$router.go(-1);//返回上一层
            },
            //初始化
            primary: function(){
                var _this = this;
                _this.$axios.post(_this.GLOBAL.baseUrl+'/detial', {
                })
                .then(function (response) {
                    var tep = response.data.data.tep;
                    if(tep == 1){
                        var res = response.data.data.res;
                        _this.detial = res;
                        //console.log(_this.detial);
                        _this.loading = false;
                    }else if(tep == 0){
                        console.log('没有')
                    }
                    _this.commentcont();
                _this.commentlist();
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

            //获取评论列表
            commentlist: function(){
                var _this = this;
                _this.$axios.post(_this.GLOBAL.baseUrl+'/commentlist', {
                    workid: _this.workid,

                })
                .then(function (response) {
                    var data = response.data;
                    _this.comlist = data.ress;
                    //console.log(_this.comlist);
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
            },
            //获取评论数
            commentcont: function(){
                var _this = this;
                _this.$axios.post(_this.GLOBAL.baseUrl+'/getCommentCount', {
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
            //上传评论
            publish: function(){
                var _this = this,cname='匿名';
                if(_this.comname.length>0){
                    cname = _this.comname
                }
                _this.$axios.post(_this.GLOBAL.baseUrl+'/upcomment', {
                    workid: _this.workid,
                    comment: _this.comment,
                    name: cname,
                    icon: _this.icon,

                })
                .then(function (response) {
                    var tep = response.data.tep;
                    if(tep == 0){
                        //alert('评论成功！')
                        _this.commentlist();
                        _this.commentcont();
                        _this.comment='';
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
            },
            detia: function(data){
                return s.detiaTime(data);
            },
            //光标定位
            write: function(){
                document.getElementById("comment").focus(); 
            },
        },
        mounted:function(){this.primary();},
        updated() {
            //获取屏幕宽度
            //console.log(document.body.offsetWidth)
            this.imgs = this.$refs.detailCont.querySelectorAll("img");
            for (let i = 0; i < this.imgs.length; i++) {
              this.imgs[i].addEventListener("load", ele => {
                let e = ele || window.event;
                let target = e.target || e.srcElement;
                target.style.width = document.body.clientWidth+'px';
                //target.style.left = "-20px";
                
                });
            }
        },
        watch: {
            comname() {
                if (this.comname.length > this.num1) {
                    this.comname = String(this.comname).slice(0, this.num1);
                }
            }
        }
    };
</script>
<style lang="scss">
@import "../../static/css/common.scss";
  .mobile-xq{
  	padding: 0;
    .mback{
      padding: 16px;
      font-size: 24px;
      background: #fff;
    }
    .mdetial{
        background: #fff;
        .name{
            font-size:28px;
            font-weight:500;
            color:rgba(40,41,45,1);
            line-height:40px;
            width: 60%;
            padding-left: 20px;
        }
        .msg{
            padding: 12px 20px;
            .time{
                float: right;
            }
            span{
                color:rgba(40,41,45,0.4);
                font-size: 12px;
            }
            .types{
                color: #FE7F25;
                font-weight: bold;
                padding-right: 4px;
            }
        }
        .img{
            height: 240px;
            margin-top: 18px;
            margin-left: 20px;
            padding-left: 35px;
            background:rgba(242,242,242,1);
            border-radius:20px 0px 0px 20px;
            img{
                height: 240px;
                float: right;
                border-radius:20px 0px 0px 20px;
            }
        }
        .introduc{
            padding: 20px;
            @include fonts(14px,rgba(40,41,45,0.6),1.5);
            background:linear-gradient(180deg,rgba(81,83,89,0) 0%,rgba(40,41,45,0.06) 100%);

        }
        .content{
            padding: 20px;
            p{
                @include fonts(14px,rgba(40,41,45,1),1.5);
            }
            img{
                padding: 10px 0;
                margin-left: -20px;
                //width: 108%;
            }
        }
    }
    .mcomment{
        margin-top: 20px;
        padding: 0 20px;
        background: #fff;
        .bt{
            height: 48px;
            border-bottom: 1px solid rgba(40,41,45,0.1);
            @include fonts(14px,rgba(40,41,45,01),48px);
        }
    }
  }
</style>


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
                <!-- 这里有报错 -->
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
		<div class="mcomment" ref="mcom">
            <p class="bt">评论<span>{{commentnum}}</span></p>
            <ul>
                <li v-for="(list,index) in comlist">
                    <div class="icon">
                        <van-image
                          width="100%"
                          height="100%"
                          fit="cover"
                          :src="GLOBAL.baseUrl+'/avatar/'+list.icon"
                        />    
                    </div>
                    <div class="commm">
                        <p class="name">{{list.name}}</p>
                        <p class="time">{{detia(list.time)}}</p>
                        <p class="comment-con">{{list.comment}}</p>
                    </div>
                </li>
            </ul>
            <p>没有更多</p>  
        </div>	
        <div class="mupcomt">
            <div class="one" @click="show = !show">
                <img :src="GLOBAL.baseUrl+'/avatar/'+icon"/>
            </div>
            <van-cell-group>
              <van-field
                v-model="comment"
                type="textarea"
                placeholder="请输入留言"
                rows="1"
                autosize
                @keyup.enter="publish"
              />
            </van-cell-group>
            <div class="send" @click="publish"><img src="../../static/images/mobile/send.svg"/></div>
            <ul class="two" v-show="show">
                <li v-for="index in pharr" @click="getnb(index.filename)">
                    <img :src="GLOBAL.baseUrl+'/avatar/'+index.filename"/>
                </li>
            </ul>
        </div>
       
    </div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import { Skeleton } from 'vant';
    import { Icon } from 'vant';
	import { Image } from 'vant';
	import { ImagePreview } from 'vant';
    import { Field } from 'vant';
	import s from '../../static/js/myfunc.js';
	import c from '../../static/js/common.js';
	Vue.use(Skeleton);
	Vue.use(Image);
	Vue.use(ImagePreview);
    Vue.use(Icon);
    Vue.use(Field);
    export default {
        data () {
            return {
                loading: true,
                types:[['摄影','插画','UI','平面','杂'],['我的故事','观点','非我']],
                detial: '',                                     //文章详情
                comment: '',                                    //评论
                commentnum:'',                                  //评论数
                icon: '00.png',                                        //当前头像
                show: false,
                abled: true,
                comlist: [],
                imgs: [],
                pharr: [],
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
                    id:_this.$route.query.id,
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
                    //_this.commentcont();
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
                    _this.commentnum = data.ress.length;
                    //console.log(_this.comlist);
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
            },
            //上传评论
            publish: function(){
                var _this = this,cname='匿名';
                //console.log(_this.$refs.mcom.offsetTop+"高度");
                if(_this.comment!=''){
                    var data = {workid: _this.workid,
                        comment: _this.comment,
                        name: cname,
                        icon: _this.icon,
                        time: new Date(),
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
                            //_this.commentlist();
                            _this.comlist.unshift(data);
                            _this.commentnum++;
                            _this.comment='';
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert(error)
                    });  
                    //滚动到评论位置
                    document.documentElement.scrollTop = _this.$refs.mcom.offsetTop-350;         //直接给高度赋值,会调用needtotop方法
                    document.body.scrollTop = _this.$refs.mcom.offsetTop-350;              
                }
            },
            detia: function(data){
                return s.detiaTime(data);
            },
            //光标定位
            write: function(){
                document.getElementById("comment").focus(); 
            },
            //获取头像
            showPhoto: function(path){
                var _this = this;
                _this.$axios.post(_this.GLOBAL.baseUrl+'/showphoto', {path:'./data/avatar/'})
                .then(function (response) {
                    if(response.data.code === 200) {
                        _this.pharr = [];
                        var patt1 = /\.(\w+)/;
                        var ver = response.data.data;
                        //获取文件数
                        for(var i=0;i<ver.length;i++){
                            var aa = ver[i].filename.match(patt1)[1];
                            if(aa == 'jpg' || aa == 'png' || aa == 'jpeg'){
                                _this.pharr.push(ver[i]);
                            }
                        }
                        //console.log(_this.pharr);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
            },
        },
        mounted:function(){this.primary();this.showPhoto()},
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
            font-weight:bold;
            color:rgba(40,41,45,1);
            line-height:40px;
            width: 70%;
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
                color: $scolor;
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
            @include fonts(14px,rgba(40,41,45,1),48px);
        }
        ul{
            margin-bottom: 54px;
            li{
                padding: 20px 0;
                border-bottom: 1px solid rgba(40,41,45,0.1);
            }
            li:last-child{
                border-bottom: 0px;
            }
            .icon{
                float: left;
                @include w-h(40px,40px,#eee);
                overflow: hidden;
                border-radius: 50%;
            }
            .commm{
                padding-left: 50px;
                .name{
                    @include fonts(14px,rgba(40,41,45,.8),21px);
                }
                .time{
                    @include fonts(12px,#999,24px);
                }
                .comment-con{
                    padding-top: 10px;
                    @include fonts(14px,rgba(40,41,45,1),22px);
                }
            }
        }
    }
    .mupcomt{
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 100;
        padding: 8px 20px;
        border-top: 1px solid rgba(40,41,45,.06);
        .one{
            float: left;
            @include w-h(36px,36px,#eee);
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .van-hairline--top-bottom::after{
            border-width: 0;
        }
        .van-cell-group{
            margin: 0 46px;
            .van-cell{
                background: rgba(40,41,45,0.06);
                border-radius: 8px;
                padding: 6px 10px;
            }
        }
        .send{
            position: absolute;
            right: 20px;
            top: 10px;
            z-index: 100;
            @include w-h(32px,32px,#fff);
            img{
                width: 100%;
            }
        }
        .two{
            padding: 14px 0px;
            li{
                float: left;
                margin: 8px 5px;
                @include w-h-n(36px,36px);
                border-radius: 18px;
                overflow: hidden;
                cursor: pointer;
                //filter: grayscale(50%);
                //border: 1px solid rgba(0,0,0,0.14);
                img{width: 100%;}
            }
        }
    }
  }
</style>


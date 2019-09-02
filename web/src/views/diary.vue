<template>
    <div class="main diary">
        <div class="bdbg"></div>
        <!-- <div class="show" v-html="showimg"></div> -->
        <div class="detial-photo" :class="{'displays':photoclick}">
            <div class="ptbg"  @click="photoclick = false"></div>
            <i class="left" :style="{ 'background-image': 'url(' + require('../static/images/icon/left.svg') + ')'}" @click="clickleft(nowdiary)"></i>
            <i class="right" :style="{ 'background-image': 'url(' + require('../static/images/icon/right.svg') + ')'}"  @click="clickright(nowdiary)"></i>
            <div>
                <img :src="nowphoto">
            </div>
        </div>
        <div class="diary-div">
            <ul>
                <li v-for="(html,index) in htmls">
                    <p class="time">{{time(html.time)}}<span></span></p>
                    <div class="diary-tt">
                        <p class="title">{{html.title}}</p>
                        <p class="content" ><i></i><span v-html="html.content"></span></p>
                    </div>
                    <div class="imgs" v-if="html.imgs[0]!=''">
                        <div class="img" v-for="(img,indexs) in html.imgs">
                            <img :src="GLOBAL.baseUrl+'/diary/'+img" @click="detialPhoto(index,indexs)" ref="deimg">
                        </div>
                    </div>
                </li>
                <p class="tobt">{{tobottom}}</p>
            </ul>
            <div v-if="htmls.length == 0" class="kong">
                <img src="../static/images/kong.png">
                <p>这个人不知道忙什么去了～</p>
            </div>
        </div>
        <router-view></router-view>
    </div>
  
</template>
<script type="text/javascript">
    import s from '../static/js/myfunc.js';
    import c from '../static/js/common.js';

 export default{
    data(){
        return {
            htmls:[],
            showimg:'',
            imgs: [],
            nowphoto: '',                    //当前选择图片
            photoclick: false,               //点击照片
            photoindex: '',                  //点击照片当前排位
            nowdiary: '',                  //当前日志
            num: 1,
            display: 6,
            total: 12,
            tobottom:'',
            isbottom: false
        }
    },
    computed:{
        
    },
    methods:{
        time: function(num){
            return s.changeTime2(num);
        },
        icon: function(icon){
            var icons = icon.split(",");
            //console.log(icons)
            var img=[];
            //this.imgs=[];
            for(var i=0;i<icons.length;i++){
                img.push(this.GLOBAL.baseUrl+'/diary/'+icons[i]);
            }
            this.imgs.push(img);
            return img;
        },
        //大图展示
        bgimg: function(num){
            this.showimg='<div class="showbg"><img src="'+this.imgs[num]+'"></div>';
        },
        //点击图片预览
        detialPhoto: function(index,indexs){
            var _this = this;
            _this.nowphoto = _this.GLOBAL.baseUrl+'/diary/'+_this.htmls[index].imgs[indexs];
            _this.photoclick = true;
            _this.nowdiary = index;
            _this.photoindex = indexs;
        },
        //点击大图片切换
        clickleft: function(now){
            var _this = this;
            if(_this.photoindex>0){
                _this.photoindex --;
                _this.nowphoto = _this.GLOBAL.baseUrl+'/diary/'+_this.htmls[now].imgs[_this.photoindex];
            }
        },
        clickright: function(now){
            var _this = this;
            if(_this.photoindex<_this.htmls[now].imgs.length-1){
                _this.photoindex ++;
                _this.nowphoto = _this.GLOBAL.baseUrl+'/diary/'+_this.htmls[now].imgs[_this.photoindex];
            }
        },
        getDairy: function(){
            var _this = this;
            _this.$axios.post(_this.GLOBAL.baseUrl+'/getDairy',{
                num:_this.num,
                display: _this.display,
            })
            .then(function (response) {
                var data = response.data;
                if(data.ress.length>0){
                    _this.num++;
                    var html = data.ress;
                    //处理取出的数据
                    for(var i=0;i<html.length;i++){
                        html[i].imgs =  html[i].imgs.split(",");
                        html[i].content = html[i].content.replace(/[\r\n]/g, "</br>");
                    }
                    _this.htmls = _this.htmls.concat(html);
                }else{
                    _this.isbottom = true;
                }
                
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
                //Router.push({path: '/'});
            });
        },
        //加载更多
        morepage: function(){
            var _this = this;
            var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrolltop + window.innerHeight >= document.body.offsetHeight-100) {
                if(_this.isbottom){
                    _this.tobottom = "已到底部...";
                }else{
                    _this.tobottom = "";
                    //this.lotties = false;
                    this.getDairy();
                }
                
            }
        }
    },
    mounted:function(){
       this.getDairy();
       s.addEvent(window,'scroll',this.morepage);
    }
};

</script>
<style lang="scss">
@import "../static/css/common.scss";
    .bdbg{
        @include w-h(4px,1000px,#e0e0e0);
        position: fixed;
        right: 50%;
        top: 0;
        z-index: 1;
        margin-right: 370px;
    }
    .diary{
        width: 1080px;
        margin: 0 auto;
    }
    .diary-div{
        ul{
            padding-bottom: 60px;
        }
        li{
            position: relative;
            display: block;
            clear: both;
            padding-top: 28px;
        }
        .time{
            padding-right: 40px;
            margin-top: 46px;
            float: left;
            @include fonts(24px,#333,48px);
            span{
                position: absolute;
                left: 158px;
                top: 88px;
                z-index: 10;
                @include w-h(20px,20px,#ff7f26);
                border:4px solid #f3f3f3;
                border-radius:50%;
            }
        }
        .diary-tt{
            padding-left: 20px;
            float: left;
            .title{
               @include fonts(18px,#333,40px);
               font-weight: bold; 
            }
            .content{
                position: relative;
                @include fonts(14px,#333,24px);
                width: 600px;
                padding: 20px;
                background: #fff;
                i{
                    position: absolute;
                    left: -8px;
                    top: 22px;
                    @include w-h(16px,16px,#ffffff);
                    transform:rotate(45deg);
                    -ms-transform:rotate(45deg);     /* IE 9 */
                    -moz-transform:rotate(45deg);    /* Firefox */
                    -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
                    -o-transform:rotate(45deg); 
                }
            }
        }
        .imgs{
            float: left;
            padding: 40px 0 0 12px;
            width: 280px;
            .img{
                width: 80px;
                height: 80px;
                overflow: hidden;
                float: left;
                margin-left: 8px;
                margin-bottom: 8px;
                img{
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                }
            }
        }
    }
    //放大图片
    .displays{
        display:block !important;
    }
    .detial-photo{
        @include positions(fixed,0,0);
        @include w-h-n(100%,100%);
        z-index: 1001;
        display: none;
        .ptbg{
            @include w-h(100%,100%,rgba(0,0,0,0.9));
        }
        img{
            @include positions(absolute,0,0,0,0);
            margin: auto;
            max-width: 96%;
            max-height: 98%;
        }
        i{
            display: inline-block;
            z-index: 1;
            @include w-h-n(40px,40px);
            background-size: 100%;
            opacity: .2;
            cursor: pointer;
            &:hover{
                opacity: 0.6;
            }
        }
        .left{
            @include positions(absolute,46%,80px);
        }
        .right{
            @include positions(absolute,46%,auto,80px,auto);
        }
    }
    .tobt{
        @include fonts(14px,#ccc,40px,center);
        padding-top: 40px;
        clear: both;
    }
    .kong{
        @include w-h(100%,900px,#fff);
        position: absolute;
        top: 0px;
        img{
            width: 240px;
            margin: 0 auto;
            padding-top: 280px;
        }
        p{
            padding-top: 20px;
            @include fonts(24px,#cbccdc,40px,center);
            //font-weight: bold;
       }
   }
</style>
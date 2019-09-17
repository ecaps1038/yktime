<template>
    <div class="main about">
        <div class="banner" ref="banner" :style="banner">
            <div class="banner-out">
                <p class="back" @click="back">
                <i class="back-top"></i><i class="back-bot"></i>
                </p>
                <div class="play" :class="{two:!rot,one:rot}" @click="rotate"><span class="mu-l"></span><span class="mu-r"></span></div>
                <div class="mu-center">
                    <div class="mu-inner">
                        <div class="mu-img" :class="{rotate:rot}" :style="music">
                        </div>
                    </div>
                </div>
                <audio class="success" 
                    id="audio"
                    loop="loop"
                    ref="music"
                    :src="aaaa">
                </audio>
                <canvas id="cvs" class="cvs" width="520" height="240"></canvas>
            </div>
        </div>
        <div class="about-s">
            <div class="about-inner">
                <div class="left">
                    <p class="one">About me</p>
                    <p class="two">我大概收集的我</p>
                    <p class="three">这一刻算真实吗？哪段话是现在最真实的写照?<br/>我想这段话一定很美。</p>
                </div>
                <div class="right">
                    <div class="me">
                        <p>我火火，生于90年，家乡那是个山清水秀！我自认为我在一个最美的时代诞生。就如家乡的变化，小时候我住过泥墙瓦房，夏天屋里泥墙上一个一个洞的野蜂巢有蜂飞进飞出，泥墙底座是红砂石。无知的小孩在上面用硬石头刻满纹路。有人来家里弹棉花，我认真的看他弹棉花的每一个步骤。弹弓从棉花堆里面不过我是很无知的。但有人说那是真实</p>
                    </div>
                    <button class="more">看看更多</button>
                    <div class="me-p">
                        <ul>
                            <li v-for="im in ime"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="about-web">
            <div class="about-inner">
                <div class="left">
                    <p class="one web">About website</p>
                    <p class="two">我建立了个网站</p>
                    <p class="three">想到了就想实现，以后还留了个口，剩下的就往
                        <br/>这里填吧。</p>
                </div>
                <div class="right">
                    <div class="me">
                        <p>我火火，生于90年，家乡那是个山清水秀！我自认为我在一个最美的时代诞生。就如家乡的变化，小时候我住过泥墙瓦房，夏天屋里泥墙上一个一个洞的野蜂巢有蜂飞进飞出，泥墙底座是红砂石。无知的小孩在上面用硬石头刻满纹路。有人来家里弹棉花，我认真的看他弹棉花的每一个步骤。弹弓从棉花堆里面不过我是很无知的。但有人说那是真实</p>
                    </div>
                    <button class="more">看看更多</button>
                    <div class="me-p">
                       
                    </div>
                </div>
            </div>
        </div>
        <div class="reply">
            <div class="rep-inner">
                <p class="title">回复我</p>
                <p class="yuj">我愿当一个听者，听你们的想法和你说认识的我。</p>
                <div class="reply-main">
                    <div class="lefts">
                        <p class="zjhf">直接回复</p>
                        <el-input
                            type="textarea"
                            autosize
                            :placeholder="'朋友，你好...'"
                            v-model="reply"
                            id="reply"
                        >
                        </el-input>
                        <div class="t-name">
                            <span>朋友你是</span>
                            <el-input
                                type="textarea"
                                autosize
                                :placeholder="'微信/QQ/邮箱 你一定想让我知道你是谁...'"
                                v-model="fname"
                            >
                            </el-input>
                        </div>
                        <button :class="{publish,abled: upable}" @click="publish" :disabled="upable">留言</button>
                    </div>
                    <div class="next">
                        <p>1334785356@qq.com</p>
                        <img src="../static/images/about/weixin.png"/>
                    </div>
                    <div class="xl">
                        <img src="../static/images/about/xl.png"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- <p @click="getip">获取ip</p> -->
    </div>
</template>
<script type="text/javascript">
    import s from '../static/js/myfunc.js';
    import c from '../static/js/common.js';

    export default{
        data(){
            return {
                aaaa: require("../static/images/about/kan.mp3"),
                banner: {
                    backgroundImage: "url(" + require("../static/images/about/about.gif") + ") ",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                },
                music: {
                    backgroundImage: "url(" + require("../static/images/about/about.png") + ") ",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                },
                rot:false,
                ime: 4,
                reply: '',
                fname:'',
                abled: true,
            }
        },
         computed:{
            upable: function(){
                var _this = this;
                if(_this.reply.length>0){
                    return _this.abled=false;
                }else{
                    return _this.abled = true;
                }
            },
        },
        methods:{
            getip: function(){
              var _this = this;
                _this.$axios.get(_this.GLOBAL.baseUrl+'/toip',{
                    
                })
                .then(function (response) {
                    var data = response.data;
                    alert(data.tep);
                    
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error);
                    //Router.push({path: '/'});
                });
            },
            back: function(){
                window.history.go(-1);
            },
            //旋转控制&音乐控制
            rotate: function(){
                if(this.rot){
                    this.rot = false;
                    this.music. backgroundImage = "url(" + require("../static/images/about/about.png") + ") ";
                }else{
                    this.rot = true;
                    this.music. backgroundImage = "url(" + require("../static/images/about/about.gif") + ") ";
                }
                if(this.$refs.music.paused){
                    this.$refs.music.play();
                }else{
                    this.$refs.music.pause();
                }
                this.playAudio();
            },
            //音乐控制
            playAudio: function(){
                if( typeof window.AudioContext != 'undefined' ) {

                    //var audio = this.$refs.music;
                    var audio = document.getElementById('audio');
                    var ctx = new AudioContext();
                    var analyser = ctx.createAnalyser();
                    var audioSrc = ctx.createMediaElementSource(audio);
                    audioSrc.connect(analyser);
                    analyser.connect(ctx.destination);
                    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
                    var cvs = document.getElementById('cvs');
                    // cvs.width = 800;
                    // cvs.height = 300;
                    var cwidth = cvs.width,
                        cheight = cvs.height,
                        meterWidth = 8, //柱宽
                        gap = 12, //柱间距
                        capHeight = 4,  //顶子的高度
                        capStyle = 'rgba(255,255,255,0.4)',
                        meterNum = 100, //count of the meters
                        capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
                    ctx = cvs.getContext('2d');
                    // loop
                    function renderFrame() {
                        var array = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(array);
                        var step = Math.round(array.length / meterNum); //sample limited data from the total array
                        ctx.clearRect(0, 0, cwidth, cheight);
                        for (var i = 0; i < meterNum; i++) {
                            var value = array[i * step];
                            if (capYPositionArray.length < Math.round(meterNum)) {
                                capYPositionArray.push(value);
                            };
                            ctx.fillStyle = capStyle;
                            //draw the cap, with transition effect
                            if (value < capYPositionArray[i]) {
                                ctx.fillRect(i *(meterWidth+gap), cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                            } else {
                                ctx.fillRect(i *(meterWidth+gap), cheight - value, meterWidth, capHeight);
                                capYPositionArray[i] = value;
                            };
                            ctx.fillStyle = 'rgba(255,255,255,0.2)'; //set the filllStyle to gradient for a better look
                            ctx.fillRect(i *(meterWidth+gap), cheight - value + capHeight, meterWidth, cheight); //the meter
                        }
                        requestAnimationFrame(renderFrame);
                    }

                    renderFrame();
                    audio.play();
                    
                }
            },
            //上传回信
            publish: function(){
                var _this = this,fname='匿名';
                if(_this.fname.length>0){
                    fname = _this.fname;
                }
                _this.$axios.post(_this.GLOBAL.baseUrl+'/reply', {
                    replys: _this.reply,
                    name: fname,
                })
                .then(function (response) {
                    var tep = response.data.tep;
                    if(tep == 0){
                        _this.$message({
                            message: '您的回复已送达，感谢您的回复！',
                            type: 'success'
                        });
                        _this.reply='';
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
        },
        mounted(){
            this.$refs.banner.style.height = window.innerHeight + 'px';
        }
    };
</script>
<style lang="scss">
    @import "../static/css/common.scss";
    .about{
        padding: 0;
        padding-top: 0 !important;
        background: #fff;
    }
    .banner-out{
        position: relative;
        width: 100%;
        height: 100%;
        background: rgba(21,21,24,0.9);
        .play{
            @include w-h-n(320px,320px);
            position: absolute;
            top: 220px;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 100;
            &:hover span{
                background-color: rgba(255,255,255,.5)
            }
            span{
                @include w-h(10px,52px,rgba(255,255,255,0.2));
                position: absolute;
                border-radius: 5px;
                transition: all 0.3s;
            }
        }
        .one{
            .mu-l{
                top: 136px;
                left: 138px;
            }
            .mu-r{
                top: 136px;
                left: 168px;
            }
        }
        .two{
            .mu-l{
                 top: 122px;
                left: 160px;
                transform:rotate(-50deg);
            }
            .mu-r{
               top: 150px;
                left: 160px;
                transform:rotate(50deg);
            }
        }
        .back{
            position: absolute;
            top: 28px;
            left: 20px;
            height: 40px;
            width: 48px;
            cursor: pointer;
            &:hover i{
                background-color: rgba(255,255,255,.8)
            }
            &:hover .back-top{
                transform:rotate(-40deg);
            }
            &:hover .back-bot{
                transform:rotate(40deg);
            }
        }
        i{
            @include w-h(24px,4px,rgba(255,255,255,0.2));
            position: absolute;
            left: 10px;
            border-radius: 2px;
            transition: all 0.3s;
        }
        .back-top{
            top: 10px;
        }
        .back-bot{
            top: 23px;
        }
        .mu-center{
            @include w-h(356px,356px,rgba(255,255,255,0.04),block);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 50%;
            position: absolute;
            top: 200px;
            left: 0;
            right: 0;
            margin: auto;
        }
        .mu-inner{
            @include w-h(320px,320px,rgba(0,0,0,0.2));
            border-radius: 50%;
            position: absolute;
            top: 18px;
            left: 0;
            right: 0;
            margin: auto;
        }
        .mu-img{
            @include w-h-n(296px,296px);
            border-radius: 50%;
            position: absolute;
            top: 12px;
            left: 0;
            right: 0;
            margin: auto;
        }
        @keyframes meng{
            0%{transform:rotate(0deg) scale(1,1);}
            100%{transform:rotate(360deg) scale(1,1);}
        }   
        .rotate{
            animation:meng 40s infinite linear;
        }
        .cvs{
            position: absolute;
            left: 0;
            right: 0;
            top: 560px;
            margin: auto;

        }
    }
    .about-s , .about-web{
        @include w-h-n(1200px,auto);
        padding: 88px 0;
        margin: 0 auto;
        clear: both;
        .about-inner{
            clear: both;
        }
        .left{
            float: left;
        }
        .right{
            float:right;
            width: 766px;
        }
        .one{
            @include fonts(65px,rgba(43,43,46,0.1),65px);
        }
        .web{
            margin-left: -136px;
        }
        .two{
            @include fonts(42px,rgba(43,43,46,1),48px);
        }
        .three{
            padding-top: 10px;
            @include fonts(14px,rgba(43,43,46,.6),24px);
        }
        .me{
            p{
                @include fonts(14px,#333,24px);
            }
        }
        .more{
            margin-top: 20px;
            float: right;
            border: 0px;
            background: rgba(43,43,46,.9);
            padding: 0 12px;
            @include fonts(14px,#fff,28px); 
            &:hover{
                background: rgba(43,43,46,1);
            }
        }
        .me-p{
            //height: 280px;
            padding-top: 40px;
            clear: both;
            li{
                @include w-h(244px,244px,#ddd);
                margin-right: 10px;
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
    .reply{
        clear: both;
        margin-top: 200px;
        height: 640px;
        background: #f8f8f8;
        .rep-inner{
            @include w-h-n(1200px,640px);
            margin: 0 auto;
            padding: 80px 0;
        }
        .title{
            font-size: 42px;
        }
        .yuj{
            @include fonts(14px,rgba(43,43,46,.6),24px);
        }
        .lefts{
            width: 750px;
            float: left;
            margin-top: 20px;
            .zjhf{
                @include fonts(16px,rgba(43,43,46,1),42px);
            }
            textarea{
                @include input(100%);
                height: 42px;
                background: #fff;
                border: 1px solid #dddddd;
                border-radius: 4px;
                padding-left: 10px;
                line-height: 42px;
                line-height: 20px;
                padding-top: 10px;
                padding-bottom: 10px;
                resize: none;
            }
            #reply{
                height: 240px !important;
            }
            .t-name{
                float: left;
                padding-top: 16px;
                height: 60px;
                span{
                    @include fonts(14px,#333,42px);
                    float: left;
                    padding-right: 6px;
                }
                .el-textarea{
                    float: left;
                    width: 200px;
                    display: inline-block;
                }
                textarea{
                    width: 400px;
                    height: 42px;
                    vertical-align: middle;
                }
            }
            button{
                @include w-h-n(120px,42px);
                border-radius: 4px;
                line-height: 42px;
                border-width: 1px;
                cursor: pointer;
            }
            .publish{
                float: right;
                margin-top: 16px;
                background:  $scolor;
                border-color: $scolor;
                cursor: pointer;
                opacity: 0.9;
                color: #fff;
                &:hover{
                    opacity: 1;
                }
            }
            .abled{
                background: #bbb !important;
                border-color: #bbb !important;
                cursor: default;
            }
        }
        .next{
            float: left;
            padding: 60px 0 0 40px;
            img{
                padding-left: 10px;
                width: 170px;
            }
            p{
                @include fonts(18px,rgba(43,43,46,1),42px);
                padding-bottom: 20px;
            }
        }
        .xl{
            float: left;
            padding:140px 0 0 80px;
            img{
                width: 120px;
            }
        }
    }
</style>
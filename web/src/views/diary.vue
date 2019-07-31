<template>
    <div class="main diary">
        <div class="bdbg"></div>
        <div class="diary-div">
            <ul>
                <li v-for="html in htmls">
                    <p class="time">{{time(html.time)}}<span></span></p>
                    <div class="diary-tt">
                        <p class="title">{{html.title}}</p>
                        <p class="content">{{html.content}}</p>
                    </div>
                    <div class="imgs" v-html="icon(html.imgs)"></div>
                </li>
            </ul>
        </div>
    </div>
  
</template>
<script type="text/javascript">
    import s from '../static/js/myfunc.js';
    import c from '../static/js/common.js';

 export default{
    data(){
        return {
            htmls:'',
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
            console.log(icons)
            var imgs='';
            for(var i=0;i<icons.length;i++){
                imgs +='<div class="img"><img src="http://127.0.0.1:4040/diary/'+icons[i]+'"></div>';
            }
            return imgs;
        },
        getDairy: function(){
            var _this = this;
            _this.$axios.post('http://127.0.0.1:4040/getDairy')
            .then(function (response) {
                var data = response.data;
                _this.htmls = data.ress;
                console.log(data.ress)
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
                //Router.push({path: '/'});
            });
        }
    },
    mounted(){
       this.getDairy();
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
            padding-bottom: 200px;
        }
        li{
            position: relative;
            display: block;
            clear: both;
            padding-top: 28px;
        }
        .time{
            padding-right: 40px;
            margin-top: 40px;
            float: left;
            @include fonts(24px,#333,48px);
            span{
                position: absolute;
                left: 158px;
                top: 82px;
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
                @include fonts(14px,#333,24px);
                width: 600px;
                padding: 20px;
                background: #fff;
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
                    width: 200%;
                }
            }
        }
    }
</style>
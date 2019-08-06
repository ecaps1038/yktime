<template>
  <!-- <el-carousel :interval="4000" type="card" height="900px">
    <el-carousel-item v-for="item in 6" :key="item">
     <img :src="'http://127.0.0.1:4040/cs/'+item+'.png'"/>
    </el-carousel-item>
  </el-carousel> -->
  <div class="main">
    <p @click="getip">获取ip</p>
  </div>
</template>
<script type="text/javascript">
  import s from '../static/js/myfunc.js';
  import c from '../static/js/common.js';

 export default{
    data(){
        return {
        }
    },
     computed:{
    },
    methods:{
        getip: function(){
          var _this = this;
            _this.$axios.get('http://127.0.0.1:4040/toip',{
                
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
        }
    },
    mounted(){
       
    }
};

</script>
<style>
.el-carousel__item{
  padding-top: 60px;
}
  .el-carousel__item img {
    width: 100%;
  }
  
  /*.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }*/
</style>
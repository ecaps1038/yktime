<template>
  <div class="main home">
  	<div class="banner" :style="note">
  		<div class="bn-iner">
  			<p class="title" :style="suiy"></p>
  			<p class="some" v-html="msg"></p>
  		</div>
  	</div>
    <div class="content">
      <!-- <p @click="mobile">详情页测试调整</p> -->
        <ul>
            <li v-for="html in htmls">
                <section class="cont-inf">
                    <div class="icon">
                        <img v-if="html.types == '0'" src="../static/images/icon/artic.png">
                        <img v-else-if="html.types == '1'" src="../static/images/icon/design.png">
                        <img v-else-if="html.types == '2'" src="../static/images/icon/photograp.png">
                        <img v-else-if="html.types == '3'" src="../static/images/icon/note.png">
                    </div>
                    <p class="date">{{dtime(html.time)}}</p>
                    <div class="introduce-div">
                      <a class="title"  href="/detial" target="_blank" @click="detials(html._id)">{{html.name}}</a>
                      <p class="introduce">{{html.introduc}}</p>
                    </div>
                </section>
                <div class="photo-div">
                    <a class="photo-img-div" href="/detial" target="_blank"  @click="detials(html._id)">
                        <img :src="GLOBAL.baseUrl+'/cover/'+html.icon" class="photo-img"/>
                    </a>
                </div>
            </li>
        </ul>
    </div>
    <!-- <router-link to="/hello">Goto Ap</router-link> -->
     <router-view></router-view>
     <lottie :options="defaultOptions" :height="160" :width="200" v-on:animCreated="handleAnimation" :class="{lottie:lotties}"/>
     <p class="bottoms">{{tobottom}}</p>
  </div>
</template>
<script type="text/javascript" src="../static/js/home.js"></script>
<style lang="scss">
	@import "../static/css/home.scss";
</style>
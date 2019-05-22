<template>
  <div class="main">
  	<div class="banner" :style="note">
  		<div class="bn-iner">
  			<p class="title" :style="suiy"></p>
  			<p class="some" v-html="msg"></p>
  		</div>
  	</div>
    <div class="content">
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
                      <p class="title">{{html.name}}</p>
                      <p class="introduce">{{html.introduc}}</p>
                    </div>
                </section>
                <div class="photo-div">
                    <div class="photo-img-div">
                        <img :src="'http://127.0.0.1:4040/cover/'+html.icon" class="photo-img"/>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <!-- <router-link to="/hello">Goto Ap</router-link> -->
  </div>
</template>
<script type="text/javascript" src="../static/js/home.js"></script>
<style lang="scss">
	@import "../static/css/home.scss";
</style>
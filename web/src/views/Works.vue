<template>
  <div class="main work">
    <!-- <div class="work-content">
        <ul>
        	<li v-for=" (rem, index) in  articles">
        		<a class="photo-img-div" href="/detial" target="_blank"  @click="detial(rem._id)">
                    <img :src="'http://127.0.0.1:4040/cover/'+rem.icon" class="photo-img"/>
                </a>
                <div class="introduce-div">
                  <a class="title"  href="/detial" target="_blank" @click="detial(rem._id)">{{rem.name}}</a>
                  <p class="introduce">{{rem.introduc}}</p>
                </div>
                <div class="work-other">
                	<p class="type"><span>{{works[rem.classlfy]}}</span>
						<span class="fen">/</span>
						<span class="fenge">{{rem.tep}}</span>
					</p>
                	<p class="dates">{{dtime(rem.time)}}</p>
                </div>
        	</li>
        </ul>
        <div class="clear"></div>
    </div> -->
    <router-view name="workMd" :nowpage='nowpage' :display="display" :judge="judge"  :path="path"  ref="child1"></router-view>
    <router-view name="pages" :total="total" :nowpage='nowpage' :display="display" @pagechange="pagechange"></router-view>
    <!-- <router-link to="/hello">Goto Ap</router-link> -->
  </div>
</template>
<script type="text/javascript" src="../static/js/work.js"></script>
<style lang="scss">
	@import "../static/css/works.scss";
</style>
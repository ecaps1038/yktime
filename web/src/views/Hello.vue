<template>
  <div class="main">
    <h1>{{ msg }}</h1>
     <!-- <router-link to="/">Goto App</router-link> -->
     <router-link to="/test">Goto Test</router-link>
    <p class="aaa" v-on:click="aaa">我点</p>
    <p class="aaa" v-on:click="testout">外部</p>
    <ul>
    	<li v-for="arrs in arr">
    		<p>{{arrs.id}}</p>
    		<p>{{arrs.name}}</p>
    		<p>{{arrs.email}}</p>
    		<p>{{arrs.sex}}</p>
    		<img :src="arrs.img">
    	</li>
    </ul>
  </div>
</template>
<script type="text/javascript" src="../static/js/hello.js"></script>
<style lang="scss">
  @import "../static/css/hello.scss";
</style>


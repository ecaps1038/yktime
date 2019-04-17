<template>
  	<div class="main">
    	<label>用户名</label><input type="text" value="" placeholder="用户" v-model="name">
    	<label>密码</label><input type="password" value="" placeholder="密码" v-model="psw">
    	<button class="submit" v-on:click="submit">登陆</button>
    	<p>{{returns}}</p>
	</div>
</template>
<script type="text/javascript" src="../../static/js/admin/login.js"></script>
<!--<style lang="scss">
  @import "../static/css/hello.scss";
</style> -->
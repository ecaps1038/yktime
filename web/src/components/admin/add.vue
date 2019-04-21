<template>
    <div>
		<div class="header">
			<div class="logo"><router-link to="/home" :style="note"></router-link></div>
			<div class="user">
				<div class="user-inner">
					<router-link to="/manage" v-html="user"></router-link>
				</div>
			</div>
		</div>
		<router-view></router-view>
		<footer>
				<div></div>
		</footer>
    </div>
</template>
<script type="text/javascript" src="../../static/js/admin/add.js"></script>
<style lang="scss">
    @import "../../static/css/nav.scss";
</style>
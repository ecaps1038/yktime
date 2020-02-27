<template>
    <div>
		<div class="aside">
			<div class="user">
				<i v-if="news" class="news"></i>
				<div class="user-img"><img :src="imgurl"></div>
				<p class="name">{{name}}</p>
				<p class="slogan">感谢您的陪伴～</p>
			</div>
			<ul class="nav">
				<li v-for="(nav,index) in navs" @click="selected(index)">
				<router-link :to="nav.path" >
					<svg class="icon" aria-hidden="true">
					    <use :xlink:href="nav.icon"></use>
					</svg>{{nav.name}}
				</router-link>
			</li>
			</ul>
			<div class="logo"><router-link to="/" :style="note"></router-link></div>
		</div>
		<div class="manage-right">
	    	<div class="to-bar">
	    		<div class="left">
	    			<svg class="title-icon" aria-hidden="true">
						<use :xlink:href="icon"></use>
					</svg>
					<span>{{title}}</span>
	    		</div>
	    		<div class="right">
	    			<svg class="add-icon" aria-hidden="true">
						<use xlink:href="#icon-add"></use>
					</svg>
	    		</div>
	    	</div>
	    	<div class="manage-view">
		        <router-view class="manage-main"></router-view>
		    </div>
		</div>
    </div>
</template>
<script type="text/javascript" src="../../static/js/admin/manage.js"></script>
<style lang="scss">
    @import "../../static/css/admin/manage.scss";
</style>

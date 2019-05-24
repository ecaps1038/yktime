<template>
  	<div class="total">
    	<div class="top-div">
    		<div class="aut-img">
    			<img :src="imgurl"/>
    		</div>
    		<p class="tep">{{tep}}</p>
    	</div>
    	<div class="data-total">
    		<div class="data out">
    			<div class="all">
    				<p class="title">付出</p>
    				<p class="all-data">{{outsum}}</p>
    			</div>
    			<ul>
    				<li v-for="(nav,index) in navs">
    					<svg class="title-icon" aria-hidden="true">
							<use :xlink:href="nav.icon"></use>
						</svg>
						<p>{{nav.num}}</p>
                        <a :style="note" @click="createdb(index)">
						<svg class="add-icon" aria-hidden="true">
							<use xlink:href="#icon-add"></use>
						</svg>
                        </a>
    				</li>
    			</ul>
    		</div>
    		<div class="data in">
    			<div class="all">
    				<p class="title">收获</p>
    				<p class="all-data">{{insum}}</p>
    			</div>
    			<ul>
    				<li v-for="nav in innavs">
						<p>{{nav.num}}</p>
						<span>{{nav.name}}</span>
    				</li>
    			</ul>
    		</div>
    	</div>
	</div>
</template>
<script type="text/javascript" src="../../static/js/admin/total.js"></script>
<style lang="scss">
    @import "../../static/css/admin/total.scss";
</style>

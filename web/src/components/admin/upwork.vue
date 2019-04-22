<template>
    <div class="upwork main">
    	<div class="inner">
			<div class="inform">
				<p class="inf-title">文章信息</p>
				<div class="inf-input">
					<div class="input">
						<i></i>
						<input type="text" name="title" placeholder="文章标题" v-model="title">
						<span class="num">{{numchange}}</span>
						<span class="tx">请填写</span>
					</div>
					<div class="input">
						<i></i>
						<input type="text" name="title" placeholder="文章标题" v-model="title">
						<input type="text" name="title" placeholder="标签以空格隔开" v-model="label"> 
					</div>
					<div class="input">
						<i></i>
						<input type="text" name="title" placeholder="文章简介" v-model="intro">
						<span class="num">{{num2}}</span>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script type="text/javascript" src="../../static/js/admin/upwork.js"></script>
<style lang="scss">
    @import "../../static/css/admin/upwork.scss";
</style>

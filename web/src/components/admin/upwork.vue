<template>
    <div class="upwork main">
    	<div class="inner">
			<div class="inform">
				<p class="inf-title">{{just}}信息</p>
				<div class="inf-input">
					<div class="input">
						<i class="tp"></i>
						<input type="text" name="title" :placeholder="just+'标题'" v-model="title">
						<span class="num">{{numchange}}</span>
						<span class="tx">请填写</span>
					</div>
					<div class="select">
						<i class="tp"></i>
						<el-select v-model="value" :placeholder="just+'分类'">
						    <el-option
							    v-for="item in options"
							    :key="item.value"
							    :label="item.label"
							    :value="item.value">
						    </el-option>
						</el-select>
						<input type="text" name="title" placeholder="标签以“,”或空格隔开" v-model="label" class="label"> 
					</div>
					<div class="input">
						<i class="tp"></i>
						<input type="text" name="title" :placeholder="just+'简介'" v-model="intro">
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

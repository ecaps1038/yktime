<template>
    <div class="upwork main">
    	<div class="inner">
			<div class="inform">
				<p class="inf-title">{{just}}信息</p>
				<div class="inf-input">
					<div class="input">
						<i class="tp"></i>
						<input type="text" name="title" :placeholder="just+'标题'" v-model="title">
						<span class="num">{{titlechange}}</span>
						<span class="tx">{{titlea}}</span>
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
						<span class="tx">{{selecta}}</span>
					</div>
					<div class="input">
						<i class="tp"></i>
						<el-input
						  type="textarea"
						  autosize
						  :placeholder="just+'简介'"
						  v-model="intro">
						</el-input>
						<span class="num">{{introchange}}</span>
						<span class="tx">{{introa}}</span>

					</div>
				</div>
			</div>
			<div class="inform">
				<p class="inf-title">编辑{{just}}</p>
				<div class="inf-num">
					<div id="div3"></div>
					<i class="tp"></i>
					<iframe name="ifm" id="fwbFrame" frameborder="0" scrolling="no" src="http://127.0.0.1:4040/one"></iframe>
				</div>
			</div>
			<div class="inform last-inf">
				<p class="inf-title">上传封面</p>
				<div class="inf-photo">
					<i class="tp"></i>
					<div class="up-cover">
						<div  class="file-input">
	                        <input type="file" name="file" id="file" multiple="multiple" ref="aaa" @change="eimg">
	                       	<p>修改图片</p>
	                    </div>
	                    <img :src="src">
	                    <!-- <button id="upload" @click="eaimg">上传</button> -->
					</div>
					<p class="tx">{{photoa}}</p>
				</div>
			</div>
			<div class="btn-div">
				<button class="publish" @click="publish">发布</button>
				<button class="preview">预览</button>
			</div>
		</div>
    </div>
</template>
<script type="text/javascript" src="../../static/js/admin/upwork.js">
</script>
<style lang="scss">
    @import "../../static/css/admin/upwork.scss";
    //@import "../../static/css/fwb.scss";
</style>

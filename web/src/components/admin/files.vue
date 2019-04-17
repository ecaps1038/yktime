<template>
  	<div class="main files">
    	<ul class="files-nav">
			<li v-for="(nav,index) in navs" @click="selected(index)">
                <a :class="{ selectcss:changes == index}">
                    {{nav.name}} {{nav.num}}
                </a>
			</li>
		</ul>
        <div class="file-main">
            <div class="title">
                <div class="up">
                    <div  class="file-input">
                        <input type="file" name="file" id="file" multiple="multiple">
                    </div>
                    <button id="upload" v-on:click="uploadFile">上传</button>
                </div>
            </div>
            <div class="fworks">
                <ul>
                    <li v-for="ph in pharr">
                        <img :src="spath+fpath+ph.filename">
                    </li>
                </ul>
            </div>
        </div>
	</div>
</template>
<script type="text/javascript" src="../../static/js/admin/files.js"></script>
<style lang="scss">
  @import "../../static/css/admin/files.scss";
</style>
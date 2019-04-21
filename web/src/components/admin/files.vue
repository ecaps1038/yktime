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
                <div class="selects">
                    <span>已选择{{num}}个文件</span>
                    <span class="quxiao" @click="cancel()">取消</span>
                </div>
                <div class="up">
                    <div  class="file-input">
                        <input type="file" name="file" id="file" multiple="multiple" ref="aaa">
                    </div>
                    <button id="upload" v-on:click="uploadFile">上传</button>
                </div>
                <p class="shanchu" @click="delfiles()">删除已选</p>
            </div>
            <div class="fphotos" >
                <ul>
                    <li v-for="(ph,index) in pharr">
                        <div class="img" :class="{'bg':selectFile[index]}"><img :src="spath+fpath+ph.filename" @click="detialPhoto(index)"></div>
                        <p class="name">{{ph.filename}}</p>
                        <i class="delete" :style="{ 'background-image': 'url(' + require('../../static/images/icon/shanchu.svg') + ')'}" @click="delfile(index)"></i>
                        <i class="select" :style="{ 'background-image': 'url(' + require('../../static/images/icon/select.png') + ')'}" @click="selectfile(index)" :class="{'bg':selectFile[index]}"></i>
                    </li>
                </ul>
                <div style="clear:both"></div>
            </div>
        </div>
        <div class="detial-photo" :class="{'displays':photoclick}">
            <div class="ptbg"  @click="photoclick = false"></div>
            <i class="left" :style="{ 'background-image': 'url(' + require('../../static/images/icon/left.svg') + ')'}" @click="clickleft"></i>
            <i class="right" :style="{ 'background-image': 'url(' + require('../../static/images/icon/right.svg') + ')'}"  @click="clickright"></i>
            <div>
                <img :src="nowphoto">
            </div>
        </div>
	</div>
</template>
<script type="text/javascript" src="../../static/js/admin/files.js"></script>
<style lang="scss">
  @import "../../static/css/admin/files.scss";
</style>
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
    				<li v-for="(nav,index) in innavs">
						<p @click="draw(index)">{{nav.num}}</p>
						<span>{{nav.name}}</span>
    				</li>
    			</ul>
    		</div>
    	</div>
        <el-drawer
            :title="title"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose"
            >
            <div class="replys">
                <ul>
                    <li v-for="(num,index) in replys">
                        <div class="reply-right">
                            <p class="top">{{num.name}}<span>{{detia(num.time)}}</span></p>
                            <p class="reply-m">{{num.replys}}</p>
                            <p class="delete" @click="deleteCoR(num._id,index,0)">删除</p>
                        </div>
                    </li>
                    <p @click= "getReply" class="combott">{{comentclick}}</p>
                </ul>
            </div>
        </el-drawer> 
        <el-drawer
            :title="title"
            :visible.sync="drawer1"
            :direction="direction"
            :before-close="handleClose"
          >
          <div class="comments">
              <ul>
                    <li v-for="(num,index) in comments">
                        <div class="img">
                            <img :src="'http://127.0.0.1:4040/user/tx'+num.icon+'.png'"/>
                        </div>
                        <div class="comment-right">
                            <p class="top">{{num.name}}<span>{{detia(num.time)}}</span></p>
                            <p class="comment-m">{{num.comment}}</p>
                            <a class="artic" href="/detial" target="_blank" @click="detial(num.worksID._id)" v-if="num.worksID != null">{{num.worksID.name}}</a>
                            <p class="noartic" v-if="num.worksID == null">文章已删除</p>
                            <p class="delete" @click="deleteCoR(num._id,index,1)">删除</p>
                        </div>
                    </li>
                    <p @click="getcomment" class="combott">{{comentclick}}</p>

              </ul>
          </div>
        </el-drawer>
	</div>
</template>
<script type="text/javascript" src="../../static/js/admin/total.js"></script>
<style lang="scss">
    @import "../../static/css/admin/total.scss";
</style>

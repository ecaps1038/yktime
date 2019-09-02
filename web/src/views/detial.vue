<template>
    <div class="main detial">
		<div class="title">
			<div class="inner">
				<p class="name">{{name}}</p>
				<p class="time">{{time}}</p>
				<div class="inner-bt">
					<div class="classlfy">
						<span>{{classlfy}}</span>
						<span class="fenge">/</span>
						<span>{{tep}}</span>
					</div>
					<div class="see">
						<svg class="title-icon" aria-hidden="true">
							<use xlink:href="#icon-chakan"></use>
						</svg>
						<span>{{times}}</span>
						<svg class="title-icon" aria-hidden="true">
							<use xlink:href="#icon-comment"></use>
						</svg>
						<span>{{commentnum}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="introduc">
			<p class="introduc-p">{{introduc}}</p>
		</div>
		<div class="contain">
			<div class="inner" ref="detailCont" v-html="content">
			</div>
		</div>
		<div class="comment">
			<div class="inner">
				<p class="bt">评论<span>{{commentnum}}</span></p>
				<el-input
					type="textarea"
					autosize
					:placeholder="'想说些什么呢...'"
					v-model="comment"
					id="comment"
				>
				</el-input>
				<div class="t-name">
					<span>朋友你是</span>
					<el-input
						type="textarea"
						autosize
						:placeholder="'你一定想让我知道你是谁...'"
						v-model="comname"
					>
					</el-input>
					<div class="comicon">
						<div class="one" @click="show = !show">
							<img :src="GLOBAL.baseUrl+'/user/tx'+icon+'.png'"/>
						</div>
						<transition name = "fade">
							<ul class="two" v-show="show">
								<li v-for="index in icons" @click="getnb(index)">
									<img :src="GLOBAL.baseUrl+'/user/tx'+index+'.png'"/>
								</li>
							</ul>
						</transition>
					</div>
				</div>
				<button :class="{publish,abled: upable}" @click="publish" :disabled="upable">评论</button>
			</div>
			<div class="commentlist">
				<ul>
					<li v-for="(list,index) in comlist">
						<div class="icon">
							<img :src="GLOBAL.baseUrl+'/user/tx'+list.icon+'.png'"/>
						</div>
						<div class="commm">
							<p class="name">{{list.name}}<span>{{detia(list.time)}}</span></p>
							<p class="comment-con">{{list.comment}}</p>
						</div>
					</li>
				</ul>
				<div class="write">
					<p @click="write">
						<svg class="bi-icon" aria-hidden="true">
							<use xlink:href="#icon-bi"></use>
						</svg>
						<span>写评论</span>
					</p>
				</div>
			</div>
		</div>
		<router-view></router-view>
    </div>
</template>
<script type="text/javascript" src="../static/js/detial.js"></script>
<style lang="scss">
  @import "../static/css/detial.scss";
</style>

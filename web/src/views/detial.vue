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
			<div class="inner" v-html="content">
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
							<img :src="'http://127.0.0.1:4040/user/tx'+icon+'.png'"/>
						</div>
						<transition name = "fade">
							<ul class="two" v-show="show">
								<li v-for="index in icons" @click="getnb(index)">
									<img :src="'http://127.0.0.1:4040/user/tx'+index+'.png'"/>
								</li>
							</ul>
						</transition>
					</div>
				</div>
				<button :class="{publish,abled: upable}" @click="publish" :disabled="upable">评论</button>
			</div>
			<div class="commentlist">
				<ul>
					<li v-for="list in comlist">
						<p>{{list.comment}}</p>
						<p>时间：{{detia(list.time)}}</p>
					</li>
				</ul>
			</div>
		</div>
    </div>
</template>
<script type="text/javascript" src="../static/js/detial.js"></script>
<style lang="scss">
  @import "../static/css/detial.scss";
</style>

<template>
  	<div class="main fworks">
    	<div class="works">
	 		<ul>
	            <li v-for="html in htmls">
	            	<div class="left">
	            		<div class="left-lep">
		            		<p class="date">{{dtime(html.time)}}</p>
		            		<p v-if="html.release == '0'" class="no-release">未发布</p>
		            		<p v-if="html.release == '1'" class="yes-release">已发布</p>	 
		            	</div>
	            		<div class="photo-img-div">
	                        <img v-if="html.icon" :src="'http://127.0.0.1:4040/cover/'+html.icon" class="photo-img"/>
	                        <img v-if="!html.icon" :src="'http://127.0.0.1:4040/user/one.jpg'" class="photo-img"/>
	                    </div>          		
	            	</div>
	                <section class="works-list">
	                    <div class="top"><p class="tep">{{article[html.classlfy]}}</p><p class="title">{{html.name}}</p></div>
	                    <p class="introduce">{{html.introduc}}</p>
	                  	<div class="reback">
	                  		<div class="times">
	                  			<svg class="title-icon" aria-hidden="true">
									<use xlink:href="#icon-chakan"></use>
								</svg>
								<span>{{html.times}}</span>
	                  		</div>
	                  		<div class="comment">
	                  			<svg class="title-icon" aria-hidden="true">
									<use xlink:href="#icon-comment"></use>
								</svg>
								<span>{{html.times}}</span>
	                  		</div>
	                  	</div>
	                </section>
	                <div class="list-operation" :data-id="html._id">
	                	<!-- <div class="send" v-if="html.release == '0'" @click="publish(html._id)">
                  			<svg class="title-icon" aria-hidden="true">
								<use xlink:href="#icon-fasong"></use>
							</svg>
                  		</div> -->
                  		<div class="revoke" v-if="html.release == '1'" @click="revoke(html._id)">
                  			<svg class="title-icon" aria-hidden="true">
								<use xlink:href="#icon-chongzuo"></use>
							</svg>
                  		</div>
	                	<div class="modify" @click="modify(html._id)">
                  			<svg class="title-icon" aria-hidden="true">
								<use xlink:href="#icon-bi"></use>
							</svg>
                  		</div>
	                	<div class="delete" @click="deletef(html._id)">
                  			<svg class="title-icon" aria-hidden="true">
								<use xlink:href="#icon-shanchu"></use>
							</svg>
                  		</div>
	                </div>
				</li>
	        </ul>
        </div>
         <router-view :total="total" :nowpage='nowpage' :display="display" @pagechange="pagechange"></router-view>
	</div>
</template>
<script type="text/javascript" src="../../static/js/admin/fartic.js"></script>
<style lang="scss">
  @import "../../static/css/admin/fworks.scss";
</style>
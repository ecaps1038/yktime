<template>
   <div class="pages">
    	<ul class="pages-ul" v-if="page>1">
    		<li :class="{'disabled': current == 1}">
    			<a href="javascript:;" @click="setCurrent(current - 1)"> « </a>
    		</li>
			<li :class="{'disabled': current == 1}" v-if="current>4" @click="setCurrent(1)">1</li>
    		<li v-for="pages in grouplist" :class="nowPage(pages.val)" @click="setCurrent(pages.val)">{{pages.text}}</li> 
    		<li :class="{'disabled': current == page}" @click="setCurrent(page)" v-if="page-current>3">{{page}}</li>
			<li :class="{'disabled': current == page}">
				<a href="javascript:;" @click="setCurrent(current + 1)"> »</a>
			</li>
    	</ul>
    </div>
</template>
<script type="text/javascript">
	export default {
	data () {
		return {
			current: this.nowpage
		}
	},
	props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 8
      },
      nowpage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
     computed:{
		page: function () { // 总页数
        	return Math.ceil(this.total / this.display);
        },
        grouplist: function () { // 获取分页页码
	        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
	        if (len <= this.pagegroup) {
	          while (len--) {
	            temp.push({text: this.page - len, val: this.page - len});
	          }
	          ;
	          return temp;
	        }
	        while (len--) {
	          temp.push(this.page - len);
	        }
	        ;
	        var idx = temp.indexOf(center);
	        (idx < count) && ( center = center + count - idx);
	        (this.current > this.page - count) && ( center = this.page - count);
	        temp = temp.splice(center - count - 1, this.pagegroup);
	        do {
	          var t = temp.shift();
	          list.push({
	            text: t,
	            val: t
	          });
	        } while (temp.length);
	        if (this.page > this.pagegroup) {
	          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
	          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
	        }
	        return list;
        }
	},
	methods:{
	    //页码部分
	    //定位现在页码
		nowPage: function(num){
			var _this = this;
			if(num == _this.current){
				return 'now-page';
			}
		},
		setCurrent: function (idx) {
	        if (this.current != idx && idx > 0 && idx < this.page + 1) {
	          	this.current = idx;
	          	this.$emit('pagechange', this.current);
	        }
	    },


		//点击对应的页码
		clickPage: function(num){
			var _this = this;
			_this.current = num;
			this.$emit('pagechange', this.current);
		},
		//点击左
		clickBack: function(){
			var _this = this;
			if(_this.current>0){
				_this.current--;
				this.$emit('pagechange', this.current);
			}
		},
		//点击右
		clickGo: function(){
			var _this = this;
			if(_this.current<_this.page){
				_this.current++;
				this.$emit('pagechange', this.current);
			}
		},
	},
}
</script>
<style lang="scss">
.pages{
	margin-top: 40px;
	height: 24px;
	ul{
		float: right;
	}
	li{
		float: left;
		margin: 0 2px;
		height: 22px;
		min-width: 22px;
		border-radius: 12px;
		font-size: 12px;
		line-height: 22px;
		text-align: center;
		padding: 0 7px;
		cursor: pointer;
		&:hover{
			background: #f0f0f0;
		}
	}
	// 现在所在页码
	.now-page{
		background: #ff7f26;
		color: #fff;
		&:hover{
			background: #ff7f26;
		}
	}
}
</style>
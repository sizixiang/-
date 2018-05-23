<template>
	<div class='cartcontrol'>
		<i class="iconfont" v-show="foods.count>0" @click="subtractCount">&#xe600;</i>
		<span v-show="foods.count>0">{{foods.count}}</span>
		<i class="iconfont" @click="addCount">&#xe648;</i>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		props:{
			foods:{}
		},
		data(){
			return{
//				count:0
			}
		},
		created() {
//			console.log(this.foods)
		},
		methods:{
			addCount:function(){
				if(!this.foods.add){
					Vue.set(this.foods,'state_count',true);
				}else{
					this.foods.state_count = true;
				}
				if(!this.foods.count){
					Vue.set(this.foods, 'count', 1);
				}else{
					this.foods.count++;
				}                
				this.$emit("sendCount",this.foods);
			},
			subtractCount:function(){
				this.foods.state_count = false;
				this.foods.count--;
				this.$emit("sendCount",this.foods);
			}
		}
	}
</script>

<style scoped>
	.cartcontrol{display: inline-block;line-height: 18px;float: right;}
	.cartcontrol span{color: #7E8C8D;font-size: 12px;}
	.cartcontrol i{color: #00a0dc}
</style>
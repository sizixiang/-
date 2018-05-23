<template>
	<div  @touchmove.prevent>
		<v-header :seller="seller"></v-header>
		<div class="tab">
			<!-- 使用 router-link 组件来导航. -->
			<!-- 通过传入 `to` 属性指定链接. -->
			<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
			<div class="tab-item">
				<router-link to="/goods">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to='/ratings'>评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller">商家</router-link>
			</div>
		</div>

		<div class="content">
			<!-- 路由出口 -->
			<!-- 路由匹配到的组件将渲染在这里 -->
			<transition name="slide">
				<!--<keep-alive>-->
					<router-view @sendFoods="getFoods"></router-view>
				<!--</keep-alive>-->
			</transition>
		</div>
		<v-footer :footer="footer"></v-footer>
	</div>
</template>

<script>
	import header from './components/header/header.vue'
	import footer from "./components/footer/footer.vue"
	const ERR_OK = 0;
	//import goods from './components/goods/goods.vue'
	export default {
		data() {
			return {
				seller: {},
				footer:{
					count: 0,
					totalPrice: 0,
				},
			}
		},
		created() {
			this.$http.get("/api/seller").then(response => {
				response = response.body;
				if(response.errno === ERR_OK) {
					this.seller = response.data;
				}
			},response=>{
				//error callback
				console.log(errno);
			})
		},
		methods:{
			getFoods:function(foods){
				if(foods.state_count){
					this.footer.count++;
					this.footer.totalPrice += foods.price;
				}else{
					this.footer.count--;
					this.footer.totalPrice -= foods.price;
				}
			}
		},
		components: {
			'v-header': header,
			'v-footer': footer
			//		'router-view':goods
		},
		//	name: 'App'
	}
</script>

<style>
	body {
		margin: 0;
		padding: 0;
	}
	
	.tab {
		display: flex;
		line-height: 48px;
		height: 48px;
		/*position: fixed;
		top: 0;*/
		width: 100%;
		background-color: #fff;
		border-bottom: 1px solid #f1f4f8
	}
	
	.tab-item {
		flex: 1;
		text-align: center;
	}
	
	.tab-item .active {
		color: #FF0000
	}
	
	.tab-item a {
		display: block;
	}
	/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;	
}*/
</style>
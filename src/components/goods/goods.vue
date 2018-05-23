<template>
	<div class="goods"  @touchmove.prevent>
		<div class="goods-list">
			<ul ref='godlst' id="godlst" @touchmove.stop>
				<template v-for="(item,key,index) in goods">
					<li v-on:click="scrollTab" :id='key' :class="{'active':key==tabkey}">{{item.name}}</li>
				</template>
			</ul>
		</div>
		<div class="goods-foods">
			<ul id="goods-foods" @touchmove.stop>
				<template v-for="(item,index) in goods">
					<li class="foods-list">
						<div class="list-title" :data-id="index">
							<span>{{item.name}}</span>
						</div>
						<router-link v-for="(items,indexs) in item.foods" :to="{path:'/seller',query: { name: items }}">
							<div class="foods-mes-box">
								<img :src="items.icon" alt="" />
								<div class="foods-message">
									<h4>{{items.name}}</h4>
									<div class="msitem" v-if="items.description">
										<span>{{items.description}}</span>
									</div>
									<div class="msitem">
										<span>月售{{items.sellCount}}份</span><span> 好评率{{items.rating}}%</span>
									</div>
									<div class="price-box">
										<span class="price-span">￥{{items.price}}</span>
										<span class="original-price" v-if="items.oldPrice>0">￥{{items.oldPrice}}</span>
										<cartcontrol :foods="items" @sendCount="getCount"></cartcontrol>
									</div>
								</div>
							</div>
						</router-link>
					</li>
				</template>
			</ul>
		</div>
		<!--<v-footer :footer="footer"></v-footer>-->
	</div>
	
</template>

<script>
	import cartcontrol from "../cartcontrol/cartcontrol.vue"
//	import footer from "../footer/footer.vue"
	var ERR_OK = 0;
	var obj = new Object();
	var _fatherTop;
	var _wdHeight;
	var god_Fos;
	var godlst;
	var _tleTop;
	
	//设置可以滚动区域的方法
	var overscroll = function(el) {
		//addEventListener添加事件方法
		el.addEventListener('touchstart', function() {
			var top = el.scrollTop,
				totalScroll = el.scrollHeight,
				currentScroll = top + el.offsetHeight;
			if(top === 0) {
				el.scrollTop = 1;
			} else if(currentScroll === totalScroll) {
				el.scrollTop = top - 1;
			}
		});

		el.addEventListener('touchmove', function(evt) {
			if(el.offsetHeight < el.scrollHeight)
				evt._isScroller = true;
		});
	}
	
	
	export default {
		state:{
			count:0
		},
		data() {
			return {
				goods: {},
				tabkey:0,
				evtdefault: true,
				goodscard:{}
			}
		},
		created() {
			//请求数据
			this.$http.get("/api/goods").then(res => {
				res = res.data;
				if(res.errno === ERR_OK) {
					this.goods = res.data;
					god_Fos = document.getElementById("goods-foods");
					//获取页面高度
					_wdHeight = window.innerHeight;
					this.$nextTick(function() {
						//获取当前侧边栏的高度
						godlst = this.$refs.godlst.offsetHeight;
						//父级盒子距离浏览器顶部的距离
						_fatherTop = $(".content").offset().top;
						//设置侧边栏高度
						this.$refs.godlst.style.height = _wdHeight - _fatherTop - 50 + "px";
						//右侧菜单高度设置
						god_Fos.style.height = this.$refs.godlst.offsetHeight + "px";
						//设置可以滚动区域
						overscroll(document.querySelector('#goods-foods'));
						overscroll(document.querySelector('#godlst'));
					})
				}
				
				//取消页面回弹效果
//				if(this.evtdefault){
//					document.body.addEventListener('touchmove', function(evt) {
//						if(!evt._isScroller) {
//							evt.preventDefault();
//						}
//					});
//				}
			})
		},
		methods: {
			//滚动选项卡
			scrollTab: function(e) {
				this.tabkey = e.srcElement.id;
				console.log(this.tabkey);
				//标题距离浏览器顶部的距离
				_tleTop = $(".list-title")[e.srcElement.id].offsetTop;
				$("#goods-foods").animate({
					scrollTop: _tleTop - _fatherTop
				})
			},
			getCount:function(cut){
				this.goodscard = cut;
				this.$emit("sendFoods",cut);
			}
		},
		mutations:{
			increate:function(state){
				console.log(state);
				this.commit('increate')
			}
		},
		components:{
			"cartcontrol":cartcontrol,
		}
	}
</script>

<style scoped>
	body,
	html {
		overflow: hidden;
		height: 100%;
		-webkit-overflow-scrolling: touch;
	}
	
	.goods {
		display: flex;
		display: -webkit-flex;
		font-family: "微软雅黑";
	}
	
	.goods-list {
		width: 80px;
		overflow: hidden;
		background-color: #f1f4f8;
	}
	
	.goods-list ul {
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		margin-right: -10px;
		z-index: -1;
	}
	
	::-webkit-scrollbar {
		display: none
	}
	
	.goods-list ul li {
		padding: 20px 18px 20px 10px;
		font-size: 14px;
		border-bottom: 1px solid #eee;
		width: 62px;
	}
	
	.goods-list ul li.active {
		background-color: #fff;
	}
	
	.goods-foods {
		flex: 1;
		-ms-flex: 1;
		overflow: hidden;
	}
	
	.goods-foods ul {
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		width: 100%;
	}
	
	.goods-foods ul li{width: 100%;}
	
	.list-title {
		background-color: #f1f4f8;
		padding: 10px 0;
		border-left: 3px solid #eee;
		text-indent: 10px;
	}
	
	.foods-mes-box {
		border-bottom: 1px solid #f1f4f8;
		padding: 20px;
		display: flex;
		
		background-color: #fff;
	}
	
	.foods-mes-box img {
		width: 60px;
		height: 60px;
	}
	
	.foods-mes-box .foods-message {
		flex: 1;
		-ms-flex: 1;
		padding: 0 10px 0 10px
	}
	.foods-message h4{font-size: 16px;}
	.foods-message .msitem{padding-top: 4px}
	.foods-message .msitem span{font-size: 12px;color: #7E8C8D;}
	.price-box{padding-top: 5px;}
	.price-span{color: #FF0000;font-weight: bold;vertical-align: middle;}
	.original-price{font-size: 12px;font-weight: bold;vertical-align: middle;text-decoration:line-through;color: #7E8C8D}
</style>
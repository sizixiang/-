<template>
	<div class="footer">
		<div class="footer-box">
			<div class="shopping">
				<div class="icon-shopp" :style="{background:footer.count>0?'#00A0DC':'#2b343d'}">
					<span class="smdd" v-show="footer.count>0">{{footer.count}}</span>
					<i class='iconfont' :style="{color:footer.count>0?'#fff':'#808589'}">&#xe68d;</i>
				</div>
			</div>	
		</div>
		<div class="footer-box">
			<span class="total-price">￥{{footer.totalPrice}}</span>
			<span class="delivery-price">另需配送费￥{{seller.deliveryPrice}}元</span>
		</div>
		<div class="minprice-box">
			<div class="min-price" v-if="seller.minPrice>footer.totalPrice">￥{{seller.minPrice}}元起送</div>
			<div class="payment-box" v-if="seller.minPrice<=footer.totalPrice">去付款</div>
		</div>
	</div>
</template>

<script>
	var ERR_OK = 0;
	export default{
		props:{
			footer:{
				type: Object
			}
		},
		data(){
			return{
				seller:{}
			}
		},
		created() {
			this.$http.get("/api/seller").then(res=>{
				res = res.data;
				if(res.errno==ERR_OK){
					this.seller = res.data;
					console.log(this.seller);
				}
			})
		},
		methods:{
			
		}
	}
</script>

<style scoped> 
	.footer{display: flex;position: fixed;bottom: 0;left: 0;width: 100%;height: 50px;background-color: #141c27;color: #808589}
	.shopping{margin-top: -15px;width: 55px;height: 55px;border-radius: 50%;background-color: #141C27;margin-left: 13px;position: relative;}
	.icon-shopp .smdd{position: absolute;right: -6px;top: -6px;border-radius: 50%;font-size: 12px;line-height: 16px;color: #fff;height: 18px;width: 18px;text-align: center;background-color:#FF0000;z-index: 9999;}
	.icon-shopp{font-size: 24px;position:absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);text-align: center;display: block;width: 45px;height: 45px;border-radius: 50%;background-color: #2b343d;}
	.icon-shopp i{font-size: 24px;position:absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);color: #141C27}
	.total-price{line-height: 50px;vertical-align: middle;padding-right: 10px;border-right: 1px solid #808589;}
	.delivery-price{font-size: 12px;line-height: 50px;vertical-align: middle;padding-left: 6px;}
	.minprice-box{position: absolute;right: 0;line-height: 50px;font-size: 12px;font-weight: bold;}
	.min-price{background-color: #2b343b;padding: 0 20px;}
	.payment-box{background-color: #00A0DC;color: #fff;padding: 0 20px;}
</style>
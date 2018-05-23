<template>
	<div class="header">
		<img :src="seller.avatar" class="background" alt="" />
		<div class="avatar">

			<div class="avatar-logo">
				<img :src="seller.avatar" alt="" width="70" height="70" />
			</div>

			<div class="avatar-message">
				<h3><span>品牌</span>{{seller.name}}</h3>
				<span class="deliverttms">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
				
				<!--<template v-for="(item,index) in seller.supports">
					<p v-if="index==0" class="supports"><span>减</span>{{seller.supports[index].description}}</p>
				</template>-->
				<div v-if="seller.supports">
					<p class="supports"><span :class="">减</span>{{seller.supports[0].description}}<button @click="show = !show">{{seller.supports.length}}</button></p>
				</div>
			</div>                                                                                                                                                                                                                           
		</div>
		<div class="bulletin"  @click="show = !show">
			 <p><span>公告</span>{{seller.bulletin}}</p>
			 <i class="iconfont">&#xe619;</i>
		</div>
		
		<!--弹层-->
		<transition name="fade-mask">
			<div class="model-mask" v-if="show" @click="show = false"></div>
		</transition>
		<transition name="fade">
			<div class="model-supports" v-if="show" @click="show = false">
				<h4>{{seller.name}}</h4>
				<div class="title">
		            <div class="line"></div>
		            <div class="text">优惠信息</div>
		            <div class="line"></div>
		        </div>
				<div class="supports_descrpt">
					<template v-for="(item,index) in seller.supports">
						<p class="supports supports_mask"><span :class="">减</span>{{seller.supports[index].description}}</p>
					</template>
				</div>
				<div class="title">
          			<div class="line"></div>
            		<div class="text">商家公告</div>
            		<div class="line"></div>
          		</div>
				<p class="bulletin_p">{{seller.bulletin}}</p>
				<i class='iconfont icon-close'>&#xe641;</i>
			</div>
		</transition>
	</div>
</template>

<script>
	//将组建进行暴露
	export default {
		props: { 
			seller: {
				type: Object
			},	
		},
		data:function(){
			return {
				show: false
			}
		},
		created(){
//			this.classMap = ['decrease','discount','special','invoice','guarantee']
		}
	}
</script>

<style scoped>
	.header {position: relative;color: #fff;font-size: 14px;background: rgba(0,0,0,0.3);font-family: "微软雅黑";}
	.background {width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: -1;filter: blur(10px);-webkit-filter: blur(10px);-ms-filter: blur(10px);-moz-filter: blur(10px);}
	.avatar{display: flex;}
	.avatar-logo{width: 70px;height: 70px;padding: 24px 10px 24px 24px}
	.avatar-logo img{border-radius: 2px;}
	.avatar-message{flex: 1;font-size: 0;padding: 24px 0;}
	.avatar-message h3{font-size: 16px;line-height: 24px;font-weight: bold;}
	.avatar-message h3 span{background: red;font-weight: bold;padding: 0px 4px;line-height: 24px;border-radius: 2px;margin-right: 5px;font-size: 12px;vertical-align: top;}
	.bulletin{padding: 12px 30px 12px 15px;background: rgba(0,0,0,0.5);font-size: 12px;position: relative;}
	.bulletin p{display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
	.bulletin p span{background-color: #fff;color: #7E8C8D;line-height: 16px;padding: 0 2px;border-radius: 4px;margin-right: 4px;font-size: 12px;}
	.bulletin i{position: absolute;top: 50%;right: 10px;transform: translateY(-50%);line-height: 16px;}
	.deliverttms{line-height: 18px;font-size: 13px;padding: 2px 0 6px 0;display: block;}
	.supports{font-size: 12px;line-height: 12px;position: relative;}
	.supports span{background-color: white;color: red;line-height: 12px;font-weight: bold;padding: 0 3px;border-radius: 2px;margin-right: 5px;}
	.supports button{position: absolute;right: 10%;top: 50%;transform: translateY(-50%);}
	/*遮罩弹层*/
	.model-mask{width: 100%;height: 100%;background-color: rgba(0,0,0,0.8);position:fixed;top: 0;left: 0;z-index: 999;}
	.model-supports{position: fixed;top: 10%;left: 50%;transform: translateX(-50%);z-index: 9999;width: 80%;}
	.model-supports h4{text-align: center;font-weight: bold;font-size: 20px;}
	.supports_mask{line-height: 24px;}
	.supports_descrpt{padding: 0 10px}
	.bulletin_p{line-height: 24px;padding: 0 10px}
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	.fade-enter-active,.fade-leave-active {
	  transition: all .3s ease;
	}
	.fade-mask-leave-active{
		transition: opacity .6s;
	}
	.fade-mask-enter, .fade-mask-leave-to /* .fade-leave-active below version 2.1.8 */ {
  		opacity: 0;
	}
	.fade-enter, .fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  transform: translateX(10px);
	  opacity: 0;
	}
	
	.title{
		display: flex;
        margin: 28px auto 24px auto;
	}
	.line{
		flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	.text{
		padding: 0 12px;
        font-weight: 700;
        font-size: 14px;
	}
	.icon-close{width: 50px;height: 50px;display: block;margin: 0 auto;line-height: 50px;text-align: center;font-size: 40px;margin-top: 24%}
</style>
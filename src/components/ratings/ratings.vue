<template>
	<div class="estimate" id="estimate"  @touchmove.stop>
		<div class="score-box">
			<div class="composite-score-box">
				<p class="servicescore">{{seller.serviceScore}}</p>
				<p class="zhpf-p">综合评分</p>
				<p class="rankrate">高于周边商家{{seller.rankRate}}%</p>
			</div>
			<div class="rating-box">
				<p class="rating-p">服务态度
					<img src="../../assets/star24_on@3x.png" alt="" />
					<img src="../../assets/star24_on@3x.png" alt="" />
					<img src="../../assets/star24_on@3x.png" alt="" />
					<img src="../../assets/star24_on@3x.png" alt="" />
					<img src="../../assets/star24_on@3x.png" alt="" />
					<span class="score-span">{{seller.score}}</span>
				</p>
				<p class="rating-p">商品口味
					<img src="../../assets/star24_on@3x.png" alt="" />
					<img src="../../assets/star24_on@3x.png" alt="" />
					<img src="../../assets/star24_on@3x.png" alt="" />
					<img src="../../assets/star24_on@3x.png" alt="" />
					<img src="../../assets/star24_on@3x.png" alt="" />
					<span class="score-span">{{seller.foodScore}}</span>
				</p>
				<p class="rating-p">送达时间
					<span class='timer-span'>
						{{seller.deliveryTime}}分钟
					</span>
				</p>
			</div>
		</div>
		<div class="appraise-list">
			<div class="appraise-tab">
				<span class="all" @click="selectTab(0)">全部<i>{{ratings.length}}</i></span>
				<span class="satisfaction" @click="selectTab(1)">满意<i>{{satisfaction}}</i></span>
				<span class="unsatisfaction" @click="selectTab(2)">不满意<i>{{unsatisfaction}}</i></span>
			</div>
			<div class="havetext-box">
				<i class="iconfont icon-right">&#xe744;</i>
				<span>只看有内容的评价</span>
			</div>
			<div class="list-sell-box">
				<ul>
					<template v-for="(item,index) in tabType">
						<li>
							<div class="user-head">
								<img :src="item.avatar" alt="" />
							</div>
							<div class="user-score-box">
								<div class="username-timer">
									<span>{{item.username}}</span>
									<span class="timer-span timers">{{item.rateTime|formatDate}}</span>
								</div>
								<div class="list-score-box">
									<img src="../../assets/star24_on@3x.png" alt="" />
									<img src="../../assets/star24_on@3x.png" alt="" />
									<img src="../../assets/star24_on@3x.png" alt="" />
									<img src="../../assets/star24_on@3x.png" alt="" />
									<img src="../../assets/star24_on@3x.png" alt="" />
									<span class='timer-span' v-show="item.deliveryTime" style="font-size: 14px;">{{item.deliveryTime}}分钟</span>
								</div>
								<p class="text-p">{{!item.text?'暂无评论':item.text}}</p>
								<div class="sustain-box">
									<span v-for="(items,indexs) in item.recommend" v-if="indexs<3">{{items}}</span>
								</div>
							</div>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	var ERR_OK = 0;
	var satisfacs = new Array();
	var unsatisfacs =new Array();
	import footer from "../footer/footer.vue"
	import Vue from 'vue';
	import moment from 'moment';
//	document.addEventListener('touchmove', function (e) {
//		 e.returnValue = true;
//	}, false);
	export default{
		data(){
			return{
				//评价数据
				ratings:{},
				seller:{},
				satisfac:0,
				satisfacs:{},
				unsatisfac:0,
				unsatisfacs:{},
				tabType:{},
				dates:{}
			}
		},
		created(){
			this.$http.get("api/ratings").then(res=>{
				res = res.data;
				if(res.errno == ERR_OK){
					this.ratings = res.data;
					this.tabType = this.ratings;
					console.log(this.ratings);
				}
			})
			this.$http.get("api/seller").then(res=>{
				res = res.data;
				if(res.errno == ERR_OK){
					this.seller = res.data;
					console.log(this.seller);
				}
			})
			Vue.filter("formatDate",function(data,formatString){
				formatString = formatString || 'YYYY-MM-DD hh:mm';
				return moment(data).format(formatString);
			})
		},
		methods:{
			traversal:function(scores,type){
				for(let i=0;i<this.ratings.length;i++){
					if(type==2){
						if(this.ratings[i].score>3){
							satisfacs.push(this.ratings[i]);
							this.satisfacs = satisfacs;
							scores++;
						}
					}else{
						if(this.ratings[i].score<=3){
							unsatisfacs.push(this.ratings[i]);
							this.unsatisfacs = unsatisfacs;
							scores++;
						}
					}
				}
				return scores;
			},
			selectTab:function(type,e){
				if(type==0){
					this.tabType = this.ratings
				}else if(type == 1){
					this.tabType = this.satisfacs
				}else{
					this.tabType = this.unsatisfacs
				}
			},
		},
		computed:{
			//满意评论计算
			satisfaction(){
				Vue.filter("")
				return this.traversal(this.satisfac,2);
			},
			//不满意评论计算
			unsatisfaction(){
				return this.traversal(this.unsatisfac,1);
			}
		},
	}
</script>

<style scoped> 
	.estimate{padding-bottom: 52px;}
	.score-box{display: flex;margin-bottom: 15px;background-color: #fff;}
	.composite-score-box{text-align: center;padding: 15px 15px}
	.servicescore{font-size: 28px;color: #ff9511;}
	.zhpf-p{padding: 8px 0;font-size: 15px;}
	.rankrate{font-size: 12px;color: #808589}
	.rating-box{margin: 15px 0;display: flex;flex-direction:column;padding-left: 15px;border-left: 1px solid #f1f4f8;}
	.rating-box p{flex: 1;line-height: 24px;display: flex;font-size: 15px;}
	.rating-box p img{height: 18px;margin: 2px 0;padding-left: 5px}
	.rating-box p span.score-span{color: #ff9511;font-size: 15px;padding-left: 5px;}
	.timer-span{color: #808589;padding-left: 10px;font-size: 15px;}
	.appraise-list{background-color: #fff;font-size: 15px;}
	.appraise-tab{padding: 20px 0;border-bottom: 1px solid #F1F4F8;margin: 0 20px;}
	.appraise-tab span{display: inline-block;padding: 15px;margin-right: 5px;}
	.appraise-tab span i{font-size: 12px;font-style: normal;padding-left: 2px;}
	.all{background-color:#00A0DC;color: #fff;}
	.satisfaction{background-color:#ccecf7}
	.unsatisfaction{background-color: #eaebed}
	.list-sell-box{font-size: 15px;}
	.list-sell-box ul li{display: flex;border-bottom: 1px solid #F1F4F8;padding:20px;}
	.list-sell-box ul li .user-head img{width: 34px;height: 34px;border-radius: 50%;}
	.list-score-box img{width: 14px;height: 14px;}
	.user-score-box{padding-left: 14px;flex: 1;}
	.sustain-box span{display: inline-block;border: 1px solid #f1f4f8;padding: 1px 6px;font-size: 12px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-right: 8px;background-color: #f1f4f8;border-radius: 2px;}
	.timers{float: right;font-size: 12px;}
	.text-p{line-height: 20px;padding: 8px 0 8px 0}
	.havetext-box{border-bottom: 1px solid #f1f4f8;padding: 18px 20px}
</style>
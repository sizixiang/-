// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 程序的入口
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResoure from 'vue-resource'
import jquery from 'jquery'
import App from './App'
import Vuex from 'vuex'
import goods from './components/goods/goods'
import seller from './components/seller/seller'
import ratings from './components/ratings/ratings'
//import header from './components/header/header'
//import router from './router'
//Vue.component('hello',User)

// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

Vue.use(VueRouter);
Vue.use(VueResoure);
Vue.use(Vuex);
//const Foo = {
//	template: '<div>foo</div>'
//}
//const Bar = {
//	template: '<div>bar</div>'
//}

Vue.config.productionTip = false

const routes = [{
	path: '/goods',
	component: goods,
}, {
	path: '/seller',
	component: seller
}, {
	path: '/ratings',
	component: ratings
}]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
	mode: 'history',
	routes,
	linkActiveClass: 'active',
	//	滚动行为
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
		    return {
		      	selector: to.hash
		    }
		}
	}
})
//router.start(app,"#app");
//const app = new Vue({
//	router,
//	componenzts: {
//		App
//	},
//	template: '<App/>',
//}).$mount('#app')

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>',
})
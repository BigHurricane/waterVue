/* eslint-disable no-new */
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Vue from 'vue';
import axios from 'axios';
import 'lib-flexible';
import 'normalize.css';
import Router from 'vue-router';
import App from './App';
import { bus } from './bus';
import request from './request';
import BetterScroll from './publicComponent/better-scroll';
import footerNav from './publicComponent/footer-nav';
import auth from './page/auth';
import edit from './page/edit';
import addAddress from './page/addAddress';
import selectArea from './components/select-area';
import login from './components/login';
import register from './components/register';
import alter from './page/alter';
import Vant from 'vant';
import 'vant/lib/index.css';
import shoppingMall from './page/shoppingMall';
import shoppingStore from './page/shoppingStore';
import commodityDetails from './page/commodityDetails';
import commodityHeader from './publicComponent/commodity-header';
import classifyPage from './page/classifyPage';
import shoppingCar from './page/shoppingCar';
import shoppingCart from './page/shoppingCart.vue';
import affirmOrder from './page/affirmOrder';
import searchCommodity from './page/searchCommodity';
import MyOrder from './page/MyOrder';
import hotCakeSeckill from './page/hotCakeSeckill';
import {Swipe,SwipeItem,Lazyload,Toast,Notify,Badge,BadgeGroup} from 'vant';

Vue.use(Router);
Vue.use(BetterScroll);
Vue.use(footerNav);
Vue.use(commodityHeader);
Vue.use(selectArea);
Vue.use(request);
Vue.prototype.$http = axios;
Vue.prototype.$bus = bus;
Vue.use(Vant);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Badge);
Vue.use(BadgeGroup);


const routes = [
  {
    path: '/',
    redirect: { name: 'shoppingMall' },
  },
  {
    path: '/shoppingMall',
    name: 'shoppingMall',
    component: shoppingMall,
  },
  {
  path: '/auth',
  name: 'auth',
  component: auth,
  redirect: { path: '/auth/login' },
  children: [
  { path: 'login',
    name: 'login',
    component: login,
  },
  {
    path: 'register',
    name: 'register',
    component: register,
  }],
},
  {
    path: '/addAddress',
    name: 'addAddress',
    component: addAddress,
  },
  {
    path: '/edit',
    name: 'edit',
    component: edit,
  },
  {
    path: '/alter',
    name: 'alter',
    component: alter,
  },
  {
    path: '/shoppingStore',
    name: 'shoppingStore',
    component: shoppingStore,
  },
  {
    path: '/commodityDetails',
    name: 'commodityDetails',
    component: commodityDetails,
  },
  {
    path: '/classifyPage',
    name: 'classifyPage',
    component: classifyPage,
  },
  {
    path: '/shoppingCar',
    name: 'shoppingCar',
    component: shoppingCar,
  },
  {
    path: '/affirmOrder',
    name: affirmOrder,
    component: affirmOrder
  },
  {
    path: '/searchCommodity',
    name: searchCommodity,
    component: searchCommodity
  },
  {
    path: '/MyOrder',
    name: MyOrder,
    component: MyOrder,
  },
  {
    path: './hotCakeSeckill',
    name: 'hotCakeSeckill',
    component: hotCakeSeckill
  },
  {
    path: './shoppingCart',
    name: shoppingCart,
    component: shoppingCart
  }
];
const b = new Router({
  routes,
  mode: 'history',
});

new Vue({
  render: h => h(App),
  components: { App },
  template: '<App/>',
  router: b,
}).$mount('#app');

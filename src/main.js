import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

Vue.prototype.$http = Axios;

import cookies from 'vue-cookies'
Vue.use(cookies);

Vue.config.productionTip = false;

import VueRouter from "vue-router";


const router = new VueRouter;
new Vue(Vue.util.extend({ router }, App)).$mount('#app');

import Vue from 'vue'
import App from './App.vue'


import Axios from 'axios'

Vue.prototype.$http = Axios;

//import VueRouter from 'vue-router';
//Vue.use(VueRouter);

import cookies from 'vue-cookies'
Vue.use(cookies);

Vue.config.productionTip = false;

import Painikepeli from './components/Painikepeli.vue';
import VueRouter from "vue-router";

const routes = [
  {
    name: 'adduser',
    path: '/',
    component: Painikepeli,
    meta: {
      guest: true
    }
  },
  {
    name: 'updateSaldo',
    path: '/',
    component: Painikepeli,
    meta: {
      guest: true
    }
  },
  {
    name: 'clicks',
    path: '/',
    component: Painikepeli,
    meta: {
      guest: true
    }
  },
  {
    name: 'updateclicks',
    path: '/',
    component: Painikepeli,
    meta: {
      guest: true
    }
  },
  ];
const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');

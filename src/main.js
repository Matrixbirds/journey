import Vue from 'vue'

import Player from './components/Player'


window.Vue = Vue;
Vue.use(require('vue-resource'));
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { 
    Player
  }
})
import Vue from 'vue'
import './plugins/vuetify'
import store from './store'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routes/routes.js';
import * as firebase from 'firebase';
import BuyModal from '@/components/Shared/BuyModel'
Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModal)
new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    var config = {
      apiKey: "AIzaSyCgAVhJsJuCgc__EQJHY8xDfIBgZb4qC78",
      authDomain: "vue-products-like.firebaseapp.com",
      databaseURL: "https://vue-products-like.firebaseio.com",
      projectId: "vue-products-like",
      storageBucket: "vue-products-like.appspot.com",
      messagingSenderId: "837581773315"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.$store.dispatch('autoLoginUser', user)
        }
    });
    this.$store.dispatch('fetchProducts')
  },
}).$mount('#app')

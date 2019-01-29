import Vue from 'vue';
import Vuex from 'vuex';
import products from './products'
import user from './user'
import shared from './shared'
import orders from './orders'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        products,
        user,
        shared,
        orders
    }
})
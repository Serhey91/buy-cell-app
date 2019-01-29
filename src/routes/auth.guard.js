import store from '../store/index'
export default function (to, from, next) {
    if(localStorage.getItem('firebase:host:vue-products-like.firebaseio.com')) {
        next()
    }
    // if(store.getters.user) {        
    //     next()
    // }
    else {       
        next('./login?loginError=true')
    }
}
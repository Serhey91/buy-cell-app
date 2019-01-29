import * as firebase from 'firebase';
class Order {
    constructor(name, phone, productId, done = false, id = null) {
        this.name = name;
        this.phone = phone;
        this.productId = productId;
        this.done = done;
        this.id = id;
    }
}
export default {
    state: {
        orders: []
    },
    mutations: {
        loadOrders(state, payload) {
            state.orders = payload;
        }
    },
    actions: {
        async markOrderDone({commit, getters}, payload) {
            commit('clearError');
            try {
                await firebase.database().ref(`/users/${getters.user.id}/orders`).child(payload.id).update({
                    done: payload.done
                })
            } catch(error) {
                commit('setError', error.message);
                throw error
            }
        },
        async createOrder({ commit }, payload) {
            const order = new Order(
                payload.name,
                payload.phone,
                payload.productId);
            commit('clearError');
            try {
                await firebase.database().ref(`/users/${payload.ownerId}/orders`).push(order);
            }
            catch (error) {
                commit('setError', error.message)
                throw error
            }
        },
        async takeOrders({ commit, getters }) {
            commit('setLoading', true);
            commit('clearError');
            const resultOrders = [];
            try {
                commit('setLoading', false);
                const firebaseValue = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value');
                const orders = firebaseValue.val();
                Object.keys(orders).forEach(key => {
                    const order = orders[key];
                    resultOrders.push(new Order(
                        order.name,
                        order.phone,
                        order.productId,
                        order.done,
                        key
                    ));
                })
                commit('loadOrders', resultOrders)
                commit('setLoading', false);
            }
            catch (error) {
                commit('setLoading', false);
                commit('setError', error.message)
            }
        }
    },
    getters: {
        doneOrders(state) {
            return state.orders.filter(order => order.done)
        },
        undoneOrders(state) {
            return state.orders.filter(order => !order.done)
        },
        orders(state, getters) {
            return getters.undoneOrders.concat(getters.doneOrders)
        }
    }
}
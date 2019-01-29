import * as firebase from 'firebase'
class User {
    constructor(id) {
        this.id = id
    }
}
export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        isUserLoggedIn(state) {
            return state.user !== null
        }
    },
    actions: {
        async registerUser({ commit,getters }, payload) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                // commit('setUser', new User(user.uid));
                commit('setLoading', false);
                console.log(getters)
            }
            catch(error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }            
        },
       async loginUser({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                console.log(user)
                commit('setUser', new User(user.user.uid));
                commit('setLoading', false);
            }
            catch(error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }   
        },
        autoLoginUser({commit}, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    }
}
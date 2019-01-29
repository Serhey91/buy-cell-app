import * as firebase from 'firebase'
class Product {
    constructor(title, description, price, promo = false, ownerId, imgSrc = 'https://5.imimg.com/data5/CK/AS/MY-60212530/9-ply-duplex-box-500x500.jpg', id = null) {
        this.title = title;
        this.ownerId = ownerId;
        this.promo = promo;
        this.description = description;
        this.promo = promo;
        this.price = price;
        this.imgSrc = imgSrc;
        this.id = id
    }
}
export default {
    state: {
        products: [

        ]
    },
    mutations: {
        createNewProduct(state, payload) {
            state.products.push(payload);
        },
        loadProducts(state, payload) {
            state.products = payload
        },
        updateProduct(state, { title, description, id, price }) {
            const productToUpdate = state.products.find(item => item.id === id);
            productToUpdate.title = title;
            productToUpdate.description = description;
            productToUpdate.price = price
        }
    },
    actions: {
        async updateProduct({ commit }, { title, description, price, id }) {
            commit('clearError');
            commit('setLoading', true)
            try {
                await firebase.database().ref('products').child(id).update({
                    title, description, price
                })
                commit('updateProduct', {
                    title, description, id, price
                })
                commit('setLoading', false);

            }
            catch (err) {
                commit('setError', err.message);
                commit('setLoading', false);
                throw error
            }
        },
        async fetchProducts({ commit }) {
            commit('clearError');
            commit('setLoading', true);
            const resultProducts = [];
            try {
                const firebaseValue = await firebase.database().ref('products').once('value');
                const allProducts = firebaseValue.val();
                Object.keys(allProducts).forEach(key => {
                    const prod = allProducts[key];
                    resultProducts.push(
                        new Product(prod.title,
                            prod.description,
                            prod.price,
                            prod.promo,
                            prod.ownerId,
                            prod.imgSrc,
                            key
                        )
                    )
                })
                commit('loadProducts', resultProducts)
                commit('setLoading', false);
            }
            catch (e) {
                commit('setError', e.message);
                commit('setLoading', false);
                throw e
            }
        },
        async createNewProduct({ commit, getters }, payload) {
            commit('clearError');
            commit('setLoading', true);
            const image = payload.image;
            try {
                const newProduct = new Product(
                    payload.title,
                    payload.description,
                    +payload.price,
                    payload.promo,
                    getters.user.id,
                    '');
                    console.log(getters)
                    console.log(newProduct)
                const product = firebase.database().ref('products').push(newProduct);
                const imgExtention = image.name.slice(image.name.lastIndexOf('.'));
                await firebase.storage().ref(`products/${product.key}${imgExtention}`).put(image)
                const imgSrc = await firebase.storage().ref(`products/${product.key}${imgExtention}`).getDownloadURL();
                await firebase.database().ref('products').child(product.key).update({
                    imgSrc
                })
                commit('createNewProduct', {
                    ...newProduct,
                    id: product.key,
                    imgSrc
                })
                commit('setLoading', false);

            }
            catch (err) {
                console.log(err)
                commit('setError', err.message);
                commit('setLoading', false);
                throw err
            }
        }
    },
    getters: {
        products: (state) => {
            return state.products
        },
        promoProducts: (state) => {
            return state.products.filter(prod => prod.promo === true);
        },
        userProducts: (state, getters) => {
            return state.products.filter(prod => {
                return prod.ownerId === getters.user.id
            })
        },
        productById: (state) => {
            return id => {
                return state.products.find(p => p.id === id)
            }
        }
    }
}
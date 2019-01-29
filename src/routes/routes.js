
import VueRouter from 'vue-router';
// @ - из корня проекта
import Home from '@/components/Home'
import Product from '@/components/Products/Product'
import AddProduct from '@/components/Products/AddProduct'
import ProductsList from '@/components/Products/ProductsList'
import Orders from '@/components/Orders/Orders'
import Login from '@/components/Authentication/Login'
import Registration from '@/components/Authentication/Registration'
import Guard from './auth.guard'
export default new VueRouter({

    routes: [
        {
            path: '',
            name: 'home',
            component: Home
        },
        {
            path: '/product/:id',
            props: true,
            name: 'product',
            component: Product
        },
        {
            path: '/list',
            name: 'list',
            component: ProductsList,
            beforeEnter: Guard
        },
        {
            path: '/new',
            name: 'newProduct',
            component: AddProduct,
            beforeEnter: Guard
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders,
            beforeEnter: Guard
        }

    ],

    mode: 'history'
})
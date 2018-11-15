import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import Search from '../components/Search'
import Categories from '../views/Categories'
import Mine from '../views/Mine'
import Order from '../views/Order'
import Coupon from '../views/Coupon'
// import Default from '../components/Default'
// import Double11 from '../components/Double11'
// import Phone from '../components/Phone'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Main',
        component: //{
            Main,
        // default: Default,
        // double11: Double11,
        // phone: Phone
        //}
    }, {
        path: '/search',
        name: 'Search',
        component: Search
    }, {
        path: '/category',
        name: 'Category',
        component: Categories
    }, {
        path: '/mine/:id',
        // name: 'Mine',
        // component: Mine,
        children: [
            {
                path: '',  
                name: 'Mine',    
                component: Mine
            },
            {
                path: 'coupon',
                name: 'MineCoupon',
                component: Coupon
            },
        ]
    }, {
        path: '/order/:orderType',
        name: 'Order',
        component: Order
    }, {
        path: '/maplocation/:address',
        name: 'Maplocation',
        children: [
            {
                path: 'address',
                query: {location_type: 'mihome'}
            }
        ]
    }]
})
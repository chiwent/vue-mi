import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import Search from '../components/Search'
import Categories from '../views/Categories'
import Mine from '../views/Mine'
import Order from '../views/Order'
import Coupon from '../components/Coupon'
import Mpointsmall from '../components/Mpointsmall'
import Maplocation from '../components/Maplocation'
import Fcode from '../components/Fcode'
import Setting from '../components/Setting'
import Services from '../components/Services'
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
        path: '/mpointsmall',
        name: 'Mpointsmall',
        component: Mpointsmall
    }, {
        path: '/mine',
        name: 'Mine',
        component: Mine,
    }, {
        path: '/mine/coupon',
        component: Coupon
    }, {
        path: '/order/:orderType',
        name: 'Order',
        component: Order
    }, {
        path: '/maplocation/:address',
        component: Maplocation,
        children: [
            {
                path: 'address',
                query: {location_type: 'mihome'}
            }
        ]
    }, {
        path: '/services',
        component: Services
    },{
        path: '/fcode',
        component: Fcode
    }, {
        path: '/set',
        component: Setting
    }]
})
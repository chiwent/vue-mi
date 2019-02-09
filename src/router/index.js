import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
    return () => import(/* webpackChunkName: "view" */ `@/views/${view}.vue`)
}
function loadComponents(component) {
    return () => import(/* webpackChunkName: "components" */ `@/components/${component}.vue`)
}

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Main',
        component: loadView('Main')
    }, {
        // path: '/commodity/detail/:id',
        path: '/commodity/detail/mi8s', // 暂时只有小米8青春版提供
        name: 'ProductDetail',
        component: loadView('ProductDetail')
    }, {
        path: '/search',
        name: 'Search',
        component: loadComponents('Search')
    }, {
        path: '/category',
        name: 'Category',
        component: loadView('Categories')
    }, {
        path: '/mpointsmall',
        name: 'Mpointsmall',
        component: loadComponents('Mpointsmall')
    }, {
        path: '/user',
        name: 'User',
        component: loadView('User'),
    }, {
        name: 'Coupon',
        path: 'coupon',
        component: loadView('Coupon'),
        meta: {
            requireAuth: true
        }
    }, {
        name: 'Set',
        path: '/user/set',
        component: loadView('Set'),
        meta: {
            requireAuth: true
        }
    }, {
        path: '/order',
        name: 'Order',
        component: loadView('Order'),
        meta: {
            requireAuth: true
        },
        children: [
            {
                name: 'orderList',
                path: 'list',
                component: loadView('OrderList'),
                meta: {
                    requireAuth: true
                }
            }
        ]
    }, {
        path: '/maplocation/:address',
        component: loadComponents('Maplocation'),
        children: [
            {
                path: 'address',
                query: { location_type: 'mihome' }
            }
        ]
    }, {
        path: '/services',
        component: loadComponents('Services')
    }, {
        path: '/fcode',
        component: loadView('Fcode')
    }, {
        path: '/login',
        component: loadView('Login')
    }, {
        path: '/cart',
        component: loadView('Cart')
    }, {
        path: '*',
        component: loadView('404')
    }]
})
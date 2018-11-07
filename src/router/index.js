import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import Search from '../components/Search'
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
    }]
})
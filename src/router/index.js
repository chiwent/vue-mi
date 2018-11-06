import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import Search from '../components/Search'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Main',
        component: Main
    }, {
        path: '/search',
        name: 'Search',
        component: Search
    }]
})
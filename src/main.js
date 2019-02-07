// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './utils/rem';
import 'normalize.css';
import './style/main.scss';
import 'vant/lib/index.css';
import vueScrollwatch from "vue-scrollwatch";
import Vant from 'vant';
import 'vant/lib/index.css';
import { getStorage } from '@/utils/storage';

Vue.use(Vant);
Vue.use(vueScrollwatch)
Vue.config.productionTip = false;
// Vue.use(vueSwiper);

let initUserInfo = getStorage({
    name: 'userName',
    type: 'session'
});
const initUserName = !!initUserInfo ? JSON.parse(JSON.stringify(initUserInfo)).content : '';

/*
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        const user = initUserName;
        if (!user) {
            next({
                path: 'login'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
*/

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
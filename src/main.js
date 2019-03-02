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
import Axios from 'axios';
import { strictEqual } from 'assert';

Vue.use(Vant);
Vue.use(vueScrollwatch)
Vue.config.productionTip = false;
// Vue.use(vueSwiper);

let initUserInfo = getStorage({
    name: 'userName',
    type: 'session'
});
const initUserName = !!initUserInfo ? JSON.parse(JSON.stringify(initUserInfo)).content : '';

Axios.interceptors.request.use(config => {
    store.state.isNetworkLoading = true;
    if (store.state.token) {
        config.headers.token = store.state.token;
    }
    return config;
}, err => {
    return Promise.reject(err);
});
Axios.interceptors.response.use(response => {
    store.state.isNetworkLoading = false;
    return response;
}, err => {
    if (err.response) {
        switch (err.response.status) {
            case 401:
                store.commit('logout');
                router.replace({
                    path: '/login'
                });
        }
    }
    return Promise.reject(err);
});
Axios.defaults.transformRequest = [data => {
    let newData = '';
    for (let key in data) {
        newData += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
    }
    return newData;
}]

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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
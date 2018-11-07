// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import vueSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// import BgaBackTop from 'bga-back-top-vue'
import './utils/rem'
import 'normalize.css'
import './style/main.scss'

// Vue.use(BgaBackTop)

Vue.config.productionTip = false
    // Vue.use(vueSwiper);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
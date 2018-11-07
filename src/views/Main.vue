<template>
  <div>
    <div class="main-container">
      <home-header v-on:listenNav="selectNav"></home-header>
      <!--<router-view :name="view">
      </router-view>
      <router-view :name="view">
      </router-view>
      <router-view :name="view">
      </router-view>-->
      <transition name='slide' keep-alive>
        <default v-show="view === 'default'" class="child-view"></default>
      </transition>
      <transition name='slide' keep-alive>
        <double11 v-show="view === 'double11'" class="child-view"></double11>
      </transition>
      <transition name='slide' keep-alive>
        <phone v-show="view === 'phone'"></phone>
      </transition>
      <home-footer></home-footer>
    </div>
    <sticky-footer></sticky-footer>
  </div>
</template>

<script>
  import HomeHeader from '../components/Header'
  import Default from '../components/Default'
  import Double11 from '../components/Double11'
  import Phone from '../components/Phone'
  import HomeFooter from '../components/Footer'
  import StickyFooter from '../components/StickyFooter'
  import 'swiper/dist/css/swiper.css'
  // let midIcon = require.context('../assets/img/', false, /\.jpg$/);

  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'

  export default {
    name: 'Main',
    components: {
      HomeHeader,
      Default,
      Double11,
      Phone,
      HomeFooter,
      StickyFooter,
    },
    data() {
      return {
        navArr: ['default', 'double11', 'phone'],
        view: 'default'
      }
    },
    methods: {
      selectNav(nav) {
        this.view = this.navArr[nav]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-container {
    position: relative;
    overflow-x: hidden;
    margin-bottom: 50px;
  }

  // .back-top-icon {
  //   width: 30px;
  //   height: 30px;
  //   overflow: hidden;
  // }
  .child-view {
    width: 100%;
    transition: all .2s linear;
  }

  .slide-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }

  .slide-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>


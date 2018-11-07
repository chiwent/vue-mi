<template>
<div>
  <!-- <div class="container"> -->
      <!-- <home-header v-on:listenNav="selectNav"></home-header> -->
      <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide><img class="banner" src="../assets/img/banner1_c.jpg" alt="banner1"></swiper-slide>
        <swiper-slide><img class="banner" src="../assets/img/banner2_c.jpg" alt="banner2"></swiper-slide>
        <swiper-slide><img class="banner" src="../assets/img/banner3_c.jpg" alt="banner3"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="mid-icon">
      <ul>
        <li v-for="(item, index) in iconList" :key="index">
          <img :src="require('../assets/img/' + item)" alt="">
        </li>
      </ul>
    </div>
    <two-columns>
      <div slot="left" class="half-col">
        <router-link to="/mi8s" id="mi8s">
          <img :src="require('../assets/img/mi8s.jpg')" alt="mi8s" class="col-img">
        </router-link>
      </div>
      <div slot="right" class="half-col">
        <div>
          <router-link to="/zhineng" id="zhineng">
            <img :src="require('../assets/img/zhineng.jpg')" alt="zhineng">
          </router-link>
        </div>
        <div>
          <router-link to="/tvsale">
            <img :src="require('../assets/img/double11-tv.jpg')" alt="double11-tv">
          </router-link>
        </div>
      </div>
    </two-columns>
    <one-column>
      <div class="one-col">
        <router-link to="/mix3">
        <img :src="require('../assets/img/mix3.jpg')" alt="mix3">
        </router-link>
      </div>
    </one-column>
    <one-column>
      <div class="one-col">
        <router-link to="/redmi6">
        <img :src="require('../assets/img/redmi6.jpg')" alt="redmi6">
        </router-link>
      </div>
    </one-column>
    <two-columns>
      <div class="half-col" slot="left">
        <router-link to="/mi8s">
          <img :src="require('../assets/img/mi8s-l.jpg')" alt="mi8s-l">
        </router-link>
        <p class="col-title">小米8 青春版</p>
        <p class="col-info">潮流镜面渐变色，自拍旗舰</p>
        <p class="col-price">￥1399起</p>
      </div>
      <div class="half-col" slot="right">
        <router-link to="/mi8new">
          <img :src="require('../assets/img/mi8finger.jpg')" alt="mi8finger">
        </router-link>
        <p class="col-title">小米8 屏幕指纹版</p>
        <p class="col-info">压感屏幕指纹，潮流外观</p>
        <p class="col-price">￥3199起</p>
      </div>
    </two-columns>
     <two-columns>
      <div class="half-col" slot="left">
        <router-link to="/redmi6a">
          <img :src="require('../assets/img/redmi6a.jpg')" alt="redmi6a">
        </router-link>
        <p class="col-title">红米6A</p>
        <p class="col-info">好用好看不贵</p>
        <p class="col-price">￥549起<s class="del">￥599</s></p>
      </div>
      <div class="half-col" slot="right">
        <router-link to="/mi6x">
          <img :src="require('../assets/img/mi6x.jpg')" alt="mi6x">
        </router-link>
        <p class="col-title">小米6X</p>
        <p class="col-info">轻薄美观的拍照手机</p>
        <p class="col-price">￥1299起<s class="del">￥1599</s></p>
      </div>
    </two-columns>
    <two-columns>
      <div class="half-col" slot="left">
        <router-link to="/mi8se">
          <img :src="require('../assets/img/mi8se.jpg')" alt="mi8se">
        </router-link>
        <p class="col-title">小米8 SE</p>
        <p class="col-info">三星AMOLED全面屏</p>
        <p class="col-price">￥1699起<s class="del">￥1799</s></p>
      </div>
      <div class="half-col" slot="right">
        <router-link to="/mipad4">
          <img :src="require('../assets/img/mipad4.jpg')" alt="mipad4">
        </router-link>
        <p class="col-title">小米平板4</p>
        <p class="col-info">追剧神器/支持AI人脸识别</p>
        <p class="col-price">￥1099起</p>
      </div>
    </two-columns>
    <two-columns>
      <div class="half-col" slot="left">
        <router-link to="/helo">
          <img :src="require('../assets/img/helo.jpg')" alt="helo">
        </router-link>
        <p class="col-title">黑鲨游戏手机Helo</p>
        <p class="col-info">爽液冷，更能打</p>
        <p class="col-price">￥3199起</p>
      </div>
      <div class="half-col" slot="right">
        <router-link to="/redmi6">
          <img :src="require('../assets/img/redmi6-s.jpg')" alt="redmi6">
        </router-link>
        <p class="col-title">红米6</p>
        <p class="col-info">小屏高性能的双摄手机</p>
        <p class="col-price">￥699起<s class="del">￥799</s></p>
      </div>
    </two-columns>
    <!-- <home-footer></home-footer> -->
  <!-- </div> -->
  <!-- <sticky-footer></sticky-footer> -->
</div>
</template>
<script>
  // import HomeHeader from '../components/Header'
  import OneColumn from './OneColumn'
  import TwoColumns from './TwoColumns'
  // import HomeFooter from '../components/Footer'
  // import StickyFooter from '../components/StickyFooter'
  import 'swiper/dist/css/swiper.css'
  // let midIcon = require.context('../assets/img/', false, /\.jpg$/);

  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'

  export default {
    name: 'Default',
    components: {
      swiper,
      swiperSlide,
      OneColumn,
      TwoColumns,
      // HomeHeader,
      // HomeFooter,
      // StickyFooter
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        iconList: ['newproduct.jpg', 'mibuy.jpg', 'change.jpg', 'misim.jpg', 'zongchou.jpg'],
        activeNav: '',
      }
    },
    methods: {
      selectNav(nav) {
        console.log(nav)
      }
    }
  }
</script>
<style lang="scss" scoped>
$half-width: 50%;
  $max-width: 100%;
  .swiper {
    margin: 0 auto;
    position: relative;
    z-index: 1;
    height: 205px;
    box-sizing: content-box;
    margin-top: 50px;
    .banner {
      width: 100%;
      height: 100%;
    }
  }

  .mid-icon {
    position: relative;
    width: 100%;
    height: 100px;
    margin-top: 78px;
    ul {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0;
      margin: 0;
      padding: 0;
      li {
        width: $max-width;
        height: $max-width;
        img {
          max-width: $max-width;
          max-height: $max-width
        }
      }
    }
  }

  .half-col {
    width: $half-width;
    height: 290px;
    display: inline-block;
      img {
        display: inline-block;
        width: $max-width;
      }
    p {
      padding-left: 20px;
      margin-top: 5px;
    }
  }

  .one-col {
    width: $max-width;
    height: $max-width;
    img {
      width: $max-width;
      height: $max-width;
    }
  }
  .col-title {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 22px;
    color: rgba(0, 0, 0, .87);
  }
  .col-info {
    margin-top: 4px;
    font-size: 15px;
    line-height: 15px;
    color: rgba(0, 0, 0, .54);
  }
  .col-price {
    font-size: 22px;
    color: #ea625b;
    height: 22px;
    position: relative;
    display: inline-block;
    .del {
      display: inline-block;
      margin: 0 3px;
      font-size: 12px;
      color: rgba(0, 0, 0, .54);
    }
  }
</style>


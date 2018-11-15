<template>
  <div class="sticky-footer">
    <ul>
      <li v-for="(item, index) in stickyTitle" :key="index">
        <router-link :to="stickyRoute[index]" class="bottom-link">
          <!--<img class="app-bottom-icon" :src="require('../assets/img/' + ($route.path === stickyRoute[index] ? stickyActiveIcon[index] : stickyIcon[index]))" alt="">-->
          <img class="app-bottom-icon" :src="require('../assets/img/' + ($route.path === (stickyRoute[index] === '/' ? '/' : '/' + stickyRoute[index]) ? stickyActiveIcon[index] : stickyIcon[index]))" alt="">
          <span :class="{'bottom-info-active': $route.path === (stickyRoute[index] === '/' ? '/' : '/' + stickyRoute[index]) }">{{item}}</span>

          <!--<img class="app-bottom-icon" :src="require('../assets/img/' + new RegExp(stickyRoute[index]).test($route.path))" alt="">
          <span :class="{'bottom-info-active': new RegExp(stickyRoute[index]).test($route.path) }">{{item}}</span>-->

          <!--<img class="app-bottom-icon" :src="require('../assets/img/' + $route.path.match(new RegExp(stickyIcon[index]))[0])" alt="">
          <span :class="{'bottom-info-active': $route.path.match(new RegExp(stickyRoute[index]))[0] !== void 0 }">{{item}}</span>-->
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'StickyFooter',
    data() {
      return {
        stickyTitle: ['首页', '分类', '购物车', '我的'],
        stickyRoute: ['/', 'category', 'cart', 'mine'],
        stickyIcon: ['bottom-home.png', 'bottom-category.png', 'bottom-cart.png', 'bottom-mine.png'],
        stickyActiveIcon: ['bottom-home-active.png', 'bottom-category-active.png', 'bottom-cart.png', 'bottom-mine-active.png']
      }
    },
    // mounted() {
    //   console.log(this.path)
    //   console.log(window.location.pathname.split('/')[1])
    // }
  }
</script>
<style lang="scss" scoped>
  .sticky-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    color: white;
    text-align: center;
    z-index: 9999;
    height: 85px;
    background-color: #fff;
    box-shadow: 0 5px 14px 2px rgba(0,0,0,.12);
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0;
      li {
        width: 100%;
        height: 43px;
      }
    }
  }
  .bottom-link {
    flex: 1 1 auto;
    color: gray;
    padding: 5px;
    .app-bottom-icon {
      display: block;
      width: 23px;
      height: 23px;
      margin: 0 auto 3px;
    }
  }
  .bottom-info-active {
    color: #ff6700;
  }
</style>

<template>
  <div class="sticky-footer">
    <ul>
      <li v-for="(item, index) in stickyTitle" :key="index">
        <span>{{ cartNumGetters }}</span>
        <span>{{ $store.state.cartNum }}</span>
        <span class="cart-badge" v-if="index === 2 && cartNumGetters">{{ cartNumGetters }}</span>
        <router-link :to="stickyRoute[index]" class="bottom-link">
          <!--<img class="app-bottom-icon" :src="require('../assets/img/' + ($route.path === stickyRoute[index] ? stickyActiveIcon[index] : stickyIcon[index]))" alt="">-->
          <img
            class="app-bottom-icon"
            :src="require('../assets/img/' + (activePage === index ? stickyActiveIcon[index] : stickyIcon[index]))"
          >
          <span :class="{'bottom-info-active': activePage === index}">{{item}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
export default {
  name: "StickyFooter",
  props: {
    activePage: {
      type: Number
    }
  },
  computed: {
    // ...mapGetters(["cartNumGetters"])
    cartNumGetters() {
      return this.$store.state.cartNum;
    }
  },
  data() {
    return {
      stickyTitle: ["首页", "分类", "购物车", "我的"],
      stickyRoute: ["/", "category", "cart", "user"],
      stickyIcon: [
        "bottom-home.png",
        "bottom-category.png",
        "bottom-cart.png",
        "bottom-mine.png"
      ],
      stickyActiveIcon: [
        "bottom-home-active.png",
        "bottom-category-active.png",
        "bottom-cart.png",
        "bottom-mine-active.png"
      ]
    };
  },
  mounted() {}
};
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
  box-shadow: 0 5px 14px 2px rgba(0, 0, 0, 0.12);
  // animation: sticky-footer-fading 0.6s ease;
  ul {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    li {
      position: relative;
      width: 100%;
      height: 100%;

      .cart-badge {
        position: absolute;
        top: 5px;
        right: 35px;
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        color: #ffffff;
        background-color: #e73232;
      }
    }
  }
}
.bottom-link {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: inline-block;
  width: 60px;
  height: 60px;
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

@keyframes sticky-footer-fading {
  0% {
    opacity: 0;
    transform: translate3d(0, 100px, 0);
  }
  50% {
    opacity: 1;
    transform: translate3d(0, 100px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>

<template>
  <div class="container">
    <img :src="require('../assets/img/404.jpg')" alt="404" class="banner">
    <p class="sorry">抱歉，页面找不到了...</p>
    <router-link to="/" class="link">商品首页 mi.com</router-link>

    <van-popup v-model="isTipShow">商品详情页暂时只完成了小米8青春版</van-popup>
  </div>
</template>
<script>
export default {
  name: "notFound",
  data() {
    return {
      isTipShow: false
    };
  },
  created() {
    setTimeout(() => {
      this.isTipShow = false;
    }, 2500);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path.indexOf("/commodity/detail/") >= 0) {
        vm.isTipShow = true;
      }
      next();
    });
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 100%;
  height: 50%;
  text-align: center;
  .banner {
    width: 80%;
    height: 60%;
  }
  .sorry {
    font-size: 30px;
    font-weight: bold;
  }
  .link {
    color: #0b72a4;
  }

  /deep/ .van-popup {
    padding: 20px;
  }
}
</style>

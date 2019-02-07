<template>
  <div class="container">
    <sticky-header>
      <p slot="title" class="page-title">{{ title }}</p>
    </sticky-header>
    <div class="main-row">
      <van-cell-group>
        <van-cell v-for="(item, index) in cellItem" :key="index" is-link>
          <template slot="title">
            <span>{{item}}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <footer class="logout-footer" @click="logout">
      <span>退出登录</span>
    </footer>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import StickyHeader from "../components/StickyHeader";
export default {
  name: "Set",
  components: {
    StickyHeader
  },
  data() {
    return {
      title: "个人中心",
      cellItem: [
        "地址管理",
        "经营证照",
        "协议规则",
        "小米商城用户协议",
        "小米账户使用协议",
        "隐私协议"
      ]
    };
  },
  methods: {
    ...mapActions(["logout"]),
    logout() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认退出登录吗？"
        })
        .then(() => {
          this.$store.dispatch("logout");
          this.$router.push({
            path: "/"
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  overflow-y: hidden;
}
.page-title {
  margin: 0 auto;
}
.main-row {
  position: relative;
  margin-top: 50px;

  /deep/ .van-cell {
    font-size: 25px;
    padding: 15px;
  }
}

.logout-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: #eeeeee;
  text-align: center;
  animation: footer-fading 0.6s ease;
  span {
    font-size: 30px;
    height: 80px;
    line-height: 80px;
  }
}

@keyframes footer-fading {
  0% {
    opacity: 0;
    transform: translate3d(0, 60px, 0);
  }
  50% {
    opacity: 1;
    transform: translate3d(0, 60px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>

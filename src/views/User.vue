<template>
  <div>
    <div class="container">
      <div class="header">
        <div class="user">
          <div class="login-img" @click="showTip">
            <img :src="require('../assets/img/login-avatar.png')" alt="login-avatar">
          </div>
          <div class="sign" v-if="loginUserName">
            <p class="login-user">{{ loginUserName }}</p>
            <p class="login-id">{{ loginId }}</p>
          </div>
          <div class="sign" v-else>登录/注册</div>
        </div>
      </div>
      <div class="my-order">
        <div class="cite">我的订单</div>
        <div class="all-order">
          <!-- todo:做嵌套路由 -->
          <!-- <router-link :to="{name: 'Order', params: {orderType}, query: {type: 7}}">
					全部订单
          </router-link>-->
          <router-link to="/order/list" class="all">全部订单</router-link>
          <span class="more"></span>
        </div>
      </div>
      <ul class="service">
        <li v-for="(item, index) in serviceList" :key="index" class="service-item">
          <router-link
            :to="{name: 'Order', params: {orderType}, query: {type: item.id}}"
            class="service-link"
          >
            <!--<div class="service-row-icon">-->
            <img :src="require('../assets/img/' + item.img)" alt="{item.img}" class="service-icon">
            <!--</div>-->
            <span class="service-row-info">{{item.name}}</span>
          </router-link>
        </li>
      </ul>
      <ul class="row-items">
        <li v-for="(item, index) in routes" class="row-li" :key="index">
          <img :src="require('../assets/img/' + item.img)" alt="{item.img}">
          <span @click="toPage(item.path)" class="row-link">{{item.info}}</span>
        </li>
      </ul>
    </div>
    <van-dialog
      v-model="isTipShow"
      show-cancel-button
      cancelButtonText="不同意"
      confirmButtonText="同意"
      :confirm="toLogin"
      :before-close="toLogin"
    >
      <div class="dialog-wrapper">
        <p class="title">协议声明</p>
        <p class="agreement">《小米商城用户协议》《账号协议》《隐私政策》</p>
        <p class="tip">请您仔细阅读以上协议，其中有对您权利义务的特别约定等重要条款，同意后方可使用本软件</p>
      </div>
    </van-dialog>
    <sticky-footer :activePage="3"></sticky-footer>
  </div>
</template>
<script>
import StickyFooter from "../components/StickyFooter";
import Mpointsmall from "../components/Mpointsmall";
import Coupon from "../components/Coupon";
import Services from "../components/Services";
import Mihome from "../components/Mihome";
import Fcode from "../components/Fcode";
import Setting from "../components/Setting";
import Maplocation from "../components/Maplocation";
import { mapGetters } from "vuex";

export default {
  name: "user",
  components: {
    StickyFooter,
    Mpointsmall,
    Coupon,
    Services,
    Mihome,
    Fcode,
    Setting,
    Maplocation
  },
  data() {
    return {
      loginId: new Date().getTime(), // 用户的ID，用时间戳来代替
      isTipShow: false,
      orderType: "list",
      serviceList: [
        {
          id: 7,
          name: "待付款",
          img: "unpay.png"
        },
        {
          id: 8,
          name: "待收货",
          img: "receipt.png"
        },
        {
          id: 9,
          name: "退换修",
          img: "return.png"
        }
      ],
      routes: [
        { path: "/mpointsmall", img: "vip.png", info: "会员中心" },
        { path: "/user/coupon", img: "wallet.png", info: "我的优惠" },
        { path: "/services", img: "service.png", info: "服务中心" },
        {
          path: "/maplocation",
          img: "mihome.png",
          info: "小米之家"
        },
        { path: "/fcode", img: "fcode.png", info: "F码" },
        { path: "/user/set", img: "setting.png", info: "设置" }
      ]
    };
  },
  computed: {
    ...mapGetters(["loginUserName"])
  },
  methods: {
    toPage(route) {
      this.$router.push({
        path: route
      });
    },
    showTip() {
      if (!this.loginUserName) {
        this.isTipShow = true;
      } else {
        return;
      }
    },
    // 跳转到登录页
    toLogin(action, done) {
      if (action === "confirm") {
        this.$router.push({
          path: "login"
        });
      } else {
        done();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  margin: 0 auto;
  padding: 0;
  background-color: rgba(150, 150, 150, 0.15);
  .header {
    background: url(../assets/img/login-bg.png) center 0 #f37d0f;
    background-size: auto 100%;
    padding: 20px 0;
  }
}
.user {
  display: flex;
  align-items: center;
  .login-img {
    margin: 0 10px 0 20px;
    width: 70px;
    height: 70px;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 100%;
    border: 3px solid hsla(0, 0%, 100%, 0.4);
    text-align: center;
    img {
      width: auto;
      height: 100%;
      margin: 0 auto;
      border-style: none;
    }
  }
  .sign {
    color: #fff;
    font-size: 16px;
    text-align: left;
  }
}
.my-order {
  position: relative;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  .cite {
    font-size: 16px;
    padding-right: 8px;
    color: rgba(0, 0, 0, 0.9);
    padding-left: 8px;
  }
  .all-order {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    .all {
      outline: none;
      color: rgba(0, 0, 0, 0.9);
      padding-right: 8px;
      &:after {
        content: "";
        position: absolute;
        right: 10px;
        top: 50%;
        width: 10px;
        height: 10px;
        border-left: 1px solid currentColor;
        border-top: 1px solid currentColor;
        transform: translate3d(0, -50%, 0) rotate(135deg);
      }
    }
  }
}
.service {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 10px;
  background-color: #fff;
  margin: 0;
  list-style: none;
  .service-item {
    display: flex;
    align-content: space-between;
    padding: 6px 0;
    .service-link {
      outline: 0;
      .service-icon {
        display: block;
        width: 30px;
        height: 30px;
        margin: 0 auto 6px;
      }
      .service-row-info {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
}
.row-items {
  padding: 0;
  width: 100%;
  // padding-left: 25px;
  .row-li {
    background-color: #fff;
    position: relative;
    color: rgba(0, 0, 0, 0.5);
    line-height: 0;
    padding: 20px 0;
    padding-left: 25px;
    .row-link {
      padding-right: 15px;
      padding-left: 30px;
      height: 30px;
      line-height: 30px;
      vertical-align: middle;
      font-size: 25px;
      font-weight: 400;
      color: #969696;
    }
    &:nth-child(odd) {
      border-bottom: 1px solid rgba(150, 150, 150, 0.15);
    }
    &:nth-child(even) {
      margin-bottom: 10px;
    }
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
  }
}
.dialog-wrapper {
  width: 80%;
  margin: 0 auto;

  .title {
    margin-top: 30px;
    text-align: center;
    font-size: 25px;
  }
  .agreement {
    color: #ff6700;
  }
  .tip {
    color: #666666;
  }
}
</style>
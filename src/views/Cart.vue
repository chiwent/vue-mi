<template>
  <div class="container">
    <sticky-header>
      <p slot="title" class="page-title">{{ title }}</p>
    </sticky-header>
    <template v-if="isLogined">
      <template v-if="cartList.length > 0">
        <article class="main-content">
          <!-- <template> -->
          <section class="product-item" v-for="(cartItem, cartIndex) in cartList" :key="cartIndex"></section>
          <!-- </template> -->
        </article>
        <footer class="cart-footer">
          <van-row>
            <van-col span="8" class="caculate">
              <!-- <p class="num">共{{ totalNum }}件 金额:</p> -->
              <p class="price">
                <!-- <span>{{ totalPrice }}</span>元 -->
              </p>
            </van-col>
            <van-col span="8" class="continue">
              <p>继续购物</p>
            </van-col>
            <van-col span="8" class="settle">
              <p>去结算</p>
            </van-col>
          </van-row>
        </footer>
      </template>
      <template v-else>
        <div class="empty-wrapper">
          <section class="second-row">
            <img :src="require('../assets/img/empty-cart.png')" alt="cart">
            <span class="tip">购物车还是空的</span>
            <router-link class="link" to="/">去逛逛</router-link>
          </section>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="empty-wrapper">
        <section class="first-row">
          <span class="title">登录后享受更多优惠</span>
          <router-link class="link" to="/login">去登录</router-link>
        </section>
        <section class="second-row">
          <img :src="require('../assets/img/empty-cart.png')" alt="cart">
          <span class="tip">购物车还是空的</span>
          <router-link class="link" to="/">去逛逛</router-link>
        </section>
      </div>
    </template>
  </div>
</template>
<script>
import StickyHeader from "../components/StickyHeader";
import { getCartList } from "@/utils/api";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    StickyHeader
  },
  data() {
    return {
      title: "购物车",
      cartList: []
    };
  },
  computed: {
    ...mapGetters(["isLogined"])
  },
  methods: {
    /**
     * 获取购物车详情
     */
    getList() {
      getCartList({
        userName: this.loginUserName,
        token: this.loginUserToken
      })
        .then(res => {
          if (JSON.stringify(res) !== "{}") {
            this.cartList = res.cartList;
          } else {
            this.cartList = null;
          }
        })
        .catch(err => {
          this.$notify({
            message: "网络异常！"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.page-title {
  margin: 0 auto;
}
.main-content {
  margin-top: 50px;
}

// 购物车为空时
.empty-wrapper {
  width: 100%;
  margin-top: 50px;
  box-sizing: border-box;
  .first-row {
    height: 50px;
    padding: 20px;
    line-height: 50px;
    .title {
      font-size: 30px;
    }
    .link {
      float: right;
      font-size: 22px;
      color: #aaaaaa;
      &::after {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-left: 5px;
        border-right: 2px solid #aaaaaa;
        border-top: 2px solid #aaaaaa;
        transform: rotate(45deg);
      }
    }
  }
  .second-row {
    position: relative;
    height: 70px;
    text-align: center;
    background-color: #eeeeee;
    img {
      width: 55px;
      height: 55px;
      vertical-align: middle;
    }
    .tip {
      margin: 0 15px;
      font-size: 23px;
      line-height: 70px;
      color: #aaaaaa;
      vertical-align: middle;
    }
    .link {
      display: inline-block;
      width: 80px;
      height: 30px;
      line-height: 30px;
      font-size: 21px;
      border: 1px solid #999999;
      vertical-align: middle;
    }
  }
}
</style>

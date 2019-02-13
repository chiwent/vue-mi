<template>
  <div class="container">
    <sticky-header>
      <p slot="title" class="page-title">{{ title }}</p>
    </sticky-header>
    <template v-if="isLogined">
      <template v-if="cartList.length > 0">
        <article class="main-content">
          <!-- <section class="product-item" v-for="(cartItem, cartIndex) in cartList" :key="cartIndex"></section> -->
          <van-checkbox-group v-model="cartGroup">
            <van-checkbox v-for="(item, index) in cartList" :key="item" :name="item">
              <img :src="require('../assets/img/' + item.img)" alt class="good-img">
              <h3 class="title">{{ item.product }}</h3>
              <span class="price">售价：{{ item.price }}元</span>
              <div class="controller">
                <div class="stepper">
                  <input
                    type="button"
                    value="-"
                    :disabled="item.num === 1"
                    class="control"
                    @click.stop="item.num--"
                  >
                  <input type="number" value="1" v-model="item.num" class="input">
                  <input
                    type="button"
                    value="+"
                    :disabled="item.num >= 10"
                    class="control"
                    @click.stop="item.num++"
                  >
                </div>
                <div class="delete-btn">
                  <i class="del-icon"></i>
                </div>
              </div>

              <div class="additional-service">
                <div class="insure" v-if="item.insure">
                  <i class="insurance"></i>
                  <span class="title">意外保护</span>
                  <span class="price">{{ item.insure }}元起</span>
                  <span class="select-btn">选购</span>
                </div>
                <div class="warranty" v-if="item.warranty">
                  <i class="insurance"></i>
                  <span class="title">延长保修服务</span>
                </div>
                <div class="bouns" v-if="bouns">
                  <img :src="require('../assets/img/mifancard-cart.jpg')" alt class="bouns-img">
                  <div class="title">
                    <span class="tag">赠品</span>
                    <span class="word">米粉卡日租卡</span>
                  </div>
                  <div class="stepper">
                    <input type="button" value="-" disabled class="control">
                    <input type="number" value="1" disabled class="input">
                    <input type="button" value="+" disabled class="control">
                  </div>
                </div>
              </div>
            </van-checkbox>
          </van-checkbox-group>

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
      title: "购物车"
    };
  },
  computed: {
    ...mapGetters(["loginUserName", "loginUserToken", "isLogined", "cartList"])
  },
  mounted() {
    console.log(this.cartList);
  },
  methods: {
    checkCart() {
      getCartList({
        userName: this.loginUserName,
        token: this.loginUserToken
      })
        .then(res => {
          if (JSON.stringify(res) !== "{}") {
            this.$store.dispatch("initCart", res.cartList);
          }
        })
        .catch(err => {
          this.$notify({
            message: "获取购物车信息失败!"
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

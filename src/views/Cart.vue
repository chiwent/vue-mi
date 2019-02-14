<template>
  <div class="container">
    <sticky-header>
      <p slot="title" class="page-title">{{ title }}</p>
    </sticky-header>
    <template v-if="isLogined">
      <template v-if="cartList.length > 0">
        <article class="main-content">
          <!-- <section class="product-item" v-for="(cartItem, cartIndex) in cartList" :key="cartIndex"></section> -->
          <!-- <van-checkbox-group v-model="cartGroup" class="checkbox-group">
            <van-checkbox
              class="checkbox"
              v-for="(item, index) in cartList"
              :key="index"
              :name="item.product"
            >
              <div class="content-container">
                <img :src="require('../assets/img/' + item.img)" alt class="good-img">
                <div class="content-wrapper">
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
                <div class="bouns" v-if="item.bouns">
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
          </van-checkbox-group>-->
          <div class="content-container">
            <div class="product-row" v-for="(item, index) in cartList" :key="index">
              <div class="main-product">
                <label class="checkbox-label">
                  <input type="checkbox" :value="item.product" v-model="selectedItem">
                  <i class="icon" :class="{'icon-active': selectedItem.indexOf(item.product) > -1}"></i>
                </label>
                <div class="product-wrapper">
                  <img :src="require('../assets/img/' + item.img)" alt class="good-img">
                  <div class="product-detail">
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
                  </div>
                </div>
              </div>
              <div class="additional-service" v-if="selectedItem.indexOf(item.product) > -1">
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
                <div class="bouns" v-if="item.bouns">
                  <img :src="require('../assets/img/mifancard-cart.jpg')" alt class="bouns-img">
                  <div class="controller">
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
              </div>
            </div>
          </div>
        </article>
        <footer class="cart-footer">
          <div class="col first-col">
            <p class="desc">共{{ totalNum }}件 金额：</p>
            <p class="price">
              <span>{{ totalPrice }}</span>元
            </p>
          </div>
          <div class="col second-col">
            <p>继续购物</p>
          </div>
          <div class="col third-col">
            <p>去结算</p>
          </div>
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
      cartGroup: [],
      selectedItem: [], // 选中的条目
      totalNum: 0, // 选中的商品总数
      totalPrice: 0 //  选中商品总金额
    };
  },
  computed: {
    ...mapGetters(["loginUserName", "loginUserToken", "isLogined", "cartList"])
  },
  created() {
    this.checkCart();
  },
  mounted() {},
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

.content-container {
  .product-row {
    padding: 4% 2%;
    box-sizing: border-box;
    border-top: 1px solid #eeeeee;
    .main-product {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .checkbox-label {
      display: inline-block;
      width: 25px;
      height: 25px;
      border: none;
      border-radius: 50%;
      vertical-align: middle;
    }
    .checkbox-label input[type="checkbox"] {
      display: none;
    }
    .checkbox-label .icon {
      display: inline-block;
      width: 100%;
      height: 100%;
      outline: none;
      background: url("../assets/img/check_normal.png") no-repeat center center;
      background-size: 100% 100%;
    }
    .checkbox-label .icon-active {
      background: url("../assets/img/check_press.png") no-repeat center center;
      background-size: 100% 100%;
    }
    .stepper {
      display: inline-block;
      height: 40px;
      margin: auto;
      font-size: 0;
      input[type="button"] {
        @extend %e-clear-spacing;
        width: 40px;
        height: 40px;
        font-size: 40px;
        line-height: 40px;
        text-align: center;
        &:not(:disabled) {
          color: #676767;
          background-color: #cccccc;
        }
        &:disabled {
          color: #787878;
          background-color: #f2f2f2;
        }
      }
      input[type="number"] {
        @extend %e-clear-spacing;
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        background-color: #ffffff;
        font-size: 25px;
        text-align: center;
        vertical-align: top;
        border-left: hidden;
        border-right: hidden;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
      }
    }
    .product-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      .good-img {
        width: 140px;
        height: 140px;
      }
      .product-detail {
        .title {
          @extend %e-clear-spacing;
          font-size: 24px;
          font-weight: 500;
        }
        .price {
          display: block;
          margin: 15px 0;
          color: #aaaaaa;
        }
        .controller {
          position: relative;
          .delete-btn {
            position: absolute;
            top: 0;
            right: 20px;
            bottom: 0;
            margin: auto;
            width: 30px;
            height: 30px;
            i {
              display: block;
              width: 100%;
              height: 100%;
              background: url("../assets/img/delete-cart.png") no-repeat center
                center;
              background-size: cover;
            }
          }
        }
      }
    }
    .additional-service {
      padding: 15px 10px;
      .insure {
        padding: 0 20px;
        height: 50px;
        background-color: #f6f6f6;
        .insurance {
          display: inline-block;
          margin-right: 15px;
          width: 30px;
          height: 30px;
          background: url("../assets/img/insurance.png") no-repeat center center;
          background-size: cover;
          vertical-align: middle;
        }
        span {
          height: 50px;
          line-height: 50px;
          vertical-align: middle;
        }
        .select-btn {
          float: right;
          color: $mi-deep-origin;
        }
      }
      .bouns {
        position: relative;
        .bouns-img {
          width: 140px;
          height: 140px;
          vertical-align: middle;
        }
        .controller {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          margin: auto;
          display: inline-block;
          .title {
            height: 30px;
            line-height: 30px;
            margin-bottom: 10px;
            .tag {
              padding: 5px;
              margin-right: 15px;
              color: #ffffff;
              background-color: #5b77d6;
            }
            .word {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
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

.cart-footer {
  @extend %e-clear-spacing;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  font-size: 0;
  p {
    @extend %e-clear-spacing;
  }
  .col {
    @extend %e-clear-spacing;
    display: inline-block;
    width: 33.33333%;
    height: 70px;
    vertical-align: top;
    text-align: center;
  }
  .first-col {
    .desc,
    .price {
      color: #aaaaaa;
      font-size: 20px;
    }
    .desc {
      margin-bottom: 10px;
    }
    .price span {
      padding-right: 10px;
      font-size: 38px;
      font-weight: bold;
      color: $mi-deep-origin;
    }
  }
  .second-col {
    background-color: #f4f4f4;
  }
  .third-col {
    color: #ffffff;
    background-color: $mi-deep-origin;
  }
  .second-col,
  .third-col {
    font-size: 20px;
    p {
      height: 70px;
      line-height: 70px;
    }
  }
}
</style>

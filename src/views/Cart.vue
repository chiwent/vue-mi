<template>
  <div class="container">
    <sticky-header>
      <p slot="title" class="page-title">{{ title }}</p>
    </sticky-header>
    <template v-if="isLogined">
      <template v-if="cartList.length > 0">
        <article class="main-content">
          <div class="content-container">
            <div class="product-row" v-for="(item, index) in cartList" :key="index">
              <div class="main-product">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    :value="index"
                    v-model="selectedItem"
                    @click.stop="selectProduct(index)"
                  >
                  <i class="icon" :class="{'icon-active': selectedItem.indexOf(index) > -1}"></i>
                </label>
                <div class="product-wrapper">
                  <img :src="require('../assets/img/' + item.img)" alt class="good-img">
                  <div class="product-detail">
                    <h3 class="title">{{ item.product }} {{ item.param }}</h3>
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
                      <div class="delete-btn" @click="deleteProduct(index)">
                        <i class="del-icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="additional-service" v-if="selectedItem.indexOf(index) > -1">
                <!-- 意外保护 - 选购 -->
                <div class="insure" v-if="item.insure && insureNum === 0">
                  <i class="insurance"></i>
                  <span class="title">意外保护</span>
                  <span class="price">{{ Math.min(...item.insure) }}元起</span>
                  <span class="select-btn" @click.stop="showPopup(index)">选购</span>
                </div>
                <!-- 延长保修服务 - 选购 -->
                <div class="insure" v-if="item.warranty && warrantyNum === 0">
                  <i class="insurance"></i>
                  <span class="title">延长保修服务</span>
                  <span class="price">{{ item.warranty }}元起</span>
                  <span class="select-btn" @click.stop="showPopup(index)">选购</span>
                </div>

                <!-- 选中的意外服务 -->
                <div class="selected-service" v-if="insureNum > 0">
                  <img :src="require('../assets/img/insure.jpg')" alt class="bouns-img">
                  <div class="controller">
                    <div class="desc">
                      <p>
                        <span
                          class="title"
                        >{{ item.product }} {{ InsureService[item.selectedInsure] }}</span>
                        <span class="re-select" @click.stop="isInsurePopup = true">重选</span>
                      </p>
                      <p class="price">售价：{{ item.insure[item.selectedInsure] }}元</p>
                    </div>
                    <div class="stepper">
                      <input type="button" value="-" disabled class="control">
                      <input type="number" value="1" disabled class="input">
                      <input type="button" value="+" disabled class="control">
                    </div>
                  </div>
                </div>

                <!-- 选中的延长保修服务 -->
                <div class="selected-service" v-if="warrantyNum > 0">
                  <img :src="require('../assets/img/insure.jpg')" alt class="bouns-img">
                  <div class="controller">
                    <div class="desc">
                      <p>
                        <span class="title">{{ item.product }} 延长保修服务</span>
                        <span class="re-select" @click.stop="isInsurePopup = true">重选</span>
                      </p>
                      <p class="price">售价：{{ item.warranty }}元</p>
                    </div>
                    <div class="stepper">
                      <input type="button" value="-" disabled class="control">
                      <input type="number" value="1" disabled class="input">
                      <input type="button" value="+" disabled class="control">
                    </div>
                  </div>
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
              <van-popup
                class="insure-popup"
                position="bottom"
                v-model="isInsurePopup"
                v-if="isInsurePopup"
              >
                <div class="header">
                  <span class="title">购买服务</span>
                  <i class="close-btn" @click="isInsurePopup = false"></i>
                </div>
                <div class="row">
                  <p class="title">
                    <span class="title-1">意外保护</span>
                    <span class="title-2"></span>
                  </p>
                  <button
                    class="protect-btn"
                    v-for="(insureItem, insureIndex) in cartList[serviceIndex].insure"
                    :class="{'active': cartList[serviceIndex].selectedInsure === insureIndex}"
                    :key="insureIndex"
                    @click="selectInsure(serviceIndex, insureIndex)"
                  >
                    <span class="title">{{ InsureService[insureIndex] }}</span>
                    <span class="price">{{ insureItem }}元</span>
                  </button>
                </div>
                <div class="row">
                  <p class="title">
                    <span class="title-1">延长保修</span>
                    <span class="title-2"></span>
                  </p>
                  <button
                    class="protect-btn"
                    :class="{'active': cartList[serviceIndex].selectedWarranty}"
                    @click="selectWarranty(serviceIndex)"
                  >
                    <span class="title">延长保修服务</span>
                    <span class="price">{{ cartList[serviceIndex].warranty }}元</span>
                  </button>
                </div>
                <div class="btn-wrapper">
                  <div class="half-col summary">已选择 {{ insureNum + warrantyNum}} 项服务</div>
                  <div class="half-col btn" @click.stop="submitService">确定</div>
                </div>
              </van-popup>
            </div>
          </div>
          <!-- <p>price: {{ insurePrice }}</p> -->
          <!-- <p>{{selectedItem}}</p> -->
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Cart",
  components: {
    StickyHeader
  },
  data() {
    return {
      isInsurePopup: false,
      serviceIndex: void 0,
      // selectedInsure: void 0,
      activeWarranty: false,
      InsureService: ["全年意外保障服务", "全年碎屏保障服务"],
      title: "购物车",
      cartGroup: [],
      insurePopup: false,
      selectedItem: [] // 选中的条目
    };
  },
  computed: {
    ...mapGetters(["loginUserName", "loginUserToken", "isLogined", "cartList"]),
    /**
     * 选择的商品数目
     */
    totalNum() {
      let amount = 0;
      for (let i = 0, len = this.selectedItem.length; i < len; i++) {
        let _index = this.selectedItem[i];
        amount += this.cartList[_index].num;
      }
      return amount;
    },
    /**
     * 选中的意外服务数
     */
    insureNum() {
      if (this.serviceIndex !== undefined) {
        let _num =
          this.cartList[this.serviceIndex].selectedInsure !== undefined ? 1 : 0;
        return _num;
      } else {
        return 0;
      }
    },
    /**
     * 选中的延长保修数
     */
    warrantyNum() {
      if (this.serviceIndex !== undefined) {
        let _num =
          this.cartList[this.serviceIndex].selectedWarranty !== undefined
            ? 1
            : 0;
        return _num;
      } else {
        return 0;
      }
    },
    /**
     * 总金额
     */
    totalPrice() {
      let productPrice = 0,
        insurePrice = 0,
        warrantyPrice = 0;
      for (let i = 0; i < this.selectedItem.length; i++) {
        let _index = this.selectedItem[i];
        productPrice += this.cartList[_index].price * this.cartList[_index].num;
        if (this.cartList[_index].selectedInsure !== undefined) {
          let _insureIndex = this.cartList[_index].selectedInsure;
          insurePrice +=
            this.cartList[_index].insure[_insureIndex] *
            this.cartList[_index].num;
        }
        if (this.cartList[_index].selectedWarranty !== undefined) {
          warrantyPrice +=
            this.cartList[_index].warranty * this.cartList[_index].num;
        }
      }

      return parseInt(productPrice + insurePrice + warrantyPrice);
    }
  },
  created() {
    // this.checkCart();
  },
  mounted() {},
  methods: {
    ...mapActions(["deleteCart"]),
    /**
     * 获取购物车信息
     */
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
    },
    showPopup(index) {
      this.isInsurePopup = true;
      this.serviceIndex = index;
    },
    /**
     * 反选产品，如果取消选择商品，要清除对应的服务费用
     */
    selectProduct(index) {
      if (this.selectedItem.indexOf(index) < 0) {
        this.$delete(this.cartList[index], "selectedInsure");
        this.$delete(this.cartList[index], "selectedWarranty");
      }
    },
    /**
     * 删除产品
     */
    deleteProduct(index) {
      this.$store.dispatch("deleteCart", index);
      this.$delete(this.cartList[index], "selectedInsure");
      this.$delete(this.cartList[index], "selectedWarranty");
    },
    /**
     * 选择意外保护服务
     */
    selectInsure(index, insureIndex) {
      this.$nextTick(() => {
        if (
          this.cartList[index].selectedInsure === undefined ||
          this.cartList[index].selectedInsure !== insureIndex
        ) {
          this.$set(this.cartList[index], "selectedInsure", insureIndex);
        } else {
          this.$delete(this.cartList[index], "selectedInsure");
        }
      });
    },
    /**
     * 选择延长保修服务
     */
    selectWarranty(index) {
      this.$nextTick(() => {
        if (this.cartList[index].selectedWarranty === undefined) {
          this.$set(this.cartList[index], "selectedWarranty", true);
        } else {
          this.$delete(this.cartList[index], "selectedWarranty");
        }
      });
    },
    /**
     * 提交服务
     */
    submitService() {
      this.isInsurePopup = false;
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
        position: relative;
        padding: 0 20px;
        margin-bottom: 20px;
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
      .bouns,
      .selected-service {
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
          min-width: 300px;
          p {
            @extend %e-clear-spacing;
          }
          div.desc {
            width: 100%;
          }
          span.title {
            font-size: 23px;
            color: #666666;
          }
          span.re-select {
            float: right;
            font-size: 23px;
            color: #888888;
          }
          p.price {
            margin-bottom: 10px;
            font-size: 18px;
            color: #999999;
          }
          div.title {
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
    .insure-popup {
      height: 40%;
      .header {
        @extend %e-clear-spacing;
        position: relative;
        height: 50px;
        text-align: center;
        &::after {
          content: "";
          display: block;
          width: 90%;
          height: 1.5px;
          margin: 0 auto;
          background-color: #cccccc;
        }
        .title {
          @extend %e-clear-spacing;
          display: inline-block;
          height: 50px;
          line-height: 50px;
          font-size: 30px;
          font-weight: 500;
          color: #666666;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 20px;
          display: inline-block;
          width: 25px;
          height: 25px;
          background: url("../assets/img/close.png") no-repeat center center;
          background-size: cover;
        }
      }
      .row {
        padding: 20px;
        .title {
          @extend %e-clear-spacing;
          margin-bottom: 15px;
          span {
            font-size: 23px;
          }
        }

        .protect-btn {
          @extend %e-clear-spacing;
          padding: 0 10px;
          width: 45%;
          height: 40px;
          background-color: #ffffff;
          border: 1px solid #aaaaaa;
          &.active {
            color: $mi-deep-origin;
            border-color: $mi-deep-origin;
          }
          &:nth-of-type(2) {
            margin-left: 5%;
          }
          span {
            @extend %e-clear-spacing;
            height: 40px;
            line-height: 40px;
          }
          .title {
            float: left;
          }
          .price {
            float: right;
          }
        }
      }
      .btn-wrapper {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 80px;
        font-size: 0;
        .half-col {
          display: inline-block;
          width: 50%;
          height: 80px;
          line-height: 80px;
          text-align: center;
          vertical-align: top;
        }
        .summary {
          font-size: 20px;
        }
        .btn {
          color: #ffffff;
          background-color: $mi-deep-origin;
          font-size: 30px;
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
  background-color: #ffffff;
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
      margin-top: 10px;
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
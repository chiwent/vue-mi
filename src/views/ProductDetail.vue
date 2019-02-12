<template>
  <div class="product-container">
    <div v-if="!!productDetail">
      <section class="top-header">
        <span @click="goBack" class="top-icon top-icon-left">
          <i class="icon-back"></i>
        </span>
        <span @click="share" class="top-icon top-icon-right">
          <i class="icon-share"></i>
        </span>
      </section>
      <section class="banner-swiper-container">
        <swiper :options="bannerOption">
          <swiper-slide
            v-for="(swiperItem, swiperIndex) in productDetail.swiperBanner"
            :key="swiperIndex"
          >
            <img :src="require('../assets/img/' + swiperItem)" alt class="banner-img">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </section>
      <section class="detail-container">
        <h3 class="title">{{ productDetail.title }}</h3>
        <p class="selling">{{ productDetail.sell }}</p>
        <p class="desc">{{ productDetail.desc }}</p>
        <div class="price-wrapper">
          <span class="now-price">￥{{ productDetail.type[paramsIndex].price }}</span>
          <span
            class="origin-price"
            v-if="productDetail.type[paramsIndex].oPrice"
          >￥{{ productDetail.type[paramsIndex].oPrice }}</span>
        </div>
      </section>
      <section class="parameter">
        <swiper :options="paramOption">
          <swiper-slide v-for="(paramItem, paramIndex) in productDetail.params" :key="paramIndex">
            <div class="param-wrapper">
              <img :src="require('../assets/img/' + paramItem.img)" alt class="top-img">
              <p class="first-desc">{{ paramItem.fDesc }}</p>
              <p class="second-de">{{ paramItem.sDesc }}</p>
            </div>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </section>
      <section class="mid-row promotion" @click="isPromoShow = true">
        <span class="title">促销</span>
        <div class="desc-wrapper">
          <span class="icon">赠品</span>
          <span class="desc">赠米粉卡，最高含100元话费</span>
        </div>
        <span class="arrow"></span>
      </section>
      <van-popup class="promo-popup" v-model="isPromoShow" position="bottom">
        <div class="header">
          <h3 class="title">促销</h3>
          <span class="close-btn" @click="isPromoShow = false"></span>
        </div>
        <div class="content">
          <div class="icon">赠品</div>
          <p class="desc">赠米粉卡，最高含100元话费</p>
        </div>
      </van-popup>
      <section class="mid-row cycle">
        <span class="title">换机</span>
        <span class="desc">高价回收，极速到账换新机</span>
        <span class="arrow"></span>
      </section>

      <section class="third-row">
        <section class="selected" @click="isProductShow = true">
          <span class="title">已选</span>
          <span
            class="detail"
          >{{ productDetail.title }} {{ selectedParam.content }} {{ selectedParam.color }} × {{ totalNum }}</span>
          <div class="arrow"></div>
        </section>

        <!-- 购物车详情 -->
        <van-popup class="product-popup" v-model="isProductShow" position="bottom">
          <div class="popup-wrapper">
            <div class="header">
              <span class="close-btn" @click.stop="isProductShow = false"></span>
              <div class="product-title">
                <img
                  :src="require('../assets/img/' + productDetail.imgs[colorIndex])"
                  class="product-img"
                >
                <div class="price">
                  <div class="wrapper">
                    <span
                      class="now-price"
                    >￥{{ (selectedParam.price + (selectedParam.insure ? selectedParam.insure : 0) + (selectedParam.warranty ? selectedParam.warranty : 0)) * totalNum }}</span>
                    <span
                      class="old-price"
                      v-if="productDetail.type[paramsIndex].oPrice"
                    >￥{{ productDetail.type[paramsIndex].oPrice }}</span>
                  </div>
                  <p class="desc">{{ productDetail.title }} {{ selectedParam.content }}</p>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="version">
                <p class="title">版本</p>
                <button
                  class="version-btn"
                  v-for="(item, index) in productDetail.type"
                  :key="index"
                  :class="{'version-selected': paramsIndex === index}"
                  @click="selectVersion(index)"
                >
                  <span>{{ item.content }} 全网通</span>
                  <span>{{ item.price }}</span>
                </button>
              </div>
              <div class="color">
                <p class="title">颜色</p>
                <button
                  class="color-btn"
                  v-for="(item, index) in (paramsIndex !== undefined ? productDetail.type[paramsIndex].color : defaultParam.color)"
                  :class="{'color-selected': index === colorIndex}"
                  :key="index"
                  @click="selectColor(index)"
                >{{ item.c }}</button>
              </div>
              <div class="amount">
                <span class="title">购买数量</span>
                <div class="stepper">
                  <input
                    type="button"
                    value="-"
                    :disabled="totalNum === 1"
                    class="control"
                    @click.stop="totalNum--"
                  >
                  <input type="number" value="1" v-model="totalNum" class="input">
                  <input
                    type="button"
                    value="+"
                    :disabled="totalNum >= 10"
                    class="control"
                    @click.stop="totalNum++"
                  >
                </div>
              </div>
              <div class="protect">
                <p class="p-title">
                  意外保护
                  <i></i>
                </p>
                <button
                  class="protect-btn"
                  v-for="(item, index) in productDetail.type[paramsIndex].insure"
                  :class="{'active': protectIndex === index}"
                  :key="index"
                  @click="selectProtect(index)"
                >
                  <span class="title">全年意外保障服务</span>
                  <span class="price">{{ item }}元</span>
                </button>
              </div>
              <div class="warranty">
                <p class="p-title">
                  延长保修
                  <i></i>
                </p>
                <button
                  class="protect-btn"
                  @click="selectWarranty"
                  :class="{'active': hasWarranty}"
                >
                  <span class="title">延长保修服务</span>
                  <span class="price">{{ productDetail.type[paramsIndex].warranty }}元</span>
                </button>
              </div>
            </div>
            <div class="submit-btn-wrapper">
              <button class="submit-cart" @click="addToCart">加入购物车</button>
            </div>
          </div>
        </van-popup>

        <section class="send-to"></section>
        <section class="rules" @click="isRuleShow = true">
          <div class="rule-item" v-for="(ruleItem, ruleIndex) in rules" :key="ruleIndex">
            <i class="icon"></i>
            <span class="rule-desc">{{ ruleItem }}</span>
          </div>
          <div class="arrow"></div>
        </section>
        <van-popup class="rules-popup" v-model="isRuleShow" position="bottom">
          <div class="header">
            <h3 class="title">服务说明</h3>
            <span class="close-btn" @click="isRuleShow = false"></span>
          </div>
          <div class="content">
            <div class="content-wrapper" v-for="(item, index) in serviceList" :key="index">
              <div class="icon"></div>
              <div class="word">
                <h3 class="title">{{ item.title }}</h3>
                <p class="desc" v-if="item.desc">{{ item.desc }}</p>
                <div class="arrow" v-if="index === 4"></div>
              </div>
            </div>
          </div>
        </van-popup>
      </section>
      <section class="comment">
        <swiper :option="commentOption">
          <swiper-slide
            class="comment-slide"
            v-for="(commentItem, commentIndex) in productDetail.comments"
            :key="commentIndex"
          >
            <div class="comment-wrapper">
              <div class="header">
                <img :src="require('../assets/img/' + commentItem.avatar)" alt class="avatar">
                <div class="user-info">
                  <div class="user-id">{{ commentItem.id }}</div>
                  <div class="user-date">{{ commentItem.date }}</div>
                </div>
                <div class="like">
                  <i ref="icon" @click.stop="likeIt(commentIndex)"></i>
                  <span class="num">{{ commentItem.likes }}</span>
                </div>
              </div>
              <p class="word">{{ commentItem.msg }}</p>
              <div class="content">
                <div
                  class="comment-img-wrapper"
                  v-for="(cImgItem, cImgIndex) in commentItem.cImg"
                  :key="cImgIndex"
                >
                  <img :src="require('../assets/img/' + cImgItem)" alt class="comment-img">
                </div>
              </div>
              <div class="reply-wrapper" v-if="!!commentItem.reply">
                <span class="title">官方回复：</span>
                <span class="reply">{{ commentItem.reply }}</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </section>

      <div class="sticky-bar">
        <router-link to="/" class="bar-item">
          <div class="wrapper">
            <img :src="require('../assets/img/bottom-home.png')" alt="home">
            <span class="word">首页</span>
          </div>
        </router-link>
        <router-link to="/cart" class="bar-item">
          <div class="wrapper">
            <img :src="require('../assets/img/bottom-cart.png')" alt="cart">
            <span class="cart-badge" v-if="!!cartNumGetters">{{ cartNumGetters }}</span>
            <span class="word">购物车</span>
          </div>
        </router-link>
        <button class="add-cart" @click.stop="addToCart">加入购物车</button>
      </div>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { mapActions, mapGetters } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getProductDetail, getLike } from "@/utils/api";
import { addClass, removeClass } from "@/utils/utils";
export default {
  name: "ProductDetail",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      productDetail: void 0, // 服务器获取的商品详情信息
      rules: ["小米自营", "小米发货", "7天无理由退货"], // 服务列表
      serviceList: [
        // 服务列表popup的内容
        {
          title: "小米自营",
          desc: null
        },
        {
          title: "小米发货",
          desc: "由小米发货"
        },
        {
          title: "7天无理由退货",
          desc: null
        },
        {
          title: "运费说明",
          desc:
            "由小米发货的商品，单笔满150元免运费;由第三方商家发货的商品，免运费;特殊商品需要单独收取运费，具体以实际结算金额为准；优惠券等不能抵扣运费金额;"
        },
        {
          title: "售后服务政策",
          desc: null
        }
      ],
      isProductShow: false, // 是否显示产品选购的popup
      isPromoShow: false, // 是否显示促销的popup
      isRuleShow: false, // 是否显示产品服务规则的popup
      isIconActive: false,
      selectImg: void 0, // 选择的产品的图片
      // selectParam: void 0, // 选择的参数配置
      colorIndex: 0, // 选择的颜色索引
      paramsIndex: void 0, // 选择的版本索引
      protectIndex: void 0, // 选择的意外险
      hasWarranty: false, // 选择延长保修
      defaultParam: void 0, // 默认选择的 产品参数
      selectedParam: void 0, // 用户选择的产品参数
      totalNum: 1, // 选择的商品数
      bannerOption: {
        // 大图swiper配置
        pagination: {
          el: ".swiper-pagination"
        }
      },
      paramOption: {
        // 参数swiper配置
        slidesPerView: 4,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true
        }
      },
      commentOption: {}
    };
  },
  computed: {
    ...mapGetters([
      "loginUserName",
      "loginUserToken",
      "isLogined",
      "cartNumGetters"
    ])
  },
  created() {
    let productId = this.$route.path.split("/commodity/detail/")[1];
    this.$nextTick(() => {
      getProductDetail(productId)
        .then(res => {
          this.productDetail = res;
          this.productDetail.comments.forEach((item, index) => {
            item.likeNew = item.likes;
          });
          for (let i = 0; i < this.productDetail.type.length; i++) {
            for (let j = 0; j < this.productDetail.type[i].color.length; j++) {
              if (this.productDetail.type[i].color[j].t < 1) {
                this.productDetail.type[i].color[j].splice(colorIndex, 1);
              }
            }
          }
          console.log(this.productDetail);
          // this.defaultParam = this.productDetail.type.find(item => item.def);
          this.defaultParam = this.productDetail.type[
            this.productDetail.defaultParam
          ];
          this.paramsIndex = this.productDetail.defaultParam;
          if (!this.selectedParam) {
            this.selectedParam = {
              content: this.defaultParam.content,
              price: this.defaultParam.price,
              color: this.defaultParam.def,
              insure: 0,
              warranty: 0
            };
          }
        })
        .catch(err => {
          this.$notify({
            message: "网络异常!"
          });
        });
    });
  },
  mounted() {},
  methods: {
    ...mapActions(["addToCart"]),
    goBack() {
      this.$router.go(-1);
    },
    share() {},
    showPopup() {
      this.isPromoShow = true;
    },
    /**
     * 点赞功能
     * @param { Number } index 数组索引
     */
    likeIt(index) {
      if (!this.isLogined) {
        this.$router.replace({
          path: "/login"
        });
      } else {
        let _like = this.productDetail.comments[index].likes;
        let _likeNew = this.productDetail.comments[index].likeNew;
        if (_like <= _likeNew) {
          getLike({
            userName: this.loginUserName,
            token: this.loginUserToken,
            like: _like
          })
            .then(res => {
              this.productDetail.comments[index].likes = res.like;
              addClass(this.$refs.icon[index], "icon-active");
            })
            .catch(err => {
              this.$notify({
                message: "网络出错!"
              });
            });
        } else {
          this.productDetail.comments[index].likes = _likeNew;
          removeClass(this.$refs.icon[index], "icon-active");
        }
      }
    },
    /**
     * 选择参数版本
     */
    selectVersion(index) {
      this.paramsIndex = index;
      this.selectProduct();
    },
    /**
     * 选择颜色
     */
    selectColor(index) {
      this.colorIndex = index;
      this.selectProduct();
    },
    /**
     * 选择意外保护
     */
    selectProtect(index) {
      if (this.protectIndex !== index) {
        this.protectIndex = index;
      } else {
        this.protectIndex = void 0;
      }
      this.selectProduct();
    },
    /**
     * 选择延长保修
     */
    selectWarranty() {
      this.hasWarranty = !this.hasWarranty;
      this.selectProduct();
    },
    /**
     * 合并所有选项
     */
    selectProduct() {
      let arr = this.productDetail.type[this.paramsIndex];
      this.selectedParam = {
        content: arr.content,
        price: arr.price,
        color: arr.color[this.colorIndex].c
      };

      if (this.hasWarranty) {
        Object.assign(this.selectedParam, { warranty: arr.warranty });
      }
      if (this.protectIndex !== undefined) {
        Object.assign(this.selectedParam, {
          insure: arr.insure[this.protectIndex]
        });
      }
    },
    /**
     * 加入购物车
     */
    addToCart() {
      Object.assign(this.selectedParam, { amount: this.totalNum });
      if (this.protectIndex === undefined) {
        delete this.selectedParam["insure"];
      }
      if (!this.hasWarranty) {
        delete this.selectedParam["warranty"];
      }
      if (!this.isLogined) {
        this.$router.replace({
          path: "/login"
        });
      } else {
        this.$store
          .dispatch("addToCart", {
            userName: this.loginUserName,
            token: this.loginUserToken,
            para: this.selectedParam
          })
          .then(res => {
            console.log(res);
            debugger;
          })
          .catch(err => {
            this.$notify({
              message: "网络异常!"
            });
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.e-clear-spacing {
  margin: 0;
  padding: 0;
}
.e-right-arrow {
  position: absolute;
  top: 0;
  right: 20px;
  bottom: 0;
  margin: auto;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 2px solid #cccccc;
  border-top: 2px solid #cccccc;
  transform: rotate(45deg);
}
.product-container {
  position: relative;
}
.top-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  .top-icon {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    i {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .top-icon-left {
    float: left;
    .icon-back {
      display: block;
      width: 30px;
      height: 30px;
      background-image: url("../assets/img/back-left.png");
    }
  }
  .top-icon-right {
    float: right;
    .icon-share {
      display: block;
      width: 30px;
      height: 30px;
      background-image: url("../assets/img/share.png");
    }
  }
}
.banner-swiper-container {
  width: 100%;
  height: 500px;
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .banner-img {
    width: 100%;
    height: 100%;
  }
}

.detail-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
  .title {
    margin: 6px 0;
    font-size: 30px;
    font-weight: 500;
  }
  .selling {
    margin: 10px 0;
    font-size: 20px;
    color: #ff4a00;
  }
  .desc {
    font-size: 20px;
    color: #aaaaaa;
  }
  .price-wrapper {
    .now-price {
      font-size: 33px;
      color: #ff4a00;
    }
    .origin-price {
      font-size: 18px;
      text-decoration: line-through;
      color: #aaaaaa;
    }
  }
}
.parameter {
  height: 80px;
  text-align: center;
  .param-wrapper {
    position: relative;
    img {
      margin: 0 auto 5px auto;
      width: 30px;
      height: 30px;
    }
    p {
      @extend .e-clear-spacing;
      position: relative;
    }
  }
  /deep/ .swiper-container {
    height: 100%;
  }
}

.mid-row {
  width: 95%;
  height: 55px;
  margin: 10px auto;
  box-sizing: border-box;
  border: 1px solid #aaaaaa;
  border-radius: 5px;
}
.promotion {
  position: relative;
  padding: 0 20px;
  background-color: #fafafa;
  .title {
    height: 55px;
    line-height: 55px;
    font-size: 22px;
    vertical-align: middle;
    color: #aaaaaa;
  }
  .desc-wrapper {
    margin-left: 25px;
    height: 55px;
    line-height: 55px;
    display: inline-block;
    vertical-align: middle;
    .icon {
      padding: 4px;
      background-color: #f9dac4;
      color: #f6771d;
      border: 1px solid #f6771d;
    }
  }
  .arrow {
    @extend .e-right-arrow;
  }
}
.promo-popup,
.rules-popup {
  height: 700px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  .header {
    @extend .e-clear-spacing;
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
      @extend .e-clear-spacing;
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
}
.promo-popup .content {
  padding: 15px 20px;
  .icon {
    display: inline-block;
    padding: 4px;
    background-color: #f9dac4;
    color: #f6771d;
    border: 1px solid #f6771d;
  }
}
.rules-popup .content {
  padding: 35px 20px;
  .content-wrapper {
    position: relative;
    margin-bottom: 15px;
    .icon {
      position: absolute;
      top: 3px;
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url("../assets/img/hook.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
    .word {
      display: inline-block;
      margin-left: 40px;
      height: 50px;
      line-height: 50px;
      .title {
        @extend .e-clear-spacing;
        line-height: 25px;
        font-size: 25px;
        font-weight: 500;
        vertical-align: middle;
      }
      .desc {
        @extend .e-clear-spacing;
        line-height: 25px;
        color: #aaaaaa;
      }
      .arrow {
        position: absolute;
        top: 5px;
        right: 20px;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-right: 2px solid #cccccc;
        border-top: 2px solid #cccccc;
        transform: rotate(45deg);
      }
    }
  }
}
.cycle {
  position: relative;
  padding: 0 20px;
  background-color: #f6f6f6;
  .title {
    height: 55px;
    line-height: 55px;
    font-size: 22px;
    vertical-align: middle;
    color: #aaaaaa;
  }
  .desc {
    margin-left: 25px;
    color: #e7af85;
  }
  .arrow {
    @extend .e-right-arrow;
  }
}
.third-row {
  width: 95%;
  margin: 20px auto;
  background-color: #fafafa;
  border-radius: 8px;

  .selected {
    position: relative;
    padding: 0 20px;
    height: 50px;
    border-bottom: 1px solid #dddddd;
    span {
      height: 55px;
      line-height: 55px;
    }
    .detail {
      margin-left: 30px;
    }
    .arrow {
      @extend .e-right-arrow;
    }
  }
  .popup-wrapper {
    height: 700px;
    overflow-y: scroll;
  }
  .product-popup {
    height: 700px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-sizing: border-box;
    .header {
      // height: 35px;
      position: fixed;
      width: 100%;
      height: 190px;
      background-color: #ffffff;
      z-index: 1;
      .close-btn {
        position: absolute;
        top: 10px;
        right: 20px;
        z-index: 2;
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url("../assets/img/close.png") no-repeat center center;
        background-size: cover;
      }
      .product-title {
        position: relative;
        width: 100%;
        height: 150px;
        padding: 40px 0 0 40px;
        .product-img {
          display: inline-block;
          width: 130px;
          height: 130px;
        }
        .price {
          position: absolute;
          top: 0;
          bottom: 0;
          display: inline-block;
          margin: auto;
          height: 80px;
          .now-price {
            margin-right: 15px;
            font-size: 35px;
            color: #ff6700;
          }
          .old-price {
            font-size: 20px;
            color: #aaaaaa;
            text-decoration: line-through;
          }
        }
        .desc {
          @extend .e-clear-spacing;
          margin-top: 15px;
          font-size: 25px;
        }
      }
    }
    .content {
      min-height: 65vh;
      padding: 0 20px 20px;
      margin-top: 190px;
      .version {
        .version-btn {
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          width: 100%;
          height: 50px;
          background-color: #ffffff;
          border: 1px solid #bbbbbb;
          &:not(:first-child) {
            margin-top: 15px;
          }
        }
        .version-selected {
          color: #ff7600;
          border: 1px solid #ff7600;
        }
      }
      .color {
        margin-top: 50px;
        .color-btn {
          width: 80px;
          height: 40px;
          background-color: #ffffff;
          border: 1px solid #bbbbbb;
          &:not(:first-child) {
            margin-right: 20px;
          }
        }
        .color-selected {
          color: #ff7600;
          border: 1px solid #ff7600;
        }
      }
      .amount {
        position: relative;
        height: 60px;
        margin-top: 15px;
        .title {
          line-height: 60px;
        }
        .stepper {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          display: inline-block;
          height: 40px;
          margin: auto;
          font-size: 0;
          .control {
            @extend .e-clear-spacing;
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
          .input {
            @extend .e-clear-spacing;
            width: 40px;
            height: 40px;
            box-sizing: border-box;
            font-size: 25px;
            text-align: center;
            vertical-align: top;
            border-left: hidden;
            border-right: hidden;
            border-top: 1px solid #eeeeee;
            border-bottom: 1px solid #eeeeee;
          }
        }
      }
      .protect,
      .warranty {
        height: 100px;
        .p-title {
          height: 30px;
          line-height: 30px;
          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url("../assets/img/question-mark.png") no-repeat center
              center;
            background-size: cover;
          }
        }
      }
      .protect-btn {
        @extend .e-clear-spacing;
        padding: 0 10px;
        width: 45%;
        height: 40px;
        background-color: #ffffff;
        border: 1px solid #aaaaaa;
        &.active {
          color: #ff6700;
          border-color: #ff6700;
        }
        &:nth-of-type(2) {
          margin-left: 5%;
        }
        .title {
          float: left;
        }
        .price {
          float: right;
        }
      }
    }

    .submit-btn-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      background-color: #ffffff;
      .submit-cart {
        display: block;
        margin: 10px auto;
        width: 70%;
        height: 60px;
        color: #ffffff;
        background-color: #ff6700;
        border-radius: 30px;
      }
    }
  }

  .rules {
    position: relative;
    padding: 0 20px;
    height: 50px;
    .rule-item {
      display: inline-block;
      margin-right: 20px;
      height: 50px;
      line-height: 50px;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 50px;
        background: url("../assets/img/hook.png") no-repeat center center;
        background-size: cover;
        vertical-align: middle;
      }
    }
    .arrow {
      @extend .e-right-arrow;
    }
  }
  .rules-popup {
  }
}

.comment {
  margin: 0 20px 25px 20px;
  .comment-slide {
    height: 250px;
    background-color: #fafafa;
    border-radius: 20px;
    .comment-wrapper {
      width: 95%;
      padding: 10px 0 0 20px;
      background-color: #fafafa;
      box-sizing: border-box;
    }
    .header {
      width: 100%;
      height: 60px;
      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .user-info {
        display: inline-block;
        margin-left: 20px;
        .user-id {
          font-size: 22px;
        }
        .user-date {
          color: #aaaaaa;
        }
      }
      .like {
        position: absolute;
        top: 15px;
        right: 30px;
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("../assets/img/like-default.png") no-repeat center
            center;
          background-size: cover;
        }
        .icon-active {
          background: url("../assets/img/like-active.png") no-repeat center
            center;
          background-size: cover;
        }
      }
    }
    .word {
      @extend .e-clear-spacing;
      font-size: 22px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      margin: 10px auto auto;
      .comment-img-wrapper {
        display: inline-block;
        width: 33%;
        .comment-img {
          width: 100%;
          height: 100px;
        }
      }
    }
    .reply-wrapper {
      margin-top: 10px;
      .title {
        color: #f6771d;
      }
      .reply {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.sticky-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10px;
  z-index: 99;
  width: 95%;
  height: 80px;
  margin: auto;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  opacity: 0.96;
  border-radius: 20px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14),
    0 1px 10px rgba(0, 0, 0, 0.12);

  .bar-item {
    position: relative;
    display: inline-block;
    height: 100%;
    width: 60px;
    &:nth-of-type(1) {
      margin-right: 20px;
    }
    .wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      text-align: center;
      img {
        display: block;
        margin: 0 auto 8px auto;
        width: 30px;
        height: 30px;
      }
      .word {
        display: block;
        color: #aaaaaa;
      }
      .cart-badge {
        position: absolute;
        top: 0;
        right: 5px;
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        color: #ffffff;
        background-color: #e73232;
      }
    }
  }
  .add-cart {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 25px;
    margin: auto;
    width: 120px;
    height: 60%;
    background-color: #ff6700;
    color: #ffffff;
    border: none;
    border-radius: 30px;
    outline: none;
  }
}
</style>

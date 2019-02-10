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
          <span class="now-price">￥{{ productDetail.nowPrice }}</span>
          <span class="origin-price">￥{{ productDetail.originPrice }}</span>
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
        <section class="selected">
          <span class="title">已选</span>
          <span
            class="detail"
          >{{ productDetail.title }} {{ defaultParam.content }} {{ defaultParam.def }} × {{ totalNum }}</span>
          <div class="arrow"></div>
        </section>
        <van-popup class="product-popup" v-model="isProductShow" position="bottom">
          <div class="header">
            <span class="close-btn" @click="isProductShow = false"></span>
          </div>
          <div class="content"></div>
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
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { mapGetters } from "vuex";
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
      productDetail: void 0,
      totalNum: 1,
      rules: ["小米自营", "小米发货", "7天无理由退货"],
      serviceList: [
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
      isProductShow: false,
      isPromoShow: false,
      isRuleShow: false,
      isIconActive: false,
      defaultParam: {},
      totalNum: 1,
      bannerOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      paramOption: {
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
    ...mapGetters(["loginUserName", "loginUserToken", "isLogined"])
  },
  created() {
    let productId = this.$route.path.split("/commodity/detail/")[1];
    this.$nextTick(() => {
      getProductDetail(productId).then(res => {
        this.productDetail = res;
        this.productDetail.comments.forEach((item, index) => {
          item.likeNew = item.likes;
        });
        this.defaultParam = this.productDetail.type.find(item => item.def);
      });
    });
  },
  mounted() {},
  methods: {
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
</style>

<template>
  <div class="container">
    <sticky-header>
      <p slot="title" class="page-title">{{ headerTitle }}</p>
    </sticky-header>
    <div class="main-content">
      <van-tabs v-model="activeTab" animated @change="getList">
        <van-tab v-for="(tabItem, tabIndex) in allTabs" :key="tabIndex" :title="tabItem">
          <template v-if="orderList">
            <div class="tab-item">
              <section
                class="content"
                v-for="(orderItem, orderIndex) in orderList"
                :key="orderIndex"
              >
                <template>
                  <div class="product-img-wrapper">
                    <img :src="orderItem.img" alt class="product-img">
                  </div>
                  <div class="product-detail">
                    <p class="title">{{ orderItem.product }}</p>
                    <p class="middle">
                      <span class="single-price">售价：{{ orderItem.price }}元</span>
                      <span class="num">数量: {{ orderItem.num }}</span>
                    </p>
                    <p class="all-price">总价：{{ orderItem.num * orderItem.price }}元</p>
                    <p>{{ orderItem.date }}</p>
                  </div>
                </template>
              </section>
            </div>
          </template>
          <template v-else>
            <div class="empty-wrapper">
              <img :src="require('../assets/img/empty.png')" alt="empty" class="empty-icon">
              <p>您还没有订单</p>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <sticky-footer :activePage="3"></sticky-footer>
  </div>
</template>
<script>
import StickyHeader from "../components/StickyHeader";
import StickyFooter from "../components/StickyFooter";
import { getOrderList } from "@/utils/api";
import { mapGetters } from "vuex";
export default {
  name: "OrderList",
  components: {
    StickyHeader,
    StickyFooter
  },
  data() {
    return {
      headerTitle: "商品订单",
      activeTab: 0,
      allTabs: ["全部", "待付款", "待收货"],
      orderList: []
    };
  },
  computed: {
    ...mapGetters(["loginUserName", "loginUserToken"])
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 获取订单详情
     */
    getList() {
      getOrderList({
        userName: this.loginUserName,
        token: this.loginUserToken,
        type: this.activeTab
      })
        .then(res => {
          if (JSON.stringify(res) !== "{}") {
            this.orderList = res.orderList;
          } else {
            this.orderList = null;
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
  position: relative;
  margin-top: 50px;
  .tab-item {
    padding-top: 50px;
  }
  .content {
    width: 100%;
    height: 150px;
    margin: 0;
    padding: 0;
    .product-img-wrapper {
      float: left;
      position: relative;
      display: inline-block;
      width: 30%;
      height: 100%;
      vertical-align: middle;
      .product-img {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 120px;
        height: 100px;
        margin: auto;
      }
    }
    .product-detail {
      display: inline-block;
      height: 100%;
      width: auto;
      max-width: 70%;
      overflow: hidden;
      vertical-align: middle;
      .title {
        font-weight: 500;
        font-size: 22px;
      }
      .middle .num {
        margin-left: 20px;
      }
      .all-price {
        font-size: 20px;
        font-weight: 500;
        color: #c30000;
      }
    }
  }

  .empty-wrapper {
    position: relative;
    width: 100%;
    height: 200px;
    .empty-icon {
      position: relative;
      margin: 30px auto auto;
      display: block;
      width: 100px;
      height: 100px;
    }
    p {
      font-size: 25px;
      text-align: center;
    }
  }
  /deep/ .van-tabs .van-ellipsis {
    font-size: 25px;
  }
}
</style>

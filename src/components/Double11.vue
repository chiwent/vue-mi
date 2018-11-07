<template>
  <div>
    <div class="container">
      <div class="banner">
        <img :src="require('../assets/img/double11-banner.jpg')" alt="double11" class="banner-img">
      </div>
      <div class="cell-container">
        <ul>
          <li v-for="(item, index) in cellImgs" :key="index">
            <img :src="require('../assets/img/' + item)" alt="">
          </li>
        </ul>
      </div>
      <div class="cell-container">
        <div class="fluid-img">
          <img :src="require('../assets/img/recommend.jpg')" alt="today-recommend" class="recommend">
        </div>
      </div>
      <two-columns class="space-between">
        <div class="half-col" slot="left">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/mi8-s.jpg')" alt="mi8" class="col-img"></div>
            <div class="info">
              <p class="title">小米8</p>
              <p class="desc">全球首款双频GPS，骁龙845</p>
              <p><span class="price">￥2499起</span><s class="del">￥2699</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
        <div class="half-col" slot="right">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/mi8s-s.jpg')" alt="mi8se" class="col-img"></div>
            <div class="info">
              <p class="title">小米8青春版</p>
              <p class="desc">潮流镜面渐变色，自拍旗舰</p>
              <p><span class="price">￥1399起</span></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
      </two-columns>
      <two-columns class="space-between">
        <div class="half-col" slot="left">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/sweepbot.jpg')" alt="sweepbot" class="col-img"></div>
            <div class="info">
              <p class="title">米家扫地机器人</p>
              <p class="desc">智商高，扫得干净扫得快</p>
              <p><span class="price">￥1499</span><s class="del">￥1699</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
        <div class="half-col" slot="right">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/cleanwater.jpg')" alt="cleanwater" class="col-img"></div>
            <div class="info">
              <p class="title">小米净水器（厨下式）</p>
              <p class="desc">400加仑大流量，隐藏安装</p>
              <p><span class="price">￥1699起</span><s class="del">￥1999</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
      </two-columns>
      <two-columns class="space-between">
        <div class="half-col" slot="left">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/cooker.jpg')" alt="cooker" class="col-img"></div>
            <div class="info">
              <p class="title">米家电磁炉</p>
              <p class="desc">双频火力，精准控温</p>
              <p><span class="price">￥279起</span><s class="del">￥299</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
        <div class="half-col" slot="right">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/router3c.jpg')" alt="router3c" class="col-img"></div>
            <div class="info">
              <p class="title">小米路由器3G</p>
              <p class="desc">双核双千兆，上网很快</p>
              <p><span class="price">￥189起</span><s class="del">￥249</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
      </two-columns>
      <two-columns class="space-between">
        <div class="half-col" slot="left">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/game-laptop.jpg')" alt="game-laptop" class="col-img"></div>
            <div class="info">
              <p class="title">15.6''8代i7 1050Ti</p>
              <p class="desc">冷酷的性能怪兽</p>
              <p><span class="price">￥7499</span></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
        <div class="half-col" slot="right">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/tv4x.jpg')" alt="tv4x" class="col-img"></div>
            <div class="info">
              <p class="title">小米电视4X 43英寸</p>
              <p class="desc">FHD全高清屏，人工智能语音</p>
              <p><span class="price">￥1299起</span><s class="del">￥1599</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
      </two-columns>
      <div v-for="(item, index) in fluidImg" :key="index" :class="'cell-container-' + (index + 2)">
        <div>
          <img :src="require('../assets/img/' + item)" :alt='item'>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TwoColumns from './TwoColumns'
  export default {
    name: 'Double11',
    components: {
      TwoColumns
    },
    data() {
      return {
        cellImgs: ['xiao.jpg', 'mi.jpg', 'miaosha.jpg', 'laptop.jpg', 'zhineng11.jpg'],
        // colImgs: ['mi8.jpg', 'mi8se-s.jpg', 'sweepbot.jpg', 'cleanwater.jpg', 'cooker.jpg', 'router3c.jpg', 'game-laptop.jpg', 'tv4x.jpg'],
        fluidImg: ['lottery.jpg', 'rules.jpg', 'date.jpg', 'all.jpg', 'findmi.jpg'],
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin full-size {
    width: 100%;
    height: 100%;
  }

  @mixin lheight($h) {
    height: $h;
    line-height: $h;
  }

  @mixin fluid($h) {
    width: 100%;
    height: $h;
    padding: 0;
    display: block;
    div {
      @include full-size;
      img {
        @include full-size;
        display: block;
      }
    }
  }

  .container {
    position: relative;
    overflow: hidden;
    background: #fff;
    color: #3c3c3c;
    padding: 0;
    width: 100%;
    background: rgb(248, 151, 48);
    .banner {
      width: 100%;
      height: 650px;
      margin-top: 35px;
      .banner-img {
        @include full-size;
      }
    }
    .cell-container {
      position: relative;
      width: 100%;
      height: 120px;
      padding: 0;
      ul {
        @include full-size;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0;
        margin: 0;
        padding: 0;
        li {
          @include full-size;
          img {
            @include full-size;
          }
        }
      }
      .fluid-img {
        @include full-size;
        img {
          @include full-size;
        }
      }
    }
    .cell-container-2 {
     @include fluid(210px);
    }
    .cell-container-3 {
     @include fluid(70px);
    }
    .cell-container-4 {
     @include fluid(170px);
    }
    .cell-container-5 {
     @include fluid(400px);
    }
    .cell-container-6 {
     @include fluid(200px);
    }
    .space-between {
      // display: flex;
      width: 100%;
      overflow: hidden;
      text-align: center;
      margin: 10px 0;
      .half-col {
        margin-top: 0;
        height: 100%;
        width: 50%;
        // margin-left: 6px;
        // margin-right: 6px;
        &:nth-child(even) {
          margin-left: 3px;
          margin-right: 6px;
        }
        &:nth-child(odd) {
          margin-left: 6px;
          margin-right: 3px;
        }
        .col-img-wrap {
          @include full-size;
          padding: 0;
          .info {
            width: 100%;
            height: 40%;
            background: #fff;
            display: inline-block;
            text-align: center;
            p {
              margin: 5px auto;
            }
            .title {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 25px;
              color: rgba(0, 0, 0, .9);
            }
            .desc {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-top: 3px;
              @include lheight(18px);
              color: rgba(0, 0, 0, .5);
            }
            .price {
              font-size: 22px;
              color: #ea625b;
              @include lheight(30px);
              position: relative;
              display: inline-block;
            }
            .buy-now {
              margin: 0 auto;
              width: auto;
              background: #ea625b;
              border-radius: 5px;
              color: #fff;
              font-size: 23px;
              font-weight: 600;
              border: none;
              outline: none;
              -webkit-appearance: none;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              padding: 10px;
            }
          }
          .img-container {
            width: 100%;
            height: 60%;
            font-size: 0;
            vertical-align: middle;
            line-height: 0;
            display: inline-block;
            .col-img {
              @include full-size;
              display: block;
            }
          }
        }
      }
    }
  }
</style>


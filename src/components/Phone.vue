<template>
  <div class="container">
    <div class="banner">
      <img :src="require('../assets/img/mix3new.jpg')" alt="mixnew3" class="banner-img">
    </div>
    <div class="cell-container-0">
      <div>
        <img :src="require('../assets/img/xiaomi-series.jpg')" alt='xiaomi-series'>
      </div>
    </div>
    <div class="cell-container-1">
      <img :src="require('../assets/img/mi8s-b.jpg')" alt='mi8s' class="mi8s-big">
      <div class="info">
        <div class="l l1">
          <div class="title">小米8青春版</div>
          <div class="price">￥1399起</div>
        </div>
        <div class="l l2">
          <div class="desc">潮流镜面渐变色，2400万自拍旗舰</div>
          <button class="buy-now">立即购买</button>
        </div>
      </div>
    </div>
    <two-columns class="space-between">
        <div class="half-col" slot="left">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/mi8-l.jpg')" alt="mi8"></div>
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
            <div class="img-container"><img :src="require('../assets/img/mi8se-r.jpg')" alt="mi8se"></div>
            <div class="info">
              <p class="title">小米8SE</p>
              <p class="desc">三星AMOLED全面屏</p>
              <p><span class="price">￥1699起</span><s class="del">￥1799</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
      </two-columns>
      <two-columns class="space-between">
        <div class="half-col" slot="left">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/mi6x-l.jpg')" alt="mi6x"></div>
            <div class="info">
              <p class="title">小米6X</p>
              <p class="desc">轻薄美观的拍照手机</p>
              <p><span class="price">￥1299起</span><s class="del">￥1599</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
        <div class="half-col" slot="right">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/mix2s-r.jpg')" alt="mix2s"></div>
            <div class="info">
              <p class="title">小米MIX 2S</p>
              <p class="desc">陶瓷机身 手机中的艺术品</p>
              <p><span class="price">￥2899起</span><s class="del">$3299</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
      </two-columns>
      <two-columns class="space-between">
        <div class="half-col" slot="left">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/mi8finger-l.jpg')" alt="mi8finger"></div>
            <div class="info">
              <p class="title">小米8 屏幕指纹版</p>
              <p class="desc">压感屏幕指纹，潮流外观</p>
              <p><span class="price">￥3199起</span></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
        <div class="half-col" slot="right">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/max3-r.jpg')" alt="max3"></div>
            <div class="info">
              <p class="title">小米Max 3</p>
              <p class="desc">大屏大电量，震撼视界</p>
              <p><span class="price">￥1599起</span><s class="del">￥1699</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
      </two-columns>
      <two-columns class="space-between">
        <div class="half-col" slot="left">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/shark-l.jpg')" alt="shark"></div>
            <div class="info">
              <p class="title">黑鲨游戏手机 液冷更快</p>
              <p class="desc">液冷散热，独立图像处理芯片</p>
              <p><span class="price">￥2699起</span><s class="del">￥2999</s></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
        <div class="half-col" slot="right">
          <div class="col-img-wrap">
            <div class="img-container"><img :src="require('../assets/img/mix2s-gr.jpg')" alt="mix2sgreen"></div>
            <div class="info">
              <p class="title">小米MIX 2S 翡翠色</p>
              <p class="desc">向敦煌色彩艺术致敬</p>
              <p><span class="price">￥3999起</span></p>
              <button class="buy-now">立即购买</button>
            </div>
          </div>
        </div>
      </two-columns>
      <div class="cell-container-2">
      <div>
        <img :src="require('../assets/img/changenew.jpg')" alt='change'>
      </div>
    </div>
  </div>
</template>

<script>
  import TwoColumns from './TwoColumns'
  export default {
    name: 'Phone',
    components: {
      TwoColumns,
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
    // padding: 0 8px;
    width: 100%;
    background-color: rgb(102, 109, 226);
    .banner {
      width: 100%;
      height: 450px;
      margin-top: 35px;
      .banner-img {
        @include full-size;
      }
    }
    .cell-container-0 {
      @include fluid(120px);
    }

    .cell-container-1 {
      width: calc(100% - 15px);
      display: block;
      margin: 0 auto;
      padding: 0;
      .mi8s-big {
        width: 100%;
        display: block;
        margin:0 auto;
      }
      .info {
        width: 100%;
        // padding: 15px 20px;
        text-align: left;
        background: #fff;
        .l {
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: space-between;
          padding: 15px 15px;
          .title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: rgba(0, 0, 0, .8);
            font-size: 25px;
            line-height: 25px;
            font-weight: 500;
          }
          .price {
            font-size: 18px;
            color: #ea625b;
            line-height: 18px;
            vertical-align: middle
          }
          .l2 {
            padding: 0;
          }
          .desc {
            margin-top: 5px;
            font-size: 15px;
            line-height: 15px;
            color: gray;
          }
          .buy-now {
              margin-right: 0;
              width: 200px;
              background: #ea625b;
              border-radius: 5px;
              color: #fff;
              font-size: 23px;
              font-weight: 600;
              border: none;
              outline: none;
              -webkit-appearance: none;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              padding: 18px;
            }
        }
      }
    }
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
            img {
              @include full-size;
              display: block;
            }
          }
        }
      }
    }
    .cell-container-2 {
      @include fluid(200px);
    }
</style>


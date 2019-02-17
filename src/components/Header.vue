<template>
  <div>
    <div class="app-view-wrapper">
      <div class="container fluid app-view">
        <div class="header">
          <div class="app-header-wrapper">
            <div class="app-header-left">
              <div class="app-header-item logo">
                <img src="../assets/img/logo.png" alt>
              </div>
            </div>
            <div class="app-header-middle">
              <div class="app-header-title" @click="goSearch">
                <i class="image-icons app-header-icon icon-search"></i> 搜索商品名称
                <!-- <router-link id="search" to="/search"></router-link> -->
              </div>
            </div>
            <div class="app-header-right">
              <div class="app-header-item">
                <router-link to="/user">
                  <i class="image-icons app-header-icon icon-user"></i>
                </router-link>
              </div>
            </div>
          </div>
          <div class="nav-wrap">
            <div class="nav-display">
              <i class="images-icons icon-arrow-down" @click="toggleMenu"></i>
            </div>
            <div class="nav-item-layer" v-show="dropDown">
              <div class="title">全部</div>
              <div class="btn-wrap" ref="btnlist">
                <span
                  class="extra-btn mr-interval"
                  @click="select($event, index)"
                  :class="index === 0 ? 'tag-active' : ''"
                  v-for="(item, index) in navItem"
                  :key="index"
                >{{item}}</span>
                <!-- <router-link :to="navEn[index]" class="extra-btn mr-interval" @click="select($event, index)" :class="index === 0 ? 'tag-active' : ''" v-for="(item, index) in navItem" :key="index">{{item}}</router-link> -->
              </div>
            </div>
            <div class="nav" v-show="!dropDown">
              <!--
                <div class="nav-item">
                  <span class="tag-active" style="color: rgb(237, 91, 0); border-color: rgb(237, 91, 0);">推荐</span>
                </div>
              -->
              <div class="nav-item" ref="navlist">
                <span
                  class="nav-btn"
                  v-for="(item, index) in navItem"
                  :key="index"
                  style="color: rgb(116, 116, 116); border-color: rgb(242, 242, 242);"
                  @click="select($event, index)"
                  :class="index === 0 ? 'nav-active' : ''"
                >{{item}}</span>
                <!-- <router-link :to="navEn[index]" class="nav-btn" v-for="(item, index) in navItem" :key="index" style="color: rgb(116, 116, 116); border-color: rgb(242, 242, 242);" @click="select($event, index)" :class="index === 0 ? 'nav-active' : ''">{{item}}</router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="dropDown === true ? 'popup-mask' : ''" @click="rmMask"></div>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  props: ["nav"],
  data() {
    return {
      dropDown: false,
      navItem: [
        "推荐",
        "双十一狂欢",
        "手机",
        "智能",
        "电视",
        "笔记本",
        "生活周边",
        "家电",
        "新款游戏本",
        "大内存手机",
        "影音娱乐"
      ],
      //navEn: ['default', 'double11', 'phone', 'intelligent', 'tv', 'laptop', 'live', 'electric', 'newlaptop', 'powerphone', 'music'],
      navBak: this.nav
    };
  },
  methods: {
    select(e, index) {
      let target = e.currentTarget;
      let targetNode, targetClass;
      if (target.className.split(/\s+/g).indexOf("extra-btn") !== -1) {
        targetNode = this.$refs.btnlist.childNodes;
        targetClass = "tag-active";
        this.navBak = index;
        this.$emit("listenNav", this.navBak);
      } else if (target.className.split(/\s+/g).indexOf("nav-btn") !== -1) {
        targetNode = this.$refs.navlist.childNodes;
        targetClass = "nav-active";
        this.navBak = index;
        this.$emit("listenNav", this.navBak);
      }
      Array.prototype.forEach.call(targetNode, (item, index) => {
        item.classList.remove(targetClass);
      });
      target.classList.add(targetClass);
    },
    toggleMenu(e) {
      let target = e.target;
      this.dropDown = !this.dropDown;
      if (this.dropDown) {
        target.classList.add("unfold");
      } else {
        target.classList.remove("unfold");
      }
    },
    goSearch() {
      //console.log('click search');
      this.$router.push({
        path: "/search"
      });
    },
    rmMask() {
      this.dropDown = !this.dropDown;
    }
    /*
      selectTag(e) {
        let btnList = this.$refs.btnlist.childNodes;
        let target = e.currentTarget;
          Array.prototype.forEach.call(btnList, (item, index) => {
            item.classList.remove('tag-active');
          })
          target.classList.add('tag-active');
      },
      selectNav(e) {
        let navList = this.$refs.navlist.childNodes;
        let target = e.currentTarget
        Array.prototype.forEach.call(navList, (item, index) => {
            item.classList.remove('nav-active');
          })
          target.classList.add('nav-active');
      }
      */
  },
  watch: {
    nav(val) {
      this.navBak = val;
    }
  }
};
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
.app-view-wrapper {
  width: 100%;
  height: 120px;
  font-size: 26px;
  position: relative;
  margin: 0 auto;
  // padding-bottom: 52px;
  color: #3c3c3c;
  background-color: #fff;
  .container {
    position: relative;
    margin: 0 auto;
    flex-basis: 100%;
  }
  .fluid {
    max-width: 100%;
    width: 100%;
  }
  .header {
    position: fixed;
    display: block;
    top: -1px;
    left: 0;
    right: 0;
    z-index: 99;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    background: #f2f2f2;
    .app-header-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f2f2f2;
      color: #666;
      padding: 0;
      height: 48px;
    }
  }
}

.app-header-left {
  display: flex;
  align-items: center;
  height: 40px;
  width: 10%;
  vertical-align: middle;
  .app-header-item {
    display: block;
    width: 80%;
    height: 25px;
    margin-top: 5px;
    margin-left: 20px;
    img {
      @include full-size;
      border-style: none;
    }
  }
}

.app-header-middle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  width: 80%;
  @include lheight(38px);
  margin-top: 10px;
  .app-header-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #e5e5e5;
    text-align: left;
    width: 80%;
    color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
    border-radius: 2px;
    height: 100%;
  }
  .icon-search {
    display: block;
    width: 25px;
    height: 100%;
    line-height: 25px;
    vertical-align: middle;
    background-image: url(../assets/img/search.png);
    background-size: 34px 34px;
    margin-right: 5px;
  }
}

.app-header-right {
  width: 10%;
  @include lheight(40px);
  display: flex;
  align-items: center;
  margin-top: 15px;
  .app-header-item {
    display: block;
    width: 80%;
    height: 100%;
    vertical-align: middle;
    .icon-user {
      display: block;
      width: 80%;
      @include lheight(80%);
      vertical-align: middle;
      background-image: url(../assets/img/login.png);
      background-repeat: no-repeat;
      background-size: 34px 34px;
    }
  }
}

.nav {
  overflow-x: auto;
  background: #f2f2f2;
  font-size: 25px;
  white-space: nowrap;
  z-index: 2;
  margin-top: 20px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .nav-item {
    display: inline-block;
    padding: 0 5px;
    span {
      margin: 0 10px;
    }
  }
}

.nav-wrap {
  position: relative;
  padding: 10px 0;
  overflow: hidden;
  box-sizing: border-box;
  .nav-display {
    position: absolute;
    right: 0;
    top: 28px;
    width: 52px;
    @include lheight(35px);
    background-color: #f2f2f2;
    box-shadow: -15px 0 15px 0 #f2f2f2;
    z-index: 99;
  }
  .icon-arrow-down {
    width: 70%;
    height: 100%;
    line-height: 80%;
    vertical-align: middle;
    display: block;
    background-image: url(../assets/img/down.png);
    transition: transform 0.2s linear;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
  }
}

.unfold {
  transform: rotate(180deg);
}

.nav-item-layer {
  width: 100%;
  padding-top: 25px;
  overflow: hidden;
  font-size: 25px;
  text-align: left;
  background-color: #f2f2f2;
  transition: max-height 0.3s ease-in-out;
  .title {
    padding-left: 10px;
  }
  .btn-wrap {
    margin-top: 7px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    white-space: pre-line;
    justify-content: flex-start;
    align-items: stretch;
    .extra-btn {
      margin-bottom: 15px;
      display: inline-block;
      width: 40px;
      @include lheight(25px);
      font-size: 20px;
      text-align: center;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
      background-color: #fff;
    }
    .mr-interval {
      margin: 5px 10px;
      display: inline-block;
      width: 90px;
      @include lheight(40px);
      text-align: center;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      font-size: 18px;
      background-color: #fff;
      text-align: center;
      vertical-align: middle;
    }
  }
}

.tag-active {
  background-color: #fde0d5;
  border-color: #ff6700;
  color: #ff6700;
}

.nav-active {
  color: rgb(237, 91, 0) !important;
  border-color: rgb(237, 91, 0) !important;
  display: inline-block;
  line-height: 20px;
  border-bottom: 3px solid rgba(237, 91, 0, 0);
  padding: 5px;
}

.popup-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
  @include full-size;
}
</style>

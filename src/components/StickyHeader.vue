<template>
  <div>
    <!-- <transition name="sticky-header"> -->
    <div class="header">
      <div class="header-left">
        <a @click="$router.go(-1)">
          <i class="icon-back"></i>
        </a>
      </div>
      <div class="header-middle">
        <slot name="title"></slot>
      </div>
      <div class="header-right">
        <router-link to="/search">
          <i class="icon-search"></i>
        </router-link>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  name: "StickyHeader"
};
</script>
<style lang="scss" scoped>
.header {
  padding: 6px;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  background-color: #f2f2f2;
  animation: header-fading 0.6s ease;
  div {
    display: flex;
    align-items: center;
  }
  .header-left {
    display: flex;
    align-items: center;
    &:first-child {
      display: block;
      width: 40px;
      margin: 0 5px;
      outline: 0;
      .icon-back {
        background-image: url(../assets/img/back.png);
        width: 40px;
        height: 40px;
        line-height: 40px;
        display: block;
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        cursor: pointer;
      }
    }
  }
  .header-middle {
    flex: 1;
    font-size: 30px;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    &:first-child {
      color: #666;
      margin: 0 auto;
    }
  }
  .header-right {
    width: 40px;
    height: 40px;
    &:first-child {
      display: block;
      width: 40px;
      margin: 0 5px;
      outline: 0;
    }
    .icon-search {
      background-image: url(../assets/img/search.png);
      min-width: 40px;
      min-height: 40px;
      line-height: 40px;
      display: block;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
      cursor: pointer;
    }
  }
}
@keyframes header-fading {
  0% {
    opacity: 0;
    transform: translate3d(0, -60px, 0);
  }
  50% {
    opacity: 1;
    transform: translate3d(0, -60px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
/*
.sticky-header-enter-active,
.sticky-header-leave-active {
  transition: all 0.3s ease;
}
.sticky-header-enter,
.sticky-header-leave-to {
  opacity: 0;
  transform: translate3d(0, -60px);
}
.sticky-header-enter-to,
.sticky-header-leave {
  opacity: 1;
  transform: translate3d(0, 0);
}
*/
</style>
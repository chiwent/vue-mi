<template>
  <div class="app-view-wrapper">
    <div class="app-search-page">
      <!-- <div class="back"> -->
      <div class="app-search">
        <router-link to="/" class="header-btn">
          <i class="app-header-item icon-back"></i>
        </router-link>
        <!-- </div> -->
        <div class="search-bar">
          <div class="search-item">
            <input type="search" placeholder="搜索商品名称">
          </div>
        </div>
        <a href="javascript:;" class="header-btn">
          <i class="image-icons icon-search"></i>
        </a>
      </div>
    </div>
    <div class="page-wrap">
      <div class="search-promotion">
        <div class="search-promotion-title">热门搜索</div>
        <div class="search-promotion-list">
          <img src="../assets/img/double11.jpg" alt="双十一">
        </div>
      </div>
    </div>
    <div class="search-key">
      <a href="javascript:;">小米MIX 3首发</a>
        <a href="javascript:;">双十一狂欢</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Search',

  }
</script>

<style lang="scss" scoped>
  .app-view-wrapper {
    position: relative;
    width: 100%;
    font-size: 26px;
    position: relative;
    margin: 0 auto;
    padding-bottom: 52px;
    color: #3c3c3c;
    background-color: #fff;
    overflow: hidden;
    .app-search-page {
      position: relative;
      background: #fff;
      color: #3c3c3c;
      padding-top: 70px;
    }
    .app-search {
      display: flex;
      align-items: center;
      height: 50px;
      position: fixed;
      z-index: 99;
      top: 0;
      left: 0;
      right: 0;
      background-color: #f2f2f2;
      padding: 5px 0;
    }
  }

  .header-btn {
    display: inline-block;
    margin: 0 5px;
    color: #666;
    width: 10%;
    height: 40px;
    .icon-back {
      display: block;
      width: 80%;
      height: 100%;
      background-image: url('../assets/img/back.png');
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
    }
    .icon-search {
      display: block;
      width: 80%;
      height: 100%;
      background-image: url('../assets/img/search.png');
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
    }
  }

  .search-bar {
    width: 80%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .search-item {
      border: 1px solid #e5e5e5;
      background: #fff;
      width: 80%;
      height: 40px;
      border-radius: 2px;
      padding: 0 12px;
      box-sizing: border-box;
      input {
        position: relative;
        width: 100%;
        height: 80%;
        margin: 0;
        border: 0 none;
        outline: 0;
        font-size: 20px;
      }
    }
  }

  .page-wrap {
    position: relative;
    color: #3c3c3c;
    .search-promotion-title {
      font-size: 20px;
      line-height: 45px;
      padding: 0 8px;
      text-align: left;
      height: 45px;
      margin-left: 15px;
    }
    .search-promotion-list {
      max-width: 100%;
      height: auto;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }

  .search-key {
    margin: 10px 15px;
    a {
      display: inline-block;
      padding: 10px 20px;
      margin: 2px;
      border: 1px solid #e4e4e4;
      font-size: 20px;
      color: #484848;
      background: #fff;
    }
  }
</style>


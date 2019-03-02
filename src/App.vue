<template>
  <div id="app">
    <div class="mask" v-if="$store.state.isNetworkLoading">
      <van-loading v-if="$store.state.isNetworkLoading" size="50px" color="gray" class="loading"/>
    </div>
    <router-view/>
    <!-- <bga-back-top :threshold="150" :right="160" :bottom="60" :width="40" :height="40" :svgMajorColor="'#7b79e5'"
    :svgMinorColor="'#ba6fda'" :svgType="'rocket'"/>-->
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.07);
}
.loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>

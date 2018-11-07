<template>
  <div id="app">
    <router-view/>
    <!-- <bga-back-top :threshold="150" :right="160" :bottom="60" :width="40" :height="40" :svgMajorColor="'#7b79e5'"
                 :svgMinorColor="'#ba6fda'" :svgType="'rocket'"/> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

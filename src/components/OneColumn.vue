<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'OneColumn',
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 250px;
  }
</style>

<template>
  <div>
    <div class="footer">
      <p>了解小米</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeFooter',
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: block;
    position: relative;
    width: 100%;
    height: 80px;
    p {
      text-align: center;
      font-size: 30px;
      font-weight: 500;
      color: gray;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
</style>


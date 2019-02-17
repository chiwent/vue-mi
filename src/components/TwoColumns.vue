<template>
  <div class="container">
    <slot name="left" class="half-col"></slot>
    <slot name="right" class="half-col"></slot>
  </div>
</template>
<script>
export default {
  name: "TwoColumns"
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 350px;
  .half-col {
    width: 50%;
    height: 100%;
  }
}
</style>

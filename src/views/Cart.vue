<template>
  <div class="container">
    <sticky-header>
      <p slot="title" class="page-title">{{ title }}</p>
    </sticky-header>
  </div>
</template>
<script>
import StickyHeader from "../components/StickyHeader";
export default {
  name: "Cart",
  components: {
    StickyHeader
  },
  data() {
    return {
      title: "购物车"
    };
  }
};
</script>
<style lang="scss" scoped>
.page-title {
  margin: 0 auto;
}
</style>

<template>
  <div class="navs-body"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
.navs-body {
  width: $navMenu;
  min-width: $navMenuMin;
  height: 100vh;
  background-color: rgb(52, 74, 95);

  position: fixed;
  top: 0;
  left: 0;
}
</style>

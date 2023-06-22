<template>
  <div id="app">
    <!--    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    -->
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@font-face {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400;
  src: url("@/assets/fonts/Manrope-Light.ttf");
}
.offset {
  margin-left: 224px;
}
</style>

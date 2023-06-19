<template>
  <div class="main-container">
    <h1 class="not-found not-found-text grey-4">404</h1>
    <h2 class="text header-2 black">Страница не найдена</h2>
    <button class="back-button bg-primary white text-18" @click="back">
      Вернуться в список задач
    </button>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.not-found {
  margin-top: 200px;
  margin-bottom: 0px;
}
.text {
  margin-top: 0px;
  margin-bottom: 40px;
}
</style>

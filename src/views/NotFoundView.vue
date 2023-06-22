<template>
  <div class="main-container">
    <h1 class="not-found not-found-text grey-4">404</h1>
    <h2 class="text header-2 black">{{ $t("pageNoFoundLocalText") }}</h2>
    <button class="back-button bg-primary white text-18" @click="back">
      {{ $t("action.goBackAction") }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NotFoundView",
  computed: {
    ...mapState(["groups"]),
  },
  methods: {
    back() {
      if (this.groups.length) {
        this.$router.push({
          name: "todoBoard",
          params: { path: this.groups[0].path },
        });
      } else {
        this.$router.push({ name: "createBoard" });
      }
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
  margin-bottom: 0;
}
.text {
  margin-top: 0;
  margin-bottom: 40px;
}
</style>

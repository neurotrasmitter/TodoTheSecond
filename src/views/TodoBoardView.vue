<template>
  <div class="bg">
    <NavBar />
    <div class="todo-board-header">
      <LangSelector class="header-text" />
      <div class="user-name header-text">{{ userName }}</div>
      <button class="logout-button bg" @click="logOutMethod">
        <SignOutIcon />
      </button>
    </div>
    <TodoBoard class="main-container" :storage="storageName" />
  </div>
</template>

<script>
import LangSelector from "@/components/LangSelector";
import SignOutIcon from "@/components/icons/SignOutIcon";
import NavBar from "@/components/NavBar";
import TodoBoard from "@/components/TodoBoard";

import { mapMutations, mapState } from "vuex";

export default {
  name: "TodoBoardView",
  components: { TodoBoard, NavBar, SignOutIcon, LangSelector },
  data() {
    return {
      storageName: this.$route.path.slice(1),
    };
  },
  computed: {
    ...mapState(["userName"]),
  },
  methods: {
    ...mapMutations(["resetUserInfoMutation"]),
    logOutMethod() {
      console.log("1");
      this.$router.push("login");
      this.resetUserInfoMutation();
    },
  },
  watch: {
    $route(to) {
      this.storageName = to.path.slice(1);
    },
  },
};
</script>

<style scoped>
.main-container {
  margin-left: 224px;
}

.todo-board-header {
  display: flex;
  justify-content: right;
  padding-top: 21px;
  margin-right: 40px;
}

.user-name {
  margin-left: 35px;
  margin-right: 10px;
}

.logout-button {
  width: 20px;
  height: 20px;
}
</style>

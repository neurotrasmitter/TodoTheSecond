<template>
  <div class="bg">
    <NavBar />
    <div class="todo-board-header">
      <LangSelector class="header-text" />
      <div class="user-name header-text">{{ userName }}</div>
      <button
        :title="$t('title.signOut')"
        class="logout-button bg hover-icon"
        @click="logOutMethod"
      >
        <SignOutIcon />
      </button>
    </div>
    <router-view class="main-container" />
  </div>
</template>

<script>
import LangSelector from "@/components/LangSelector";
import SignOutIcon from "@/components/icons/SignOutIcon";
import NavBar from "@/components/NavBar";

import { mapMutations, mapState } from "vuex";
import axios from "axios";
import doesTheGroupPathNotExist from "@/helpers/doesTheGroupPathNotExist";

export default {
  name: "TodoBoardView",
  components: { NavBar, SignOutIcon, LangSelector },
  computed: {
    ...mapState(["userName", "userId", "groups"]),
  },
  methods: {
    ...mapMutations([
      "resetUserInfoMutation",
      "setGroupsMutation",
      "setRecordsMutation",
      "setUserNameMutation",
    ]),
    logOutMethod() {
      this.$router.push("/login");
      this.resetUserInfoMutation();
      window.localStorage.removeItem("userId");
    },
    async start() {
      await this.getDataFromServer();
      if (this.groups.length) {
        this.$router.push({
          name: "todoBoard",
          params: {
            path: this.groups[0].path,
          },
        });
      } else {
        this.$router.push({ name: "createBoard" });
      }
    },
    async getDataFromServer() {
      let groups = [];
      let records = {};
      try {
        groups = await this.getGroupsFromServer();
        for (let group of groups) {
          records[group.path] = [];
        }
        this.setGroupsMutation({ groups });
        let result = await this.getRecordsFromServer();
        for (let record of result) {
          for (let group of groups) {
            if (record.groupId === group.id) {
              records[group.path].push(record);
            }
          }
        }
        this.setRecordsMutation({ records });
      } catch (e) {
        console.log(e);
      }
    },
    async getGroupsFromServer() {
      return (
        await axios.get("http://localhost:3004/groups", {
          params: {
            userId: this.userId,
          },
        })
      )?.data;
    },
    async getRecordsFromServer() {
      return (
        await axios.get("http://localhost:3004/records", {
          params: {
            userId: this.userId,
          },
        })
      )?.data;
    },
  },

  async created() {
    if (this.userId && this.$route.params.isLogin) {
      await this.start();
    } else if (this.userId) {
      const { data } = await axios.get("http://localhost:3004/users", {
        params: { id: this.userId },
      });
      console.log(data.length);
      if (data.length) {
        console.log("if_statement");
        this.setUserNameMutation({ name: data[0].name });
        await this.getDataFromServer();
        if (
          this.$route.name === "todoBoard" &&
          doesTheGroupPathNotExist(this.groups, this.$route.params.path)
        ) {
          this.$router.push({ name: "404" });
        } else if (this.$route.name === "createBoard" && this.groups.length) {
          this.$router.push({
            name: "todoBoard",
            params: {
              path: this.groups[0].path,
            },
          });
        }
      } else {
        console.log("else_statement");
        this.$router.push({ name: "Login" });
      }
    }
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

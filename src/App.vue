<template>
  <div id="app">
    <!--    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    -->
    <router-view @successfulLogin="start" />
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      mode: this.$route.path.slice(1),
    };
  },
  computed: {
    ...mapState(["userId", "groups"]),
  },
  methods: {
    ...mapMutations(["setGroupsMutation", "setRecordsMutation"]),
    async start() {
      await this.getDataFromServer();
      this.$router.push(this.groups[0].path);
    },
    async getDataFromServer() {
      let groups = [];
      let records = {};
      try {
        groups = await this.getGroupsFromServer();
        this.setGroupsMutation({ groups });
        // let nameOfGroups = groups.map((el) => el.name);
        for (let group of groups) {
          records[group.path.slice(1)] = [];
          this.addNewRoute(group.path, group.name);
        }
        let result = await this.getRecordsFromServer();
        console.log(result);
        for (let record of result) {
          for (let group of groups) {
            if (record.groupId === group.id) {
              records[group.path.slice(1)].push(record);
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
        await axios.get("http://localhost:3000/groups", {
          params: {
            userId: this.userId,
          },
        })
      )?.data;
    },
    async getRecordsFromServer() {
      return (
        await axios.get("http://localhost:3000/records", {
          params: {
            userId: this.userId,
          },
        })
      ).data;
    },
    addNewRoute(path, name) {
      this.$router.addRoute({
        path,
        name,
        component: () => import("@/views/TodoBoardView"),
      });
    },
  },
  watch: {
    $route() {
      console.log(this.$route.path.slice(1));
      if (!this.userId && this.$route.path.slice(1) !== "login") {
        this.$router.push("login");
      } else if (this.userId && this.$route.path.slice(1) === "login") {
        this.$router.push(this.groups[0].name);
      }
    },
  },
};
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

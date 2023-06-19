<template>
  <div class="nav-bar bg-black">
    <GroupWorkingModal
      v-if="showCreateGroup"
      @confirm-method="addNewRoute"
      @close-method="switchGroupCreationMode"
    />
    <GroupWorkingModal
      v-if="showEditGroup"
      :name="editingGroup.name"
      :path="editingGroup.path"
      :is-edit="showEditGroup"
      @confirm-method="changeExistingRoute"
      @close-method="switchGroupEditionMode"
    />
    <div class="navigation-header text-small-12 grey-9">Группы задач</div>
    <ul class="navigation-list">
      <li v-for="group of groups" :key="group.id" class="route-text">
        <router-link :to="group.path" class="text-18 white"
          >{{ group.name }}
        </router-link>
        <div class="button-group">
          <button
            class="button-nav hover-icon-fill bg-black"
            @click="switchGroupEditionMode(group)"
          >
            <PenSmallIcon class="hover-icon" />
          </button>
          <button
            class="button-nav bg-black hover-icon-fill"
            @click="logRouter"
          >
            <TrashSmallIcon />
          </button>
        </div>
      </li>
    </ul>
    <button
      class="button-add-group text-14 grey-7 bg-black"
      @click="switchGroupCreationMode"
    >
      <PlusIcon />Добавить группу
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { nanoid } from "nanoid";

import GroupWorkingModal from "@/components/modal/GroupWorkingModal";

import PlusIcon from "@/components/icons/PlusIcon";
import PenSmallIcon from "@/components/icons/PenSmallIcon";
import TrashSmallIcon from "@/components/icons/TrashSmallIcon";

import getGroupIndex from "@/helpers/getGroupIndex";

export default {
  name: "NavBar",
  components: {
    TrashSmallIcon,
    PenSmallIcon,
    PlusIcon,
    GroupWorkingModal,
  },
  data() {
    return {
      showCreateGroup: false,
      showEditGroup: false,
      editingGroup: undefined,
    };
  },
  computed: {
    ...mapState(["groups"]),
  },
  methods: {
    ...mapActions(["addNewGroupAction", "changeExistingGroupAction"]),
    addNewRoute(event) {
      this.$router.addRoute({
        path: event.path,
        name: event.name,
        component: () => import("@/views/TodoBoardView"),
      });
      const group = {
        id: nanoid(),
        path: event.path,
        name: event.name,
      };
      this.addNewGroupAction(group);
      this.switchGroupCreationMode();
    },
    changeExistingRoute(event) {
      const routes = this.$router.getRoutes();
      const index = getGroupIndex(routes, event.path);
      routes[index].path = event.path;
      routes[index].name = event.name;
      this.changeExistingGroupAction({ path: event.path, name: event.name });
      this.switchGroupEditionMode();
    },
    switchGroupCreationMode() {
      this.showCreateGroup = !this.showCreateGroup;
    },
    switchGroupEditionMode(group = undefined) {
      this.showEditGroup = !this.showEditGroup;
      this.editingGroup = group;
    },
    logRouter() {
      console.log(this.$router.getRoutes());
      for (let route of this.$router.getRoutes()) {
        console.log(route);
      }
      console.log("Working");
      console.log(getGroupIndex(this.$router.getRoutes(), this.$route.path));
    },
  },
};
</script>

<style scoped>
.nav-bar {
  width: 224px;
  height: 100%;
  position: fixed;
  z-index: 1;
}
.navigation-list {
  margin-top: 32px;
  margin-left: 28px;
}
.route-text {
  margin-top: 16px;
  margin-bottom: 16px;
  margin-right: 16px;
  width: calc(100% - 16px);
  display: flex;
  justify-content: space-between;
}
.navigation-header {
  margin-top: 32px;
  margin-left: 28px;
}

.button-add-group {
  margin-top: 24px;
  margin-left: 28px;
}
.button-nav {
}
</style>

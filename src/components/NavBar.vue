<template>
  <div class="nav-bar bg-black">
    <div v-if="groups.length">
      <GroupWorkingModal
        v-if="showCreateGroup"
        class="modal"
        @confirm-method="addNewRoute"
        @close-method="switchGroupCreationMode"
      />
      <GroupWorkingModal
        v-if="showEditGroup"
        class="modal"
        :name="editingGroup.name"
        :path="editingGroup.path"
        :is-edit="showEditGroup"
        @confirm-method="changeExistingRoute"
        @close-method="switchGroupEditionMode"
      />
      <RemoveWorkingModal
        v-if="showDeleteGroup"
        class="modal"
        :storage-name="editingGroup.name"
        :is-remove-group="true"
        @confirm-delete="deleteExistingGroup"
        @cancel-delete="switchGroupDeleteMode"
      />
      <div class="navigation-header text-small-12 grey-9">
        {{ $t("group.groupOfTaskTitle") }}
      </div>
      <ul class="navigation-list">
        <li
          v-for="group of groups"
          :key="group.id"
          :class="{
            activeClass: group.path === currenPath,
          }"
        >
          <router-link :to="{ name: 'todoBoard', params: { path: group.path } }"
            ><div
              class="route-text text-18"
              :class="{ primary: group.path === currenPath }"
              @mouseover="hoverButton(group)"
              @mouseleave="hoveredButton = ''"
            >
              {{ group.name }}
              <div class="button-group" v-if="group.path === hoveredButton">
                <button
                  :title="$t('title.edit')"
                  class="button-nav hover-icon-fill bg-black"
                  @click.prevent="switchGroupEditionMode(group)"
                >
                  <PenSmallIcon class="hover-icon" />
                </button>
                <button
                  :title="$t('title.delete')"
                  class="button-nav bg-black hover-icon-fill"
                  @click.prevent="switchGroupDeleteMode(group)"
                >
                  <TrashSmallIcon />
                </button>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <button
        class="button-add-group text-14 grey-7 bg-black"
        @click="switchGroupCreationMode"
      >
        <PlusIcon />
        {{ $t("group.addNewGroup") }}
      </button>
    </div>
    <div class="navigation-header text-small-12 grey-9" v-else>
      {{ $t("group.noGroupNavBar") }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import GroupWorkingModal from "@/components/modal/GroupWorkingModal";

import PlusIcon from "@/components/icons/PlusIcon";

import TrashSmallIcon from "@/components/icons/TrashSmallIcon.vue";
import PenSmallIcon from "@/components/icons/PenSmallIcon.vue";
import { nanoid } from "nanoid";
import RemoveWorkingModal from "@/components/modal/RemoveWorkingModal.vue";

export default {
  name: "NavBar",
  components: {
    RemoveWorkingModal,
    PenSmallIcon,
    TrashSmallIcon,
    PlusIcon,
    GroupWorkingModal,
  },
  data() {
    return {
      showCreateGroup: false,
      showEditGroup: false,
      showDeleteGroup: false,
      editingGroup: undefined,
      hoveredButton: "",
    };
  },
  computed: {
    ...mapState(["groups"]),
    currenPath() {
      return this.$route.params.path;
    },
  },
  methods: {
    ...mapActions([
      "addNewGroupAction",
      "changeExistingGroupAction",
      "deleteExistingGroupAction",
    ]),
    switchGroupCreationMode() {
      this.showCreateGroup = !this.showCreateGroup;
    },
    switchGroupEditionMode(group = undefined) {
      this.showEditGroup = !this.showEditGroup;
      this.editingGroup = group;
    },
    switchGroupDeleteMode(group = undefined) {
      this.showDeleteGroup = !this.showDeleteGroup;
      this.editingGroup = group;
    },
    addNewRoute(event) {
      const route = {
        id: nanoid(),
        name: event.name,
        path: event.newPath,
      };
      this.addNewGroupAction(route);
      this.switchGroupCreationMode();
    },
    changeExistingRoute(event) {
      this.changeExistingGroupAction({
        name: event.name,
        oldPath: event.oldPath,
        newPath: event.newPath,
        id: this.editingGroup.id,
      });
      this.switchGroupEditionMode();
    },
    async deleteExistingGroup() {
      await this.deleteExistingGroupAction({
        path: this.editingGroup.path,
        id: this.editingGroup.id,
      });
      console.log(this.groups);
      console.log("groupLength", this.groups.length);
      if (!this.groups.length) {
        this.$router.push({ name: "createBoard" });
      }
      if (this.editingGroup.path === this.currenPath) {
        this.$router.push({
          name: "todoBoard",
          params: { path: this.groups[0].path },
        });
      }
      this.switchGroupDeleteMode();
    },
    hoverButton(group) {
      this.hoveredButton = group.path;
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
  margin-left: 24px;
}
.route-text {
  margin-top: 16px;
  margin-bottom: 16px;
  margin-right: 16px;
  width: calc(100% - 24px);
  display: flex;
  justify-content: space-between;
}
.navigation-header {
  margin-top: 32px;
  margin-left: 24px;
  margin-right: 20px;
}

.button-add-group {
  margin-top: 24px;
  margin-left: 28px;
}
.activeClass {
  padding-left: 24px;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='3' viewBox='0 0 16 3' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='0.5' width='16' height='2' rx='1' fill='%235768E6'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: left center;
}
.modal {
  margin-top: -32px;
  padding-left: 112px;
}
.button-group {
  display: flex;
}
</style>

<template>
  <div class="container bg">
    <div class="header header-1">
      {{ $t("group.noGroupTitleUpper") }}
    </div>
    <div class="header-1">
      {{ $t("group.noGroupTitleDowner") }}
    </div>
    <LabelInputForm
      v-model="groupName"
      :label="$t('group.groutName')"
      id="group-name"
      :error-text="groupNameErrorText"
      class="group-name-input"
      @enter="addNewGroup"
    />
    <LabelInputForm
      v-model="groupPath"
      :label="$t('group.groupPath')"
      id="path"
      :error-text="groupPathErrorText"
      class="path-input"
      @enter="addNewGroup"
    />
    <button
      class="button long-button bg-primary white text-18"
      @click="addNewGroup"
      :disabled="!isCorrect"
    >
      {{ $t("action.addAction") }}
    </button>
  </div>
</template>

<script>
import LabelInputForm from "@/components/LabelInputForm";
import { mapActions } from "vuex";
import { nanoid } from "nanoid";
export default {
  name: "NoGroups",
  components: { LabelInputForm },
  data() {
    return {
      groupName: "",
      groupPath: "",
    };
  },
  computed: {
    groupNameErrorText() {
      if (!this.groupName) {
        return this.$t("error.fieldIsEmpty");
      } else {
        return "";
      }
    },
    groupPathErrorText() {
      if (!this.groupPath) {
        return this.$t("error.fieldIsEmpty");
      } else {
        return "";
      }
    },
    isCorrect() {
      return !this.groupPathErrorText.length && !this.groupNameErrorText.length;
    },
  },
  methods: {
    ...mapActions(["addNewGroupAction"]),
    addNewGroup() {
      if (this.isCorrect) {
        this.addNewGroupAction({
          id: nanoid(),
          name: this.groupName,
          path: this.groupPath,
        });
        this.$router.push({
          name: "todoBoard",
          params: { path: this.groupPath },
        });
      } else {
        console.log("error adding group");
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 84px);
}
.header {
  text-align: center;
  margin-top: calc(141px - 84px);
}
.group-name-input {
  margin-top: 59px;
}
.path-input {
  margin-top: 43px;
}

.button {
  margin-top: 32px;
}
</style>

<template>
  <div class="main-container">
    <div class="content bg">
      <button class="button-cross bg" @click="closeModal">
        <CrossIcon />
      </button>
      <div class="header header-1" v-if="isEdit">
        {{ $t("modal.editingGroupTitle", { name }) }}
      </div>
      <div class="header header-1" v-else>
        {{ $t("group.addNewGroup") }}
      </div>
      <LabelInputForm
        v-model="groupName"
        :label="$t('group.groutName')"
        id="group-name"
        :error-text="groupNameErrorText"
        class="group-name-text"
        @enter="confirmMethod"
      />
      <LabelInputForm
        v-model="groupPath"
        :label="$t('group.groupPath')"
        id="path-name"
        :error-text="groupPathErrorText"
        class="group-path-text"
        @enter="confirmMethod"
      />
      <button
        class="button-confirm long-button bg-primary white"
        @click="confirmMethod"
        :disabled="!isCorrect"
        v-if="isEdit"
      >
        {{ $t("action.changeAction") }}
      </button>
      <button
        class="button-confirm long-button bg-primary white"
        @click="confirmMethod"
        :disabled="!isCorrect"
        v-else
      >
        {{ $t("action.addAction") }}
      </button>
    </div>
  </div>
</template>

<script>
import CrossIcon from "@/components/icons/CrossIcon";
import LabelInputForm from "@/components/LabelInputForm.vue";
import { mapState } from "vuex";
import doesTheGroupNameNotExist from "@/helpers/doesTheGroupNameNotExist";
import doesTheGroupPathNotExist from "@/helpers/doesTheGroupPathNotExist";
export default {
  name: "GroupWorkingModal",
  components: { LabelInputForm, CrossIcon },
  props: {
    name: {
      type: String,
      required: false,
      default: "",
    },
    path: {
      type: String,
      required: false,
      default: "",
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      groupName: this.name,
      groupPath: this.path,
    };
  },
  methods: {
    confirmMethod() {
      console.log(this.isCorrect);
      if (this.isCorrect) {
        this.$emit("confirm-method", {
          name: this.groupName,
          newPath: this.groupPath,
          oldPath: this.path,
        });
      }
    },
    closeModal() {
      this.$emit("close-method");
    },
  },
  computed: {
    ...mapState(["groups"]),
    groupNameErrorText() {
      if (!this.groupName.length) {
        return this.$t("error.groupNameIsEmpty");
      } else if (this.isEdit && this.groupName === this.name) {
        return "";
      } else if (!doesTheGroupNameNotExist(this.groups, this.groupName)) {
        return "*Имя группы уже существует";
      } else {
        return "";
      }
    },
    groupPathErrorText() {
      if (!this.groupPath.length) {
        return this.$t("error.groupPathIsEmpty");
      } else if (this.isEdit && this.groupPath === this.path) {
        return "";
      } else if (!doesTheGroupPathNotExist(this.groups, this.groupPath)) {
        return "*Путь группы уже существует";
      } else {
        return "";
      }
    },
    isCorrect() {
      return !this.groupNameErrorText && !this.groupPathErrorText;
    },
  },
};
</script>

<style scoped>
.main-container {
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 600px;
  height: 403px;
}

.button-cross {
  width: 24px;
  height: 24px;
  margin-top: 16px;
  margin-right: 16px;
  margin-left: calc(100% - 40px);
  padding: 0;
}
.header {
  text-align: center;
}

.group-name-text {
  margin-top: 51px;
  margin-left: 32px;
}
.group-path-text {
  margin-top: 43px;
  margin-left: 32px;
}
.button-confirm {
  margin-top: 32px;
  margin-left: 32px;
}
</style>

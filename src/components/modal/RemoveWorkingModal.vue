<template>
  <div class="main-container">
    <div class="content bg-white">
      <button class="close-button bg-white" @click="cancelMethod">
        <CrossIcon />
      </button>
      <div v-if="!isRemoveGroup">
        <div class="header header-1">
          {{ $t("modal.removeGroutTitle") }}
        </div>
        <div class="text text-18">
          {{ $t("modal.removeTask", { recordName, storageName }) }}
        </div>
        <div class="text-down text-18">
          {{ $t("warning.removeTask") }}
        </div>
      </div>
      <div v-else>
        <div class="header header-1">
          {{ $t("modal.removeGroupTitle", { storageName }) }}
        </div>
        <div class="text text-18">
          {{ $t("modal.removeGroup", { storageName }) }}
        </div>
        <div class="text-down text-18">
          {{ $t("warning.removeGroup") }}
        </div>
      </div>
      <div class="button-group">
        <button
          class="two-button-modal button-color-white text-18"
          @click="cancelMethod"
        >
          {{ $t("action.cancelAction") }}
        </button>
        <button class="two-button-modal bg-red text-18" @click="confirmMethod">
          {{ $t("action.deleteAction") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CrossIcon from "@/components/icons/CrossIcon";
import { mapState } from "vuex";
export default {
  name: "RemoveWorkingModal",
  components: { CrossIcon },
  props: {
    recordName: {
      type: String,
      required: false,
      default: "",
    },
    storageName: {
      type: String,
      required: true,
    },
    isRemoveGroup: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState(["language"]),
  },
  methods: {
    cancelMethod() {
      this.$emit("cancel-delete");
    },
    confirmMethod() {
      this.$emit("confirm-delete");
    },
  },
};
</script>

<style scoped>
.main-container {
  min-width: 100%;
  min-height: 100%;
  position: fixed;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 600px;
  height: 342px;
}

.close-button {
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
.text {
  min-height: 70px;
  margin: 32px;
  overflow-wrap: break-word;
}
.text-down {
  margin-left: 32px;
  margin-bottom: 20px;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-left: 32px;
  margin-right: 32px;
}
</style>

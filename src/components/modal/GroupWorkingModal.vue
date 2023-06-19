<template>
  <div class="main-container">
    <div class="content bg">
      <button class="button-cross bg" @click="closeModal">
        <CrossIcon />
      </button>
      <div class="header header-1" v-if="isEdit">
        Редактирование группы {{ name }}
      </div>
      <div class="header header-1" v-else>Добавить группу</div>
      <div class="group-name-text text-18">Название группы</div>
      <input class="input new-task-form" type="text" v-model="groupName" />
      <div class="group-path-text text-18">Путь</div>
      <input class="input new-task-form" type="text" v-model="groupPath" />
      <button
        class="button-confirm long-button bg-primary white"
        @click="confirmMethod"
        v-if="isEdit"
      >
        Редактировать
      </button>
      <button
        class="button-confirm long-button bg-primary white"
        @click="confirmMethod"
        v-else
      >
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
import CrossIcon from "@/components/icons/CrossIcon";
export default {
  name: "GroupWorkingModal",
  components: { CrossIcon },
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
      this.$emit("confirm-method", {
        name: this.groupName,
        path: this.groupPath,
      });
    },
    closeModal() {
      this.$emit("close-method");
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
  margin-top: 24px;
  margin-left: 32px;
}
.group-path-text {
  margin-top: 16px;
  margin-left: 32px;
}
.input {
  margin-top: 8px;
  margin-left: 32px;
  margin-right: 32px;
  min-height: 48px;
  min-width: 536px;
}
.button-confirm {
  margin-top: 32px;
  margin-left: 32px;
}
</style>

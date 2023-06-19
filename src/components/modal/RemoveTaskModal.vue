<template>
  <div class="main-container">
    <div class="content bg-white">
      <button class="close-button bg-white" @click="cancelMethod">
        <CrossIcon />
      </button>
      <div class="header header-1">Удаление задачи</div>
      <div class="text text-18">
        Вы уверены, что хотите удалить задачу “{{ recordName }}” из Группы задач
        "{{ storageName }}"? <br /><br />
        Восстановление данных удаленной задачи невозможно.
      </div>
      <div class="button-group">
        <button class="two-button-modal bg-white text-18" @click="cancelMethod">
          Отменить
        </button>
        <button class="two-button-modal bg-red text-18" @click="confirmMethod">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CrossIcon from "@/components/icons/CrossIcon";
export default {
  name: "RemoveTaskModal",
  components: { CrossIcon },
  props: {
    recordName: {
      type: String,
      required: true,
    },
    storageName: {
      type: String,
      required: true,
    },
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
  margin: 32px;
  overflow-wrap: break-word;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-left: 32px;
  margin-right: 32px;
}
</style>

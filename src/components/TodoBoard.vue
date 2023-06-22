<template>
  <div class="container bg">
    <RemoveWorkingModal
      :record-name="recordOnDelete.text"
      :storage-name="$route.params.path"
      @cancel-delete="switchDeleteModal"
      @confirm-delete="deleteRecord"
      class="modal"
      v-if="isRemoveTaskShow"
    />
    <div class="ongoing-records-label text-small-14 black">
      {{ $t("task.ongoingTask") }}
    </div>
    <div
      class="task-input new-task-form bg-white"
      :class="{
        'input-form-has-error': inputFocused && !inputTaskText.length,
        'input-form-has-focus': inputFocused,
      }"
    >
      <input
        v-model="inputTaskText"
        type="text"
        id="input"
        minlength="1"
        maxlength="100"
        :placeholder="$t('task.placeholderTask')"
        class="input-task-text text-18"
        @keydown.enter="createTodoRecord"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
      />
      <button
        :disabled="!inputTaskText.length"
        class="button default-button bg-primary white"
        @click="createTodoRecord"
      >
        {{ $t("action.addAction") }}
      </button>
    </div>
    <label for="input" class="error-text text-14 red">{{
      inputTaskTextError
    }}</label>
    <div class="no-task-header header-2" v-if="!recordsList.length">
      {{ $t("task.noTask") }}
    </div>
    <ul>
      <li v-for="record in ongoingRecords" :key="record.id">
        <TodoRecord
          :record="record"
          @change-text="changeRecordText(record, $event)"
          @change-status="changeRecordStatus(record)"
          @delete-record="switchDeleteModal(record)"
          class="record"
        />
      </li>
    </ul>
    <div
      class="completed-records-label text-small-14 black"
      v-if="completedRecords.length"
    >
      {{ $t("task.completedTask") }}
    </div>
    <ul>
      <li v-for="record in completedRecords" :key="record.id">
        <TodoRecord
          :record="record"
          @change-text="changeRecordText(record, $event)"
          @change-status="changeRecordStatus(record)"
          @delete-record="switchDeleteModal(record)"
          class="record"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import { mapState, mapActions } from "vuex";
import TodoRecord from "@/components/TodoRecord";
import getGroupId from "@/helpers/getGroupId";
import RemoveWorkingModal from "@/components/modal/RemoveWorkingModal.vue";

export default {
  name: "TodoBoard",
  components: { RemoveWorkingModal, TodoRecord },
  data() {
    return {
      inputHasFocused: false,
      inputHasError: false,
      inputTaskText: "",
      isRemoveTaskShow: false,
      recordOnDelete: undefined,
      inputFocused: false,
      storage: this.$route.params.path,
    };
  },
  computed: {
    ...mapState(["userName", "userId", "groups", "records"]),
    recordsList() {
      console.log(`storage ${this.storage}`);
      return this.records[this.storage] ? this.records[this.storage] : [];
    },
    ongoingRecords() {
      return this.recordsList
        ? this.recordsList.filter((el) => !el.checked)
        : [];
    },
    completedRecords() {
      return this.recordsList
        ? this.recordsList.filter((el) => el.checked)
        : [];
    },
    inputTaskTextError() {
      if (!this.inputTaskText.length && this.inputFocused) {
        return this.$t("error.newTaskIsEmpty");
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapActions([
      "addNewRecordAction",
      "changeRecordTextAction",
      "changeRecordStatusAction",
      "deleteRecordAction",
    ]),
    createTodoRecord() {
      console.log(this.$route);
      if (this.inputTaskText.length) {
        this.addNewRecordAction({
          record: {
            userId: this.userId,
            groupId: getGroupId(this.groups, this.storage),
            id: nanoid(),
            text: this.inputTaskText,
            checked: false,
            completionTime: "",
          },
          storage: this.storage,
        });
        this.inputTaskText = "";
        this.inputHasError = false;
      }
    },
    changeRecordText(record, { text }) {
      this.changeRecordTextAction({ record, text });
    },
    changeRecordStatus(record) {
      console.log(`changeRecordStatus:${record.checked}`);
      this.changeRecordStatusAction({ record });
    },
    switchDeleteModal(record = undefined) {
      this.isRemoveTaskShow = !this.isRemoveTaskShow;
      this.recordOnDelete = record;
    },
    deleteRecord() {
      this.deleteRecordAction({
        record: this.recordOnDelete,
        storage: this.storage,
      });
      this.switchDeleteModal();
    },
  },
  watch: {
    $route(to) {
      this.storage = to.params.path;
    },
  },
};
</script>

<style scoped>
.no-task-header {
  text-align: center;
  margin-top: 32px;
}

.container {
  min-height: calc(100vh - 75px);
}
.ongoing-records-label {
  margin-top: calc(54px - 84px);
  margin-left: 80px;
}
.completed-records-label {
  margin-top: 40px;
  margin-left: 80px;
}

.task-input {
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-left: 80px;
  margin-right: 80px;
}

.input-task-text {
  padding-left: 24px;
  width: 100%;
}

.button {
  margin: 4px;
}

.record {
  min-height: 56px;
  margin: 8px 80px;
}

.record:last-child {
  margin-bottom: 0;
}

.modal {
  margin-top: -75px;
  margin-left: -224px;
}

.error-text {
  margin-top: 8px;
  margin-left: 86px;
}

.input-form-has-focus {
  border: 1px solid #5768e6;
}
.input-form-has-error {
  border: 1px solid #f35a76;
}
</style>

<template>
  <div class="container bg">
    <RemoveTaskModal
      class="modal"
      v-if="isRemoveTaskShow"
      :record-name="recordOnDelete.text"
      :storage-name="$route.name"
      @cancel-delete="switchDeleteModal"
      @confirm-delete="deleteRecord"
    />
    <div class="ongoing-records-label text-small-14 black">Сделать</div>
    <div class="task-input new-task-form bg-white">
      <input
        type="text"
        v-model="inputTaskText"
        class="input-task-text text-18"
        @keydown.enter="createTodoRecord"
      />
      <button
        class="button default-button bg-primary white"
        @click="createTodoRecord"
      >
        Добавить
      </button>
    </div>
    <ul>
      <li v-for="record in ongoingRecords" :key="record.id">
        <TodoRecord
          class="record"
          :record="record"
          @change-text="changeRecordText(record, $event)"
          @change-status="changeRecordStatus(record)"
          @delete-record="switchDeleteModal(record)"
        />
      </li>
    </ul>
    <div
      class="completed-records-label text-small-14 black"
      v-if="completedRecords.length"
    >
      ЗАВЕРШЕНО
    </div>
    <ul>
      <li v-for="record in completedRecords" :key="record.id">
        <TodoRecord
          class="record"
          :record="record"
          @change-text="changeRecordText(record, $event)"
          @change-status="changeRecordStatus(record)"
          @delete-record="switchDeleteModal(record)"
        />
      </li>
    </ul>
    <p>{{ $route.name }}</p>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import { mapState, mapActions } from "vuex";
import TodoRecord from "@/components/TodoRecord";
import getGroupId from "@/helpers/getGroupId";
import RemoveTaskModal from "@/components/modal/RemoveTaskModal";

export default {
  name: "TodoBoard",
  components: { RemoveTaskModal, TodoRecord },
  props: {
    storage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputHasFocused: false,
      inputHasError: false,
      inputTaskText: "",
      isRemoveTaskShow: false,
      recordOnDelete: undefined,
    };
  },
  computed: {
    ...mapState(["userName", "userId", "groups", "records"]),
    recordsList() {
      console.log(`storage ${this.storage}`);
      return this.records[this.storage];
    },
    ongoingRecords() {
      console.log(this.recordsList);
      return this.recordsList.filter((el) => !el.checked);
    },
    completedRecords() {
      return this.recordsList.filter((el) => el.checked);
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
      if (!this.inputTaskText) {
        this.inputHasError = true;
      } else {
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
};
</script>

<style scoped>
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
  width: 100%;
}

.button {
  margin: 4px;
}

.record {
  margin: 8px 80px;
}

.modal {
  margin-top: -75px;
  margin-left: -224px;
}

.error-text {
  margin-left: 80px;
}

.input-form-has-focus {
  border: 1px solid #5768e6;
}
.input-form-has-error {
  border: 1px solid #f35a76;
}
</style>

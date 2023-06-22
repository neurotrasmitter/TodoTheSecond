<template>
  <div>
    <div
      class="container"
      :class="{ 'error-border': !text.length, 'focus-border': isFocus }"
    >
      <div class="form" :title="text">
        <input
          type="checkbox"
          class="checkbox"
          :checked="record.checked"
          :disabled="record.checked"
          @click="changeStatus"
        />
        <p
          class="text-view text-18 black"
          :class="{ 'grey-5': record.checked }"
          v-if="!isEditable"
        >
          {{ text }}
        </p>
        <input
          type="text"
          id="input"
          minlength="1"
          maxlength="125"
          class="input-text text-18 black"
          v-model="text"
          ref="text"
          @keydown.enter="confirmChange"
          @keydown.esc="discardChange"
          @focus="isFocus = true"
          @blur="isFocus = false"
          v-else
        />
      </div>
      <div class="ongoing-section" v-if="!record.checked">
        <div class="buttons" v-if="!isEditable">
          <button
            :title="$t('title.edit')"
            @click="changeMode"
            class="hover-icon"
          >
            <PencilSimpleIcon class="pencil-icon hover-icon" />
          </button>
          <button
            :title="$t('title.delete')"
            @click="deleteRecord"
            class="hover-icon"
          >
            <TrashIcon class="trash-icon hover-icon" />
          </button>
        </div>
        <div class="buttons" v-else>
          <button
            :title="$t('title.confirm')"
            class="check-button"
            :class="{ 'hover-icon': text.length, 'icon-gray': !text.length }"
            @click="confirmChange"
            :disabled="!text.length"
          >
            <CheckBigIcon />
          </button>
          <Line4Component />
          <button
            class="cancel-button small-button-color-white"
            @click="discardChange"
          >
            {{ $t("action.cancelAction") }}
          </button>
        </div>
      </div>
      <div class="completed-section" v-else>
        <div class="completion-time-shower">
          <div class="completion-time-label grey-8 text-small-12">
            {{ $t("task.closedTask") }}
          </div>
          <div class="text-small-12">{{ completionDate }}</div>
        </div>
        <Line4Component />
        <button class="undo-button button" @click="changeStatus">
          <UndoIcon />
        </button>
      </div>
    </div>
    <label
      for="input"
      class="error-text text-small-12 red"
      v-if="!text.length"
      >{{ $t("error.changeRecordValueToEmpty") }}</label
    >
  </div>
</template>

<script>
import PencilSimpleIcon from "@/components/icons/PencilSimpleIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import CheckBigIcon from "@/components/icons/CheckBigIcon";
import Line4Component from "@/components/icons/Line4Component";
import UndoIcon from "@/components/icons/UndoIcon";

export default {
  name: "TodoRecord",
  components: {
    UndoIcon,
    Line4Component,
    CheckBigIcon,
    TrashIcon,
    PencilSimpleIcon,
  },
  props: {
    record: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      text: this.record.text,
      originText: this.record.text,
      isEditable: false,
      isFocus: false,
    };
  },
  computed: {
    completionDate() {
      const date = new Date(this.record.completionTime);
      return `${
        date.getHours().toString().length === 2
          ? date.getHours().toString()
          : "0" + date.getHours().toString()
      }:${
        date.getMinutes().toString().length === 2
          ? date.getMinutes().toString()
          : "0" + date.getMinutes().toString()
      }`;
    },
  },
  methods: {
    async changeMode() {
      this.isEditable = !this.isEditable;
      if (this.isEditable === true) {
        await this.$nextTick();
        this.$refs.text.focus();
      }
    },
    confirmChange() {
      if (this.text.length) {
        this.originText = this.text;
        this.changeMode();
        this.$emit("change-text", { text: this.text });
      }
    },
    discardChange() {
      this.text = this.originText;
      this.changeMode();
    },
    deleteRecord() {
      this.$emit("delete-record");
    },
    changeStatus() {
      this.$emit("change-status");
    },
  },
};
</script>

<style scoped>
button {
  background-color: white;
  padding: 0;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  background: #ffffff;
  border: 1px solid #e7e6e8;
  border-radius: 6px;
}
.container:hover {
  border: 1px solid #54535d;
}
.form {
  width: calc(100% - 108px);
  display: inline-flex;
  align-items: center;
}
.text-view {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
}
.input-text {
  width: 100%;
  padding: 0;
}
.trash-icon {
  margin-right: 16px;
}
.pencil-icon {
  margin-right: 20px;
}
.buttons {
  display: inline-flex;
  align-items: center;
}
.check-button {
  margin: 17px 16px;
}
.cancel-button {
  margin: 17px 16px;
}
.completed-section {
  display: inline-flex;
  align-items: center;
}

.completion-time-shower {
  margin-right: 24px;
  text-align: right;
}
.completion-time-label {
  margin-bottom: 4px;
}
.undo-button {
  margin-left: 24px;
  margin-right: 16px;
}
.error-text {
  margin-left: 6px;
}
.error-border {
  border: 1px solid #f35a76;
}
.focus-border {
  border: 1px solid #54535d;
}
</style>

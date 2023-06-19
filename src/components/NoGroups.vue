<template>
  <div class="container bg">
    <h1 class="header header-1">
      У вас не создано ни одной группы.<br />
      Добавьте группу задач, заполнив форму
    </h1>
    <LabelInputForm
      label="Название групы"
      id="group-name"
      class="group-name-input"
    />
    <LabelInputForm label="Путь" id="path" class="path-input" />
    <button class="button long-button bg-primary white text-18">
      Добавить
    </button>
  </div>
</template>

<script>
import LabelInputForm from "@/components/LabelInputForm";
export default {
  name: "NoRecords",
  components: { LabelInputForm },
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

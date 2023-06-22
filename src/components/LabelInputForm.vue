<template>
  <div class="input-box">
    <label :for="id" class="label text-14">{{ label }}</label>
    <input
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="input input-form text-18"
      :class="{
        'primary header-1': type === 'password',
        'error-border': textOfError,
      }"
      @keydown.enter="$emit('enter')"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <div class="error-text text-small-12 red" v-if="isError">
      {{ textOfError }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LabelInputForm",
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
    errorText: {
      type: String,
      required: true,
    },
  },
  computed: {
    isError() {
      return this.errorText.length;
    },
    textOfError() {
      if (this.isFocused && this.errorText) {
        return this.errorText;
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
};
</script>

<style scoped>
.input-box {
  position: relative;
}
.label {
  position: absolute;
  top: -25px;
}
.error-text {
  position: absolute;
  bottom: -18px;
  left: 4px;
}
.error-border {
  border: 1px solid #f35a76;
}
</style>

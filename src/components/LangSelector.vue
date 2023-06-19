<template>
  <div class="main-container-selector">
    <div class="info">
      <div @click="changeState">
        {{ shortenLang }} <CaretUpIcon v-if="isOpen" /> <CaretDownIcon v-else />
      </div>
    </div>
    <div class="lang-selector bg-white" v-show="isOpen">
      <ul>
        <li
          v-for="(lang, index) of languageArray"
          :key="index"
          @click="selectLang(lang)"
        >
          {{ lang }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CaretUpIcon from "@/components/icons/CaretUpIcon";
import CaretDownIcon from "@/components/icons/CaretDownIcon";
export default {
  name: "LangSelector",
  components: { CaretDownIcon, CaretUpIcon },
  data() {
    return {
      languageArray: ["Русский", "English"],
      currentLang: "Русский",
      isOpen: false,
    };
  },
  computed: {
    shortenLang() {
      return this.currentLang.substring(0, 3);
    },
  },
  methods: {
    changeState() {
      this.isOpen = !this.isOpen;
    },
    selectLang(lang) {
      this.currentLang = lang;
      this.changeState();
    },
  },
};
</script>

<style scoped>
.main-container-selector {
  display: inline-block;
  width: 148px;
  height: 84px;
}
.lang-selector {
  border: 1px solid #b6b5ba;
  border-radius: 6px;
}
.info {
  display: flex;
  justify-content: right;
  align-items: center;
  text-align: left;
}
li {
  padding-left: 24px;
}
p {
  margin: 0;
}
</style>

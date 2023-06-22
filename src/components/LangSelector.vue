<template>
  <div class="main-container-selector" @blur="isOpen = false" tabindex="0">
    <div class="info">
      <div
        @click="changeState"
        class="hover-icon"
        :class="{ 'icon-primary': isOpen }"
      >
        {{ language }} <CaretUpIcon v-if="isOpen" /> <CaretDownIcon v-else />
      </div>
    </div>
    <div class="lang-selector bg-white" v-show="isOpen">
      <ul class="list">
        <li
          v-for="(lang, index) of languageArray"
          :key="index"
          @click="selectLang(lang)"
        >
          <div class="text">{{ lang }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CaretUpIcon from "@/components/icons/CaretUpIcon";
import CaretDownIcon from "@/components/icons/CaretDownIcon";
import { mapMutations, mapState } from "vuex";
import i18n from "@/i18n";
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
    ...mapState(["language"]),
    shortenLang() {
      return this.currentLang.substring(0, 3);
    },
  },
  methods: {
    ...mapMutations(["changeLanguage"]),
    changeState() {
      this.isOpen = !this.isOpen;
    },
    selectLang(lang) {
      console.log("argument", lang);
      this.currentLang = lang;
      console.log("currentLang", this.currentLang);
      console.log("shortenLang", this.shortenLang);
      this.changeLanguage({ language: this.shortenLang });
      if (this.shortenLang === "Рус") {
        i18n.locale = "ru";
      } else {
        i18n.locale = "en";
      }

      this.changeState();
      console.log(this.language);
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
.text:hover {
  color: #5768e6;
}
.list {
  margin-top: 16px;
  margin-bottom: 16px;
}
li {
  padding-left: 24px;
}
p {
  margin: 0;
}
</style>

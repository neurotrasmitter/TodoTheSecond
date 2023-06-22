<template>
  <div class="container bg">
    <div class="main-window bg-white">
      <h1 class="header header-1">{{ $t("auth.authorisationTitle") }}</h1>
      <div class="login-fields">
        <LabelInputForm
          :label="$t('auth.login')"
          id="login"
          :error-text="errorLoginText"
          v-model="login"
          class="login-label"
          @enter="loginMethod"
        />
        <LabelInputForm
          :label="$t('auth.password')"
          id="password"
          type="password"
          :error-text="errorPasswordText"
          v-model="password"
          class="password-label"
          @enter="loginCheck"
        />
      </div>
      <button
        class="enter-button long-button bg-primary white text-18"
        @click="loginMethod"
        :disabled="!isCorrect"
      >
        {{ $t("action.loginAction") }}
      </button>
      <LangSelector class="lang-selector-dropdown" />
    </div>
  </div>
</template>

<script>
import LangSelector from "@/components/LangSelector";
import LabelInputForm from "@/components/LabelInputForm";

import { mapState, mapActions } from "vuex";

import axios from "axios";

export default {
  name: "AuthorisationView",
  components: { LabelInputForm, LangSelector },
  data() {
    return {
      login: "",
      password: "",
      incorrectLogin: false,
    };
  },
  computed: {
    ...mapState(["userId", "userName"]),
    errorLoginText() {
      if (!this.login) {
        return this.$t("error.fieldIsEmpty");
      } else if (!this.login.match(/.+@.+\..+/)) {
        return this.$t("error.isNotEmail");
      } else if (this.incorrectLogin) {
        return this.$t("error.loginOrPasswordIncorrect");
      } else {
        return "";
      }
    },
    errorPasswordText() {
      if (this.password.length < 4) {
        return this.$t("error.passwordIsToShort");
      } else if (this.incorrectLogin) {
        return this.$t("error.loginOrPasswordIncorrect");
      } else {
        return "";
      }
    },
    isCorrect() {
      return !this.errorLoginText && !this.errorPasswordText;
    },
  },
  watch: {
    login() {
      this.incorrectLogin = false;
    },
    password() {
      this.incorrectLogin = false;
    },
  },
  methods: {
    ...mapActions(["setUserInfoAction"]),
    async loginCheck() {
      const { data } = await axios.get("http://localhost:3004/users", {
        params: { name: this.login },
      });
      if (data.length && data[0].password === this.password) {
        return data[0];
      } else {
        throw new Error("Incorrect login or password");
      }
    },
    async loginMethod() {
      let result = {};
      if (!this.errorLoginText && !this.errorPasswordText) {
        try {
          result = await this.loginCheck();
          this.setUserInfoAction({ id: result.id, name: result.name });
          window.localStorage.setItem("userId", result.id);
          window.localStorage.setItem("userName", result.name);
          this.$router.push({ name: "board", params: { isLogin: true } });
        } catch (e) {
          this.incorrectLogin = true;
        }
      } else {
        console.log("something wrong");
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-window {
  width: 600px;
  height: 441px;
  background: #ffffff;
  border: 1px solid #e7e6e8;
  border-radius: 6px;
}

.header {
  margin-top: 40px;
  margin-bottom: 24px;
  text-align: center;
}

.login-fields {
  margin-left: 32px;
}

.login-label {
  margin-top: 51px;
}

.password-label {
  margin-top: 43px;
}

.enter-button {
  margin-left: 32px;
  margin-top: 32px;
  margin-bottom: 50px;
}

.lang-selector-dropdown {
  margin-left: calc(300px - 148px + 20px);
}
</style>

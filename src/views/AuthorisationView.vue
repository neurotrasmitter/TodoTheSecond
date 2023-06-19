<template>
  <div class="container bg">
    <div class="main-window bg-white">
      <h1 class="header header-1">Авторизация в системе</h1>
      <div class="login-fields">
        <LabelInputForm
          label="Логин"
          id="login"
          :error-text="errorLoginText"
          v-model="login"
          class="login-label"
        />
        <LabelInputForm
          label="Пароль"
          id="password"
          type="password"
          :error-text="errorPasswordText"
          v-model="password"
          class="password-label"
        />
      </div>
      <button
        class="enter-button long-button bg-primary white text-18"
        @click="loginMethod"
      >
        Войти
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
        return "*Поле не должно быть пустым";
      } else if (!this.login.match(/.+@.+\..+/)) {
        return "*Введите адрес электронной почты";
      } else if (this.incorrectLogin) {
        return "*Неверный логин или пароль";
      } else {
        return "";
      }
    },
    errorPasswordText() {
      if (this.password.length < 4) {
        return "*Пароль должен быть не менее 4 символов";
      } else if (this.incorrectLogin) {
        return "*Неверный логин или пароль";
      } else {
        return "";
      }
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
      const payload = { login: this.login, password: this.password };
      const { data } = await axios.get("http://localhost:3000/users", {
        params: payload,
      });
      if (data.length !== 1) {
        throw new Error("loginCheck: incorrect login");
      }
      return data[0];
    },
    async loginMethod() {
      let result = {};
      if (!this.errorLoginText && !this.errorPasswordText) {
        try {
          result = await this.loginCheck();
          this.setUserInfoAction({ id: result.id, name: result.name });
          this.$emit("successfulLogin");
        } catch (e) {
          this.incorrectLogin = true;
        }
      } else {
        console.log("somthing wrong");
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

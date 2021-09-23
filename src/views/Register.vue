<template>
  <v-container class="register-container">
    <v-card class="entry-container">
      <p class="text-center register-title">Register</p>
      <v-card-text>
        <form @submit.prevent="onRegister" class="register-form">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                v-model="email"
                type="email"
                required
                outlined
                append-icon="mdi-email"
                class="mb-3 w-350"
                autocomplete="off"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                v-model="password"
                type="password"
                required
                outlined
                append-icon="mdi-lock"
                class="mb-3 w-350"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="confirmPassword"
                label="Confirm password"
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                outlined
                append-icon="mdi-lock-open-check"
                class="w-350"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 mt-50>
              <v-btn
                class="green register-btn"
                dark
                width="120"
                type="submit"
                :loading="loading"
                :disabled="loading || !formIsValid"
              >
                {{ btn.REGISTER }}
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 mt-100 class="font-16">
              Already an account? Login
              <router-link to="/login"
                ><span class="link">here</span></router-link
              >.
            </v-flex>
          </v-layout>
        </form>
      </v-card-text>
    </v-card>
    <app-alert
      class="mt-5"
      v-if="error"
      @dissmised="onDissmised"
      :text="error.message"
    ></app-alert>
  </v-container>
</template>

<script>
import { buttonLabel } from "../utils/constants";

export default {
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
    btn: buttonLabel,
  }),
  created() {
    this.$store.dispatch("clearError");
  },
  computed: {
    formIsValid() {
      return (
        this.email !== "" &&
        this.email.includes('@') &&
        this.password !== "" &&
        this.confirmPassword !== "" &&
        this.password === this.confirmPassword
      );
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    onRegister() {
      this.$store.dispatch("registerUser", {
        email: this.email,
        password: this.password,
      });
    },
    onDissmised() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.entry-container {
  margin: 100px 0 0 0;
  width: 500px;
  min-height: 400px;
  background-image: linear-gradient(#EDE7F6, #7E57C2);
}
.register-title {
  margin: 10px 0;
  font-weight: bold;
  font-size: 28px;
  color: #fff;
  text-shadow: 1px 1px 3px #000;
}
.register-btn {
  box-shadow: 1px 1px 2px rgb(59, 54, 54);
  &:disabled {
    color: white !important;
  }
}
.register-form {
  padding: 10px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}
.w-350 {
  width: 350px;
}
.mt-50 {
  margin-top: 50px;
}
.mt-100 {
  margin-top: 100px;
}
span.link {
  color: orange;
  text-decoration: inherit;
}
.font-16 {
  font-size: 16px;
}
</style>
<template>
  <v-app class="main-app-body">
    <v-app-bar app class="custom-bg" dark height="60">
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2 logo"
          contain
          src="../src/assets/cross.png"
          transition="scale-transition"
          width="40"
        />
        MedApp
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/login" v-if="!userIsAuthenticated" class="mr-5" color="green">
        <span>{{ btn.LOGIN }}</span>
      </v-btn>

      <v-btn to="/register" v-if="!userIsAuthenticated" color="green">
        <span>{{ btn.REGISTER }}</span>
      </v-btn>

      <span v-if="userIsAuthenticated">
        <v-icon left>mdi-account-lock-outline</v-icon>
        <span>{{ user && user.email }}</span>
      </span>

      <v-btn
        @click="onLogout"
        v-if="userIsAuthenticated"
        class="orange darken-4 ml-10"
      >
        <v-icon left>mdi-power</v-icon>
        <span>{{ btn.LOGOUT }}</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-if="userIsAuthenticated"
      permanent
      dark
      fixed
      class="mt-15 deep-purple lighten-1"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> MedApp </v-list-item-title>
          <v-list-item-subtitle class="moto"
            >Protect the people<v-icon right small
              >mdi-hand-heart</v-icon
            ></v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          :to="item.to"
          v-for="item in navigationItems"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <p class="label"><v-icon small left>mdi-copyright</v-icon><span class="mr-2">{{ currentYear }}</span>Marius Cășvean</p>

    </v-navigation-drawer>

    <v-main
      class="main-container-lg"
      :class="{ 'main-container-sm': userIsAuthenticated }"
    >
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { buttonLabel } from "./utils/constants";
import moment from 'moment';

export default {
  name: "App",
  data: () => ({
    btn: buttonLabel,
    navigationItems: [
      { title: "Dashboard", icon: "mdi-monitor-dashboard", to: "/" },
      { title: "Patients", icon: "mdi-account-group", to: "/patients" },
      {
        title: "Appointments",
        icon: "mdi-calendar-account",
        to: "/appointments",
      },
      { title: "Statistics", icon: "mdi-chart-line", to: "/statistics" },
      { title: "User profile", icon: "mdi-account", to: "/profile" },
      {
        title: "Application info",
        icon: "mdi-information",
        to: "/application-info",
      },
    ],
  }),
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    user() {
      return this.$store.getters.user;
    },
    currentYear() {
      return moment().format('YYYY');
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
.custom-bg {
  background-image: linear-gradient(to right, #4527A0, #7E57C2 )  !important;
}
.main-app-body {
  font-family: "Poppins", sans-serif !important;
}
.v-main.main-container-lg {
  background-image: url("../src/assets/medical-background.png");
  background-position: center;
}
.main-container-lg {
  margin: 60px 0 0 0;
}
.v-main.main-container-sm {
  background: #fff;
  padding: 50px !important;
  margin: 60px 0 0 256px;
}
.moto {
  display: flex;
  align-items: center;
}
.logo {
  border-radius: 50%;
}
.label {
  width: 100%;
  margin: 380px 0 0 44px;
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
}
</style>

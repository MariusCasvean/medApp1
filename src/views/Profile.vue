<template>
  <div>
    <v-icon class="icon ml-9 mt-6 mb-10">mdi-card-account-details</v-icon>
    <p style="textDecoration: underline">Logged user details:</p>
    <p><v-icon left class="mb-1">mdi-email</v-icon>Email: <span>{{ user.email }}</span></p>
    <p><v-icon left class="mb-1">mdi-key</v-icon>Id: <span>{{ user.id }}</span></p>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  transform: scale(4);
  color: #43A047;
  padding: 0;
  margin: 0;
}
span {
  color: white;
  background-color: #7E57C2;
  padding: 4px 8px;
  border-radius: 3px;
}
</style>
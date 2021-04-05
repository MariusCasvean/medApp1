<template>
  <div>
    <v-chip
      class="mb-3 d-flex gradient-chip"
      color="#5E35B1"
      label
      text-color="white"
    >
      <v-icon left>mdi-information</v-icon>
      About this application
    </v-chip>
    - The purpose for this application was to have an overview for the current
    situation regarding our patients health status <br />
    - The structure is made of a top header, the navigation menu on the left,
    main content <br />
    - Technology Stack:
    <ul class="ml-10">
      <li>Vuejs (Vuex, Router included)</li>
      <li>Visual Studio Code</li>
      <li>Firebase</li>
      <li>Vuetify</li>
      <li>Sass</li>
      <li>Material Design Icons</li>
    </ul>
    <br />
    - Application Benefits:
    <ul class="ml-10">
      <li>Easy to use</li>
      <li>Real time statistics</li>
      <li>Intuitive</li>
    </ul>
    <br />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.gradient-chip {
  background-image: linear-gradient(to right, #4527a0, #7e57c2) !important;
}
</style>
<template>
  <div>
    <v-chip
      class="mb-3 d-flex gradient-chip"
      color="#5E35B1"
      label
      text-color="white"
    >
      <v-icon left>mdi-information</v-icon>
      About this application - MedApp
    </v-chip>
    - The purpose for this application was to have an overview for the current
    situation regarding our patients health status <br />
    - The structure is made of a top header, the navigation menu on the left,
    main content <br />
    - Technology Stack:
    <ul class="ml-10 tech-list-container">
      <li><a href="https://vuejs.org/" target="_blank"><img class="tech-icon" src="../assets/stack/vue.png"/></a><span>Vuejs (Vuex, Vue Router included)</span></li>
      <li><a href="https://vuetifyjs.com/en/" target="_blank"><img class="tech-icon" src="../assets/stack/vuetify.png"/></a><span>Vuetify</span></li>
      <li><a href="https://firebase.google.com/" target="_blank"><img class="tech-icon" src="../assets/stack/firebase.png"/></a><span>Firebase</span></li>
      <li><a href="https://sass-lang.com/" target="_blank"><img class="tech-icon" src="../assets/stack/sass.jpg"/></a><span>Sass</span></li>
      <li><a href="https://materialdesignicons.com/" target="_blank"><img class="tech-icon" src="../assets/stack/mdi.png"/></a><span>Material Design Icons</span></li>
      <li><a href="https://nodejs.org/en/" target="_blank"><img class="tech-icon" src="../assets/stack/node.png"/></a><span>Nodejs</span></li>
      <li><a href="https://code.visualstudio.com/" target="_blank"><img class="tech-icon" src="../assets/stack/vsc.png"/></a><span>Visual Studio Code</span></li>
    </ul>
    <br />
    - Application Benefits:
    <ul class="ml-10 benefits-container">
      <li><v-icon left large color="green">mdi-hand-okay</v-icon>Easy to use</li>
      <li><v-icon left large color="green">mdi-finance</v-icon>Real time statistics</li>
      <li><v-icon left large color="green">mdi-lightbulb-on</v-icon>Intuitive</li>
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
.tech-list-container {
  li {
    display: flex;
    list-style-type: none;
    margin-bottom: 5px;
    align-items: center;
    span {
      font-weight: 900;
    }
  }
}
.benefits-container {
  li {
    display: flex;
    align-items: center;
    list-style-type: none;
    font-weight: 900;
    margin-bottom: 15px;
  }
}
.tech-icon {
  height: 50px;
  width: 50px;
  padding: 5px;
  margin-right: 10px;
  border-radius: 50%;
  box-shadow: 2px 2px 4px grey;
  transition: all .2s;
  &:hover {
    box-shadow: 4px 4px 10px grey;
    transform: scale(1.05);
    cursor: pointer;
  }
}
</style>
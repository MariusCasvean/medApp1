<template>
  <v-snackbar right :color="color" :timeout="5000" :value="true">
    <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  props: ["text", "color"],
  methods: {
    onClose() {
      this.$emit("dissmised");
    },
  },
};
</script>

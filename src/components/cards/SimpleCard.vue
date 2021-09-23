<template>
  <div class="simple-card">
    <div class="icon-container" :style="{ backgroundColor: bgColor }">
      <v-icon dark>{{ icon }}</v-icon>
    </div>
    <div class="content-container">
      <p class="card-title">{{ data }}</p>
      <p class="card-subtitle">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bgColor", "data", "icon", "text"],
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.simple-card {
  height: 80px;
  width: 280px;
  display: flex;
  box-shadow: 1px 1px 2px grey;
  border-radius: 5px;
  background-color: #E8F5E9;
  .icon-container {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: 1px 1px 2px grey;
    flex: 1;
    display: flex;
    justify-content: center;
    .v-icon {
      transform: scale(2);
    }
  }
  .content-container {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .card-title {
      margin: 0;
      font-size: 28px;
    }
    .card-subtitle {
      font-size: 14px;
    }
  }
}
</style>
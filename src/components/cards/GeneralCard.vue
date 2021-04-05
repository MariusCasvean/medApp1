<template>
  <div class="general-card" :style="{ backgroundColor: bgColor }">
    <v-icon color="white" :style="{ backgroundColor: bgColorIcon }">{{ icon }}</v-icon>
    <div class="top-container">
      <p class="card-text">{{ text }}</p>
      <p class="card-data">{{ data }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bgColor", "bgColorIcon", "data", "icon", "text"],
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.general-card {
  height: 120px;
  width: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 4px grey;
  color: white;
  border-radius: 5px;
  position: relative;
  margin: 0px 0px 30px 0;
  .v-icon {
    position: absolute;
    transform: scale(1.4);
    border: 1px solid white;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    top: -14px;
    left: 82px;
    box-shadow: 2px 2px 4px grey;
  }
  .top-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .card-data {
      font-size: 40px;
      margin: -10px 0 0 0;
    }
    .card-text {
      margin: 26px 0 0 0;
      font-size: 14px;
    }
  }
}
</style>
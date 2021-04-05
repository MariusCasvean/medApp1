<template>
  <div class="pressure-card" :style="{backgroundImage: `linear-gradient(to right, ${bg}, #fff)`}">
    <div class="left">
      <p class="text">{{ text }}</p>
    </div>
    <div class="right">
      <p class="data">{{ data }}</p>
      <p class="percent">{{ percent }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bg", "data", "text", "percent"],
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.pressure-card {
  height: 60px;
  min-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  box-shadow: 1px 1px 2px grey;
  border-radius: 5px;
  background-color: white;
  .left {
    display: flex;
    flex: 5;
    margin-right: 5px;
    padding: 10px;
    .text {
      font-size: 14px;
      margin: 0;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 2;
    padding: 0;
    background-image: linear-gradient(to right, #D1C4E9, #fff);
    border-radius: 5px;
    .data,
    .percent {
      margin: 0;
    }
    .data {
      font-size: 26px;
      font-weight: 900;
    }
    .percent {
      margin-top: -8px;
      font-size: 14px;
    }
  }
}
</style>
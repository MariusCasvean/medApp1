<template>
  <div class="appointment-card">
    <div class="top">
      <p>{{ user && user.firstname }}</p>
      <p>{{ user && user.lastname }}</p>
    </div>
    <div class="bottom">
      <p class="location"><v-icon left>mdi-earth</v-icon>{{ user && user.region }}</p>
      <p class="location"><v-icon left>mdi-map-marker</v-icon>{{ user && user.city }}, {{ user && user.county }}</p>
      <p class="age"><v-icon left>mdi-human-cane</v-icon>{{ user && user.age }}</p>
      <p class="date"><v-icon left>mdi-calendar-month</v-icon>{{ data && formattedDate(data.date) }}</p>
      <p class="time"><v-icon left>mdi-clock-outline</v-icon>{{ data && data.time }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ["data", "user"],
  data: () => ({}),
  methods: {
    formattedDate(dateToformat) {
      return moment(dateToformat).format("DD-MMM-yyyy");
    },
  }
};
</script>

<style lang="scss" scoped>
.appointment-card {
  background-image: linear-gradient(to bottom, #fff, #fff, #C8E6C9);
  width: 240px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
  box-shadow: 2px 2px 4px grey;
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    border-top-left-radius: 30px;
    background-color:#81C784;
    background-image: linear-gradient(to right, #C8E6C9, #43A047);
    padding: 0 10px;
    p {
      margin: 0;
      font-size: 18px;
      font-weight: 900;
    }
  }
  .bottom {
    padding:  10px;
    flex: 2;
    display: flex;
    flex-direction: column;
    .location,
    .age,
    .date,
    .time {
      margin: 0 0 5px 0;
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: 900;
    }
  }
}
</style>
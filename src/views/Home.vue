<template>
  <div>
    <div class="text-center">
      <v-progress-circular
        :size="70"
        :width="5"
        color="#43A047"
        indeterminate
        class="mt-10"
        v-if="!pageIsLoaded"
      ></v-progress-circular>
    </div>
    <v-chip v-if="pageIsLoaded" color="#5E35B1" class="d-flex mb-7 gradient-chip" label text-color="white">
      <v-icon left>mdi-eye-outline</v-icon>
      Overview
    </v-chip>
    <div class="top-container" v-if="pageIsLoaded">
      <generalCard
        :data="patients && patients.length"
        text="Total patients"
        icon="mdi-account-group"
        bgColor="#9575CD"
        bgColorIcon="#7E57C2"
      />
      <generalCard
        :data="gender('Male')"
        text="Male"
        icon="mdi-gender-male"
        bgColor="#42A5F5"
        bgColorIcon="#1E88E5"
      />
      <generalCard
        :data="gender('Female')"
        text="Female"
        icon="mdi-gender-female"
        bgColor="#E53935"
        bgColorIcon="#C62828"
      />
      <generalCard
        :data="vaccines"
        text="Vaccines"
        icon="mdi-needle"
        bgColor="#43A047"
        bgColorIcon="#388E3C"
      />
      <generalCard
        :data="appointments && appointments.length"
        text="Active appointments"
        icon="mdi-calendar-clock"
        bgColor="#AFB42B"
        bgColorIcon="#9E9D24"
      />
      <generalCard
        :data="regionList && regionList.length"
        text="Regions"
        icon="mdi-earth"
        bgColor="#8D6E63"
        bgColorIcon="#6D4C41"
      />
      <generalCard
        :data="countyList && countyList.length"
        text="Counties"
        icon="mdi-map-marker"
        bgColor="#78909C"
        bgColorIcon="#546E7A"
      />
    </div>
    <div class="mid-container" v-if="pageIsLoaded">
      <v-row class="mb-3">
        <v-col cols="9">
          <v-chip
            color="#5E35B1"
            class="d-flex mb-3 mr-100 gradient-chip"
            label
            text-color="white"
          >
            <v-icon left>mdi-human-wheelchair</v-icon>
            Disease
          </v-chip>
          <div class="diseases-container">
            <diseaseCard
              class="card"
              v-for="(item, index) in diseaseList"
              :key="index"
              :text="item"
              :data="diseasesData[index]"
              :percent="showPercent(diseasesData[index])"
            />
          </div>
        </v-col>
        <v-col cols="3">
          <v-chip color="#5E35B1" class="d-flex mb-3 gradient-chip" label text-color="white">
            <v-icon left>mdi-heart-pulse</v-icon>
            Blood pressure
          </v-chip>
          <div class="pressure-container">
            <pressureCard
              class="card"
              v-for="(item, index) in pressureList"
              :key="index"
              :text="item"
              :data="pressureData[index]"
              :percent="showPressurePercent(pressureData[index])"
              :bg="pressureColorsList[index]"
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <v-row v-if="pageIsLoaded">
      <v-col cols="12">
        <v-chip color="#5E35B1" class="d-flex mb-3 gradient-chip" label text-color="white">
          <v-icon left>mdi-calendar-clock-outline</v-icon>
          This week appointments
          <p class="bullet">{{ currentWeekAppointments && currentWeekAppointments.length }}</p>
        </v-chip>
        <div class="appointments-container">
          <appointmentCard
            v-for="(appointment, index) in currentWeekAppointments"
            :key="index"
            :data="appointment"
            :user="findPatient(appointment.patientId)"
            class="mb-4 mr-4"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  regions,
  counties,
  diseases,
  pressureColors,
  pressureValues,
} from "../utils/constants";
import moment from "moment";

export default {
  name: "Home",
  data: () => ({
    countyList: counties,
    regionList: regions,
    diseaseList: diseases,
    pressureColorsList: pressureColors,
    pressureList: pressureValues,
  }),
  methods: {
    gender(gen) {
      let data = 0;
      this.patients.forEach((patient) => {
        if (patient.gender === gen) {
          data++;
        }
      });
      return data;
    },
    showPercent(data) {
      let result = 0;
      if (this.patients) {
        result = (data / this.patients.length) * 100;
      }
      return result.toFixed();
    },
    showPressurePercent(data) {
      let result = 0;
      if (this.patients) {
        result = (data / this.patients.length) * 100;
      }
      return result.toFixed();
    },
    findPatient(id) {
      return this.patients.find((patient) => patient.id === id);
    },
  },
  computed: {
    patients() {
      return this.$store.getters.patients;
    },
    vaccines() {
      let data = 0;
      this.patients.forEach((element) => {
        if (element.covidVaccine) {
          data++;
        }
      });

      return data;
    },
    appointments() {
      return this.$store.getters.appointments;
    },
    currentWeekAppointments() {
      let data = [];
      let weekStart = moment().startOf("isoweek").format("DD-MMM-yyyy");
      let weekEnd = moment().endOf("isoweek").format("DD-MMM-yyyy");

      this.appointments.forEach((app) => {
        let appDate = moment(app.date).format("DD-MMM-yyyy");
        if (
            moment(appDate).isSameOrBefore(weekEnd) &&
            moment(appDate).isSameOrAfter(weekStart)
        ) {
          data.push(app);
        }
      });
      return data.sort((a, b) => moment(a.date) - moment(b.date));
    },
    diseasesData() {
      let data = new Array(this.diseaseList.length).fill(0);
      this.patients.forEach((patient) => {
        patient.diseases.forEach((patientDisease) => {
          this.diseaseList.forEach((disease, indexDisease) => {
            if (patientDisease === disease) {
              data[indexDisease]++;
            }
          });
        });
      });
      return data;
    },
    pressureData() {
      let data = new Array(this.pressureList.length).fill(0);
      this.patients.forEach((patient) => {
        this.pressureList.forEach((pressure, indexPressure) => {
          if (patient.bloodPressure === pressure) {
            data[indexPressure]++;
          }
        });
      });
      return data;
    },
    pageIsLoaded() {
      if (
        this.patients &&
        this.vaccines &&
        this.appointments &&
        this.regionList &&
        this.countyList &&
        this.diseasesData &&
        this.pressureData
      ) {
        return true;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mr-100 {
  margin-right: 140px;
}
.gradient-chip {
  background-image: linear-gradient(to right, #4527A0, #7E57C2) !important;
}
.top-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.mid-container {
  display: flex;
  .diseases-container {
    margin-right: 140px;
    display: flex;
    justify-content: space-between;
    flex: 2;
    flex-wrap: wrap;
    .card {
      margin: 0 0 5px 0;
    }
  }
  .pressure-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    .card {
      margin: 0 0 5px 0;
    }
  }
}
.appointments-container {
  display: flex;
  flex-wrap: wrap;
}
.bullet {
  background-color: white;
  color: #5e35b1;
  border: 1px solid white;
  border-radius: 50%;
  min-height: 24px;
  min-width: 24px;
  margin-left: 8px;
  margin-top: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}
</style>

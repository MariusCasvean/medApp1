<template>
  <div>
    <v-chip
      v-if="!loading"
      class="mb-3 d-flex gradient-chip"
      color="#5E35B1"
      label
      text-color="white"
    >
      <v-icon left>mdi-calendar-check-outline</v-icon>
      Active appointments
      <p class="bullet">{{ appointments && appointments.length }}</p>
    </v-chip>
    <v-row>
      <v-col cols="2">
        <v-select
          name="sort"
          label="Sort"
          id="sort"
          v-model="sortOption"
          outlined
          :items="sortOptionList"
          dense
        >
        </v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          name="filterByCounty"
          label="Filter by county"
          id="filterByCounty"
          v-model="filterOptionByCounty"
          outlined
          :items="countyList"
          dense
        >
        </v-select>
      </v-col>
      <v-col cols="1">
        <v-icon
          small
          class="filter-county-remove-icon"
          @click="removeCountyFilter"
          v-if="showCountyFilter"
          >mdi-filter-remove</v-icon
        >
      </v-col>
    </v-row>
    <p class="d-flex" v-if="appointments && appointments.length < 1">
      <v-icon color="green" left>mdi-information</v-icon>No active appointments.
    </p>
    <div class="appointments-container ml-3 mt-1" v-if="!loading">
      <div
        class="appointment-container"
        v-for="(appointment, index) in appointments"
        :key="index"
      >
        <div
          class="left"
          :style="{
            backgroundImage: `${
              findPatientById(appointment.patientId).gender === 'Male'
                ? 'linear-gradient(to right, #E3F2FD, #64B5F6)'
                : 'linear-gradient(to right, #FFCDD2, #EF5350)'
            }`,
          }"
        >
          <v-icon class="icn">mdi-needle</v-icon>
          <img
            v-if="findPatientById(appointment.patientId).gender === 'Male'"
            src="../assets/man.png"
            alt="man"
            class="man-img"
          />
          <img
            v-if="findPatientById(appointment.patientId).gender === 'Female'"
            src="../assets/woman.png"
            alt="woman"
            class="woman-img"
          />
        </div>
        <div class="right">
          <v-icon class="delete-icon" @click="deleteAppointment(appointment)"
            >mdi-delete</v-icon
          >
          <p class="name">
            <v-icon left>mdi-account</v-icon>
            {{ findPatientById(appointment.patientId).firstname }}
            {{ findPatientById(appointment.patientId).lastname }}
          </p>
          <p class="location">
            <v-icon left>mdi-map-marker</v-icon>
            {{ findPatientById(appointment.patientId).city }},
            {{ findPatientById(appointment.patientId).county }}
          </p>
          <v-divider></v-divider>
          <div class="right-bottom">
            <div>
              <p class="date">
                <v-icon left>mdi-calendar-month</v-icon
                >{{ formattedDate(appointment.date) }}
              </p>
              <p class="time">
                <v-icon left>mdi-clock-outline</v-icon>{{ appointment.time }}
              </p>
            </div>
            <v-btn
              class="btn-confirm"
              small
              @click="confirmAppointment(appointment)"
              color="green"
              dark
              :disabled="checkDate(appointment.date, appointment.time)"
            >
              <v-icon left>mdi-check-bold</v-icon>
              <span>{{ btn.CONFIRM }}</span>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <v-divider v-if="!loading"></v-divider>
    <div v-if="!loading" class="confirmed-appointments-container">
      <v-chip
        class="mb-5 mt-10 d-flex gradient-chip"
        color="#5E35B1"
        label
        text-color="white"
      >
        <v-icon left>mdi-clock-check-outline</v-icon>
        Confirmed appointments
        <p class="bullet">
          {{ confirmedAppointments && confirmedAppointments.length }}
        </p>
      </v-chip>
      <p
        class="d-flex"
        v-if="confirmedAppointments && confirmedAppointments.length < 1"
      >
        <v-icon color="#43A047" left>mdi-information</v-icon>No confirmed
        appointments.
      </p>
      <div
        class="confirmed-appointment"
        v-for="(confirmedApp, index) in confirmedAppointments"
        :key="index"
      >
        <div class="confirmed-appointment-info">
          <p class="ma-0 d-flex name">
            <v-icon left>mdi-account-check</v-icon>
            <b
              >{{ findPatientById(confirmedApp.patientId).firstname }}
              {{ findPatientById(confirmedApp.patientId).lastname }}</b
            >
          </p>
          <p class="my-0 mx-10 location">
            <v-icon left>mdi-map-marker</v-icon>
            {{ findPatientById(confirmedApp.patientId).city }},
            {{ findPatientById(confirmedApp.patientId).county }}
          </p>
          <p class="my-0 mx-10 date">
            <v-icon left>mdi-calendar-clock</v-icon>
            {{ formattedDate(confirmedApp.date) }},
            {{ confirmedApp.time }}
          </p>
          <p class="dummy"></p>
        </div>
        <div class="confirmed-appointment-actions">
          <v-icon class="delete-icon" @click="deleteAppointment(confirmedApp)"
            >mdi-delete</v-icon
          >
        </div>
      </div>
    </div>
    <div class="text-center">
      <v-progress-circular
        :size="70"
        :width="5"
        color="#43A047"
        indeterminate
        v-if="loading"
        class="mt-10"
      ></v-progress-circular>
    </div>

    <notification
      v-if="showNotification && action !== ''"
      color="#43A047"
      :text="actionMsg"
    ></notification>

    <v-dialog v-model="dialogDelete" persistent max-width="600px">
      <v-card>
        <p class="text-center pt-3">
          <v-icon left class="mb-1 warning-color">mdi-alert-circle</v-icon>
          Are you sure you want to delete this appointment?
        </p>
        <v-card-actions class="mt-10">
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeDelete"
            ><v-icon left class="mb-1">mdi-cancel</v-icon
            >{{ btn.CANCEL }}</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteAppointmentConfirm"
            ><v-icon left class="mb-1">mdi-delete-forever</v-icon
            >{{ btn.DELETE }}</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  buttonLabel,
  counties,
  sortOptions,
  notificationMessages,
} from "../utils/constants";
import moment from "moment";

export default {
  data: () => ({
    action: "",
    appointment: null,
    btn: buttonLabel,
    dialogDelete: false,
    msg: notificationMessages,
    sortOptionList: sortOptions,
    sortOption: sortOptions[0],
    filterOptionByCounty: "",
    countyList: counties,
  }),
  computed: {
    appointments() {
      let data = this.$store.getters.appointments;

      data.forEach((app) => {
        let pat = this.patients.find((patient) => patient.id === app.patientId);
        app.first = pat.firstname;
        app.last = pat.lastname;
        app.county = pat.county;
        app.region = pat.region;
      });

      if (this.filterOptionByCounty !== "") {
        let filteredData = data.filter(
          (item) => item.county === this.filterOptionByCounty
        );
        data = filteredData;
      } else {
        data = this.$store.getters.appointments;
      }

      switch (this.sortOption) {
        case "Firstname A-Z":
          data.sort((a, b) =>
            a.first > b.first ? 1 : b.first > a.first ? -1 : 0
          );
          return data;
        case "Lastname A-Z":
          data.sort((a, b) => (a.last > b.last ? 1 : b.last > a.last ? -1 : 0));
          return data;
        case "Firstname Z-A":
          data.sort((a, b) =>
            a.first < b.first ? 1 : b.first < a.first ? -1 : 0
          );
          return data;
        case "Lastname Z-A":
          data.sort((a, b) => (a.last < b.last ? 1 : b.last < a.last ? -1 : 0));
          return data;
        case "Date Asc":
          data.sort((a, b) => moment(a.date) - moment(b.date));
          return data;
        case "Date Desc":
          data.sort((a, b) => moment(b.date) - moment(a.date));
          return data;
        default:
          return data;
      }
    },
    showCountyFilter() {
      return this.filterOptionByCounty !== "";
    },
    confirmedAppointments() {
      return this.$store.getters.confirmedAppointments;
    },
    patients() {
      return this.$store.getters.patients;
    },
    loading() {
      return this.$store.getters.loading;
    },
    showNotification() {
      return this.$store.getters.showNotification;
    },
    actionMsg() {
      switch (this.action) {
        case "confirmAppointment":
          return this.msg.APPOINTMENT_CONFIRMED;
        case "deleteAppointment":
          return this.msg.APPOINTMENT_DELETED;
        default:
          return "Action is complete";
      }
    },
  },
  methods: {
    findPatientById(id) {
      return this.patients.find((patient) => patient.id === id);
    },
    deleteAppointment(item) {
      this.appointment = item;
      this.dialogDelete = true;
      this.$store.dispatch("clearShowNotification");
      this.action = "";
    },
    deleteAppointmentConfirm() {
      this.action = "deleteAppointment";
      this.$store.dispatch("deleteAppointment", {
        id: this.appointment.id,
      });
      this.$store.dispatch("loadAppointments");
      this.dialogDelete = false;
    },
    confirmAppointment(item) {
      this.appointment = item;
      const appointmentData = {
        patientId: this.appointment.patientId,
        date: this.appointment.date,
        time: this.appointment.time,
        resolved: true,
      };
      const patient = this.patients.find(
        (item) => item.id === this.appointment.patientId
      );
      const patientData = {
        firstname: patient.firstname,
        lastname: patient.lastname,
        age: patient.age,
        region: patient.region,
        county: patient.county,
        city: patient.city,
        gender: patient.gender,
        bloodPressure: patient.bloodPressure,
        covidBefore: patient.covidBefore,
        covidNow: patient.covidNow,
        covidVaccine: true,
        diseases: patient.diseases,
      };
      this.action = "confirmAppointment";
      this.$store.dispatch("confirmAppointment", {
        id: this.appointment.id,
        ...appointmentData,
      });
      this.$store.dispatch("editPatient", {
        id: patient.id,
        ...patientData,
      });
      this.$store.dispatch("loadAppointments");
      this.$store.dispatch("loadPatients");
    },
    closeDelete() {
      this.appointment = null;
      this.dialogDelete = false;
    },
    formattedDate(dateToformat) {
      return moment(dateToformat).format("DD-MMM-yyyy");
    },
    removeCountyFilter() {
      this.filterOptionByCounty = "";
    },
    checkDate(dateToCheck, timeToCheck) {
      let currentDate = moment().format();
      let currentHour = Number(moment().format("hh"));
      let currentMinute = Number(moment().format("mm"));
      let hourToCompare = Number(timeToCheck.substr(0, 2));
      let minuteToCompare = Number(timeToCheck.substr(3, 4));

      return (
        (moment(dateToCheck).format() > currentDate &&
          currentHour < hourToCompare) ||
        (currentHour === hourToCompare && currentMinute < minuteToCompare)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-county-remove-icon {
  color: #e53935;
  margin-left: -20px;
  margin-top: -12px;
}
.gradient-chip {
  background-image: linear-gradient(to right, #4527a0, #7e57c2) !important;
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
.appointments-container {
  display: flex;
  flex-wrap: wrap;
  .appointment-container {
    margin: 0 70px 50px 0;
    min-width: 440px;
    height: 180px;
    display: flex;
    .left {
      flex: 2;
      transform: scale(1.2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 2px 2px 4px grey;
      position: relative;
      .icn {
        position: absolute;
        left: 4px;
        top: 4px;
      }
      img {
        height: 50px;
        width: 50px;
        margin-bottom: 10px;
      }
      .man-img {
        height: 54px;
        width: 50px;
      }
    }
    .right {
      background-image: linear-gradient(to right, #fff, #b39ddb);
      box-shadow: 3px 3px 4px grey;
      border-radius: 10px;
      flex: 5;
      padding: 10px 20px;
      position: relative;
      margin-left: -10px;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 20px;
        font-weight: 900;
        margin: 0;
        display: flex;
        align-items: center;
      }
      .location {
        margin: 0;
        display: flex;
        align-items: center;
        font-size: 14px;
      }
      .date,
      .time {
        margin: 0;
        font-size: 14px;
        font-weight: 900;
        display: flex;
        align-items: center;
      }
      .delete-icon {
        position: absolute;
        right: -10px;
        top: -10px;
        color: #e53935;
        background-color: white;
        border-radius: 50%;
        padding: 5px;
        border: 1px solid;
        box-shadow: 2px 2px 3px black;
        &:hover {
          transform: scale(1.3);
          box-shadow: 4px 4px 6px grey;
        }
      }
      &-bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex: 1;
        margin-bottom: 10px;
        .btn-confirm {
          align-self: flex-end;
          &:disabled {
            box-shadow: 1px 1px 2px grey;
            color: #fff !important;
          }
        }
      }
    }
  }
}
.warning-color {
  color: #e53935;
}
.confirmed-appointments-container {
  .confirmed-appointment {
    padding: 10px 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-image: linear-gradient(to right, #a5d6a7, #fff);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 3px 3px 4px grey;
    &:hover {
      background-image: linear-gradient(to right, #98c99a, rgb(242, 239, 239));
      cursor: pointer;
    }
    &-info {
      display: flex;
      flex: 1;
      .name {
        flex: 1.5;
      }
      .location {
        flex: 1;
      }
      .date {
        flex: 1;
      }
      .dummy {
        flex: 2;
      }
    }
    &-actions {
      .delete-icon {
        color: #e53935;
        &:hover {
          transform: scale(1.5);
          color: #c62828;
        }
      }
    }
  }
}
</style>
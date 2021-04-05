<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="1000" persistent>
        <v-card>
          <v-card-title class="headline"
            ><v-icon left>mdi-face</v-icon> {{ formTitle }}</v-card-title
          >
          <form @submit.prevent="onSave" class="pa-5">
            <v-row>
              <v-col cols="4">
                <v-text-field
                  name="firstname"
                  label="Firstname*"
                  id="firstname"
                  v-model="patient.firstname"
                  type="text"
                  required
                  outlined
                  append-icon="mdi-account-details"
                  autocomplete="off"
                  maxlength="20"
                  dense
                  class="input-field"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  name="lastname"
                  label="Lastname*"
                  id="lastname"
                  v-model="patient.lastname"
                  type="text"
                  required
                  outlined
                  append-icon="mdi-account-details"
                  autocomplete="off"
                  maxlength="20"
                  dense
                  class="input-field"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  name="age"
                  label="Age*"
                  id="age"
                  v-model="patient.age"
                  type="number"
                  required
                  outlined
                  min="0"
                  max="150"
                  append-icon="mdi-human-cane"
                  autocomplete="off"
                  dense
                  class="input-field"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row class="mb-1">
              <v-col cols="4">
                <v-select
                  name="region"
                  label="Region*"
                  id="region"
                  v-model="patient.region"
                  required
                  outlined
                  :items="regionList"
                  dense
                  class="input-field"
                >
                </v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  name="county"
                  label="County*"
                  id="county"
                  v-model="patient.county"
                  required
                  outlined
                  :items="countyList"
                  dense
                  class="input-field"
                >
                </v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  name="city"
                  label="City*"
                  id="city"
                  v-model="patient.city"
                  required
                  outlined
                  append-icon="mdi-city-variant"
                  autocomplete="off"
                  dense
                  class="input-field"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-1">
              <v-col cols="4">
                <v-chip color="#5E35B1" class="d-flex" label text-color="white">
                  <v-icon left>mdi-gender-male-female</v-icon>
                  Gender*
                </v-chip>
                <v-checkbox
                  id="male"
                  v-model="patient.gender"
                  label="Male"
                  color="#7E57C2"
                  value="Male"
                  hide-details
                  prepend-icon="mdi-human-male"
                ></v-checkbox>
                <v-checkbox
                  id="female"
                  v-model="patient.gender"
                  label="Female"
                  color="#7E57C2"
                  value="Female"
                  hide-details
                  prepend-icon="mdi-human-female"
                ></v-checkbox>
              </v-col>
              <v-col cols="8">
                <v-chip color="#5E35B1" label class="d-flex" text-color="white">
                  <v-icon left>mdi-heart-pulse</v-icon>
                  Blood pressure*
                </v-chip>
                <div class="d-flex justify-space-between">
                  <div class="pressure-card bg-low">
                    <v-switch
                      id="low"
                      v-model="patient.bloodPressure"
                      label="Low"
                      value="Low"
                      color="#42A5F5"
                      hide-details
                    ></v-switch>
                    <p class="pressure-info mt-6">{{ info.LOW_SYSTOLIC }}</p>
                    <p class="pressure-info">{{ info.LOW_DIASTOLIC }}</p>
                  </div>
                  <div class="pressure-card bg-normal">
                    <v-switch
                      id="normal"
                      v-model="patient.bloodPressure"
                      label="Normal"
                      value="Normal"
                      color="#66BB6A"
                      hide-details
                    ></v-switch>
                    <p class="pressure-info mt-6">{{ info.NORMAL_SYSTOLIC }}</p>
                    <p class="pressure-info">{{ info.NORMAL_DIASTOLIC }}</p>
                  </div>
                  <div class="pressure-card bg-elevated">
                    <v-switch
                      id="elevated"
                      v-model="patient.bloodPressure"
                      label="Elevated"
                      value="Elevated"
                      color="#FFEE58"
                      hide-details
                    ></v-switch>
                    <p class="pressure-info mt-6">
                      {{ info.ELEVATED_SYSTOLIC }}
                    </p>
                    <p class="pressure-info">{{ info.ELEVATED_DIASTOLIC }}</p>
                  </div>
                  <div class="pressure-card bg-high">
                    <v-switch
                      id="high"
                      v-model="patient.bloodPressure"
                      label="High"
                      value="High"
                      color="#F57C00"
                      hide-details
                    ></v-switch>
                    <p class="pressure-info mt-6">{{ info.HIGH_SYSTOLIC }}</p>
                    <p class="pressure-info">{{ info.HIGH_DIASTOLIC }}</p>
                  </div>
                  <div class="pressure-card bg-hyper">
                    <v-switch
                      id="hyper"
                      v-model="patient.bloodPressure"
                      label="Hypertensive"
                      value="Hypertensive"
                      color="#E53935"
                      hide-details
                    ></v-switch>
                    <p class="pressure-info mt-6">
                      {{ info.HYPERTENSIVE_SYSTOLIC }}
                    </p>
                    <p class="pressure-info">
                      {{ info.HYPERTENSIVE_DIASTOLIC }}
                    </p>
                  </div>
                </div>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-1">
              <v-col cols="12">
                <v-chip color="#5E35B1" class="d-flex" label text-color="white">
                  <v-icon left>mdi-shield-alert-outline</v-icon>
                  COVID
                </v-chip>
                <v-checkbox
                  id="covidBefore"
                  v-model="patient.covidBefore"
                  :label="covid19.BEFORE"
                  color="#7E57C2"
                  hide-details
                  prepend-icon="mdi-emoticon-sick-outline"
                  :disabled="patient.covidNow"
                ></v-checkbox>
                <v-checkbox
                  id="covidNow"
                  v-model="patient.covidNow"
                  :label="covid19.NOW"
                  color="#7E57C2"
                  hide-details
                  prepend-icon="mdi-ambulance"
                  :disabled="patient.covidBefore"
                ></v-checkbox>
                <v-checkbox
                  id="covidVaccine"
                  v-model="patient.covidVaccine"
                  :label="covid19.VACCINE"
                  color="#7E57C2"
                  hide-details
                  prepend-icon="mdi-needle"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="mt-1">
              <v-col cols="12">
                <v-chip
                  class="mb-3 d-flex"
                  color="#5E35B1"
                  label
                  text-color="white"
                >
                  <v-icon left>mdi-human-wheelchair</v-icon>
                  Associated diseases*
                </v-chip>
                <div class="d-flex diseases-container">
                  <v-checkbox
                    v-for="disease in diseaseList"
                    :key="disease"
                    :id="disease"
                    v-model="patient.diseases"
                    :label="disease"
                    :value="disease"
                    color="#7E57C2"
                    hide-details
                  ></v-checkbox>
                </div>
              </v-col>
            </v-row>

            <v-card-actions class="mt-10 center">
              <v-btn color="red darken-1" text @click="close">
                <v-icon left class="mb-1">mdi-cancel</v-icon>{{ btn.CANCEL }}
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                type="submit"
                :disabled="!formIsValid"
              >
                <v-icon left class="mb-1">mdi-check-circle</v-icon
                >{{ btn.SAVE }}
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
    </v-row>

    <v-btn @click="initPatient" class="mt-6" color="#43A047" dark>
      <v-icon left>mdi-account-plus</v-icon>
      <span>{{ btn.ADD_PATIENT }}</span>
    </v-btn>

    <!-- <v-btn @click="initPatientVaccineAppointment" class="mt-6 ml-10" color="#42A5F5" dark>
      <v-icon left>mdi-calendar-multiple-check</v-icon>
      <span>{{ btn.SCHEDULE_VACCINE }} (WIP)</span>
    </v-btn> -->

    <v-dialog v-model="dialogVaccineAppointment" persistent max-width="600">
      <v-card>
        <v-card-title class="headline"
          ><v-icon left>mdi-calendar-clock</v-icon
          >{{ txt.SCHEDULE_VACCINE }} for {{ patient.firstname }} {{ patient.lastname }}</v-card-title
        >
        <v-form @submit.prevent="onSavePatientVaccineAppointment" class="pa-5">
          <v-row class="mt-1">
            <v-col cols="6">
              <v-chip
                class="mb-3 d-flex"
                color="#5E35B1"
                label
                text-color="white"
              >
                <v-icon left>mdi-calendar</v-icon>
                Date*
              </v-chip>
              <!-- <v-date-picker day-format="dd-mm-yyyy" month-format="dd-mm-yyyy" v-model="dateForVaccine" first-day-of-week="1" header-color="#42a5f5"></v-date-picker> -->
              <v-date-picker
                v-model="dateForVaccine"
                first-day-of-week="1"
                header-color="#42a5f5"
                :min="today"
              ></v-date-picker>
            </v-col>
            <v-col cols="6">
              <v-chip
                class="mb-3 d-flex"
                color="#5E35B1"
                label
                text-color="white"
              >
                <v-icon left>mdi-alarm</v-icon>
                Time*
              </v-chip>
              <v-time-picker
                v-model="timeForVaccine"
                header-color="#42a5f5"
                format="24hr"
              ></v-time-picker>
            </v-col>
          </v-row>

          <v-card-actions class="mt-10 center">
            <v-btn color="red darken-1" text @click="closeSchedule">
              <v-icon left class="mb-1">mdi-cancel</v-icon>{{ btn.CANCEL }}
            </v-btn>
            <v-btn
              color="green darken-1"
              :disabled="!formScheduleIsValid"
              text
              type="submit"
            >
              <v-icon left class="mb-1">mdi-check-circle</v-icon
              >{{ btn.CREATE_VACCINE_APPOINTMENT }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-data-table
      v-if="patients && patients.length > 0"
      :headers="headers"
      :items="patients"
      class="elevation-2 mt-5 patients-table-container"
      :search="search"
      no-results-text="No patient found"
      autocomplete="off"
      sort-by="firstname"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="mr-7">
            <v-icon left>mdi-account-box-multiple</v-icon>
            Patients list ({{ patients.length }})
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          ></v-text-field>

          <v-dialog v-model="dialogDelete" persistent max-width="600px">
            <v-card>
              <p class="text-center pt-3">
                <v-icon left class="mb-1 warning-color"
                  >mdi-alert-circle</v-icon
                >
                Are you sure you want to delete patient
                <strong>{{ patient.firstname }} {{ patient.lastname }}</strong
                >?
              </p>
              <v-card-actions class="mt-10">
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="closeDelete"
                  ><v-icon left class="mb-1">mdi-cancel</v-icon
                  >{{ btn.CANCEL }}</v-btn
                >
                <v-btn color="green darken-1" text @click="deleteItemConfirm"
                  ><v-icon left class="mb-1">mdi-delete-forever</v-icon
                  >{{ btn.DELETE }}</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.age`]="{ item }">
        <span class="age">{{ item.age }}</span>
      </template>
      <template v-slot:[`item.before`]="{ item }">
        <v-icon v-if="item.covidBefore" color="#43A047">mdi-check</v-icon>
        <v-icon v-else color="#e53935">mdi-close</v-icon>
      </template>
      <template v-slot:[`item.now`]="{ item }">
        <v-icon v-if="item.covidNow" color="#43A047">mdi-check</v-icon>
        <v-icon v-else color="#e53935">mdi-close</v-icon>
      </template>
      <template v-slot:[`item.vaccine`]="{ item }">
        <v-icon v-if="item.covidVaccine" color="#43A047">mdi-check</v-icon>
        <v-icon v-else color="#e53935">mdi-close</v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-3 edit-icon" @click="editItem(item)">
          mdi-account-edit
        </v-icon>
        <v-icon small class="mr-3 delete-icon" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-icon
          v-if="checkForVaccine(item)"
          small
          class="mr-3 calendar-icon"
          @click="initPatientVaccineAppointment(item)"
        >
          mdi-calendar
        </v-icon>
        <v-icon
          v-if="checkForAppointment(item)"
          small
          disabled
          class="mr-3 calendar-icon"
        >
          mdi-calendar-clock
        </v-icon>
        <span class="appointment-info" v-if="checkForAppointment(item)">{{ appointmentDate(item) }}<v-icon small right>mdi-needle</v-icon></span>
      </template>
    </v-data-table>

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

    <!-- sa gasesc un logo bun pentru aplicatie -->
    <!-- sa creez niste useri si sa pun rol pe ei - unul de admin cu care sa fac ceva settup pentru aplicatie ori ceva extra -->
    <!-- sa pun data nasterii in loc de AGE  -->
    <!-- internationalizare -->

  </div>
</template>

<script>
import {
  bloodPressure,
  buttonLabel,
  counties,
  covid,
  defaultPatientObject,
  diseases,
  headersPatientsTable,
  notificationMessages,
  regions,
  text,
} from "../utils/constants";
import moment from 'moment';

export default {
  data: () => ({
    action: "",
    btn: buttonLabel,
    countyList: counties,
    covid19: covid,
    dateForVaccine: "",
    timeForVaccine: "",
    defaultPatient: defaultPatientObject,
    dialog: false,
    dialogDelete: false,
    dialogVaccineAppointment: false,
    diseaseList: diseases,
    editedIndex: -1,
    headers: headersPatientsTable,
    info: bloodPressure,
    msg: notificationMessages,
    patient: defaultPatientObject,
    regionList: regions,
    search: "",
    txt: text,
  }),
  computed: {
    formIsValid() {
      return (
        this.patient.firstname !== "" &&
        this.patient.lastname !== "" &&
        this.patient.age !== "" &&
        this.patient.region &&
        this.patient.county &&
        this.patient.city !== "" &&
        this.patient.gender &&
        this.patient.bloodPressure &&
        this.patient.diseases &&
        this.patient.diseases.length > 0
      );
    },
    formScheduleIsValid() {
      return this.dateForVaccine !== "" && this.timeForVaccine !== "";
    },
    loading() {
      return this.$store.getters.loading;
    },
    patients() {
      return this.$store.getters.patients;
    },
    appointments() {
      return this.$store.getters.appointments;
    },
    formTitle() {
      return this.editedIndex === -1
        ? this.txt.ADD_NEW_PATIENT
        : this.txt.EDIT_PATIENT;
    },
    showNotification() {
      return this.$store.getters.showNotification;
    },
    actionMsg() {
      switch (this.action) {
        case "createPatient":
          return this.msg.PATIENT_CREATE_SUCCESS;
        case "editPatient":
          return this.msg.PATIENT_EDIT_SUCCESS;
        case "deletePatient":
          return this.msg.PATIENT_DELETE_SUCCESS;
        case "schedulePatient":
          return this.msg.PATIENT_VACCINE_APPOINTMENT_SUCCESS;
        default:
          return "Action is complete";
      }
    },
    today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();
      today = `${yyyy}-${mm}-${dd < 10 ? '0' : ''}${Number(dd)+1}`;

      return today;
    },
  },
  methods: {
    initPatient() {
      this.patient = Object.assign({}, this.defaultPatient);
      this.editedIndex = -1;
      this.dialog = true;
      this.$store.dispatch("clearShowNotification");
      this.action = "";
    },
    initPatientVaccineAppointment(item) {
      this.patient = Object.assign({}, item);
      this.editedIndex = this.patients.indexOf(item);
      this.dialogVaccineAppointment = true;
      this.$store.dispatch("clearShowNotification");
      this.action = "";
      this.dateForVaccine = "";
      this.timeForVaccine = "";
    },
    checkForVaccine(item) {
      let valid = true;

      if (this.appointments && this.appointments.length) {
        this.appointments.forEach((app) => {
          if (app.patientId === item.id || item.covidVaccine) {
            valid = false;
          }
        });
      } else if (item.covidVaccine) {
        valid = false;
      }

      return valid;
    },
    checkForAppointment(item) {
      let valid = false;

      if (this.appointments && this.appointments.length) {
        this.appointments.forEach((app) => {
          if (app.patientId === item.id) {
            valid = true;
          }
        });
      }

      return valid;
    },
    appointmentDate(item) {
      let appointment = this.appointments.find(app => app.patientId === item.id);

      return moment(appointment.date).format('DD MMM YYYY');
    },
    onSave() {
      const patientData = {
        firstname: this.patient.firstname,
        lastname: this.patient.lastname,
        age: this.patient.age,
        region: this.patient.region,
        county: this.patient.county,
        city: this.patient.city,
        gender: this.patient.gender,
        bloodPressure: this.patient.bloodPressure,
        covidBefore: this.patient.covidBefore,
        covidNow: this.patient.covidNow,
        covidVaccine: this.patient.covidVaccine,
        diseases: this.patient.diseases,
      };
      if (this.editedIndex > -1) {
        this.action = "editPatient";
        this.$store.dispatch("editPatient", {
          id: this.patient.id,
          ...patientData,
        });
        this.$store.dispatch("loadPatients");
        this.dialog = false;
      } else {
        this.action = "createPatient";
        this.$store.dispatch("createPatient", patientData);
        this.$store.dispatch("loadPatients");
        this.dialog = false;
      }
    },
    onSavePatientVaccineAppointment() {
      const appointmentData = {
        patientId: this.patient.id,
        date: this.dateForVaccine,
        time: this.timeForVaccine,
        resolved: false,
      };
      this.action = "schedulePatient";
      this.$store.dispatch("createPatientVaccineAppointment", appointmentData);
      this.$store.dispatch("loadAppointments");
      this.dialogVaccineAppointment = false;
    },
    editItem(item) {
      this.editedIndex = this.patients.indexOf(item);
      this.patient = Object.assign({}, item);
      this.dialog = true;
      this.$store.dispatch("clearShowNotification");
      this.action = "";
    },
    deleteItem(item) {
      this.editedIndex = this.patients.indexOf(item);
      this.patient = Object.assign({}, item);
      this.dialogDelete = true;
      this.$store.dispatch("clearShowNotification");
      this.action = "";
    },
    deleteItemConfirm() {
      this.action = "deletePatient";
      this.$store.dispatch("deletePatient", {
        id: this.patient.id,
      });
      this.$store.dispatch("loadPatients");
      this.dialogDelete = false;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.patient = Object.assign({}, this.defaultPatient);
        this.editedIndex = -1;
      });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.patient = Object.assign({}, this.defaultPatient);
        this.editedIndex = -1;
      });
    },
    closeSchedule() {
      this.dialogVaccineAppointment = false;
      this.$nextTick(() => {
        this.patient = Object.assign({}, this.defaultPatient);
        this.editedIndex = -1;
      });
      this.dateForVaccine = "";
      this.timeForVaccine = "";
    },
  },
};
</script>

<style scoped>
.patients-table-container {
  background-color: #E8F5E9 !important;
}
.appointment-info {
  font-size: 12px;
  background-color: #C8E6C9;
  border-radius: 5px;
  padding: 0 6px;
}
.edit-icon {
  color: #4527a0;
  transform: scale(1.2);
}
.calendar-icon {
  color: #42a5f5;
  transform: scale(1.2);
}
.delete-icon {
  color: #e65100;
  transform: scale(1.2);
}
.edit-icon:hover {
  transform: scale(1.5);
}
.calendar-icon:hover {
  transform: scale(1.5);
}
.delete-icon:hover {
  transform: scale(1.5);
}
.center {
  display: flex;
  justify-content: center;
}
.warning-color {
  color: #e53935;
}
.pressure-card {
  display: flex;
  flex-direction: column;
  padding: 0 5px;
}
.bg-low {
  background-image: linear-gradient(#fff, #fff, #42a5f5);
}
.bg-normal {
  background-image: linear-gradient(#fff, #fff, #66bb6a);
}
.bg-elevated {
  background-image: linear-gradient(#fff, #fff, #ffee58);
}
.bg-high {
  background-image: linear-gradient(#fff, #fff, #f57c00);
}
.bg-hyper {
  background-image: linear-gradient(#fff, #fff, #e53935);
}
.pressure-info {
  font-size: 11px;
  color: #000;
  margin: 0;
}
.input-field {
  margin-bottom: -20px;
}
.diseases-container {
  flex-wrap: wrap;
  flex-direction: column;
  height: 90px;
}
.diseases-container .v-input--checkbox {
  margin: 0;
}
.age {
  display: inline-block;
  color: #fff;
  background-color: grey;
  padding: 3px 8px;
  border-radius: 6px;
  min-width: 32px;
  text-align: center;
}
</style>

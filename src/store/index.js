import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appointment: null,
    error: null,
    loadedAppointments: [],
    loadedPatients: [],
    loading: false,
    patient: null,
    showNotification: false,
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    createPatient(state, payload) {
      state.patient = payload;
    },
    createPatientVaccineAppointment(state, payload) {
      state.appointment = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoadedPatients(state, payload) {
      state.loadedPatients = payload;
    },
    setLoadedAppointments(state, payload) {
      state.loadedAppointments = payload;
    },
    showNotification(state, payload) {
      state.showNotification = payload;
    }
  },
  actions: {
    loadPatients({ commit }) {
      commit('setLoading', true);
      firebase.database().ref('patients').once('value')
        .then(data => {
          const patients = [];
          const obj = data.val();
          for (let key in obj) {
            patients.push({
              id: key,
              firstname: obj[key].firstname,
              lastname: obj[key].lastname,
              age: obj[key].age,
              region: obj[key].region,
              county: obj[key].county,
              city: obj[key].city,
              gender: obj[key].gender,
              bloodPressure: obj[key].bloodPressure,
              covidBefore: obj[key].covidBefore,
              covidNow: obj[key].covidNow,
              covidVaccine: obj[key].covidVaccine,
              diseases: obj[key].diseases,
            });
          }
          commit('setLoadedPatients', patients);
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    loadAppointments({ commit }) {
      commit('setLoading', true);
      firebase.database().ref('appointments').once('value')
        .then(data => {
          const appointments = [];
          const obj = data.val();
          for (let key in obj) {
            appointments.push({
              id: key,
              patientId: obj[key].patientId,
              date: obj[key].date,
              time: obj[key].time,
              resolved: obj[key].resolved,
            });
          }
          commit('setLoadedAppointments', appointments);
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    registerUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              email: payload.email,
              password: payload.password,
            };
            commit('setUser', newUser);
            commit('setLoading', false);
          }
        )
        .catch(error => {
          commit('setError', error);
          commit('setLoading', false);
          console.error(error);
        });
    },
    loginUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setUser', payload);
            commit('setLoading', false);
          }
        )
        .catch(error => {
          commit('setError', error);
          commit('setLoading', false);
          console.error(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email,
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
      router.push('/login');
    },
    createPatient({ commit }, payload) {
      commit('setLoading', true);
      commit('showNotification', true);
      const patient = {
        firstname: payload.firstname,
        lastname: payload.lastname,
        age: payload.age,
        region: payload.region,
        county: payload.county,
        city: payload.city,
        gender: payload.gender,
        bloodPressure: payload.bloodPressure,
        covidBefore: payload.covidBefore,
        covidNow: payload.covidNow,
        covidVaccine: payload.covidVaccine,
        diseases: payload.diseases,
      };
      firebase.database().ref('patients').push(patient)
        .then(data => {
          const key = data.key;
          commit('createPatient', {
            ...patient,
            id: key
          });
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    createPatientVaccineAppointment({ commit }, payload) {
      commit('setLoading', true);
      commit('showNotification', true);
      const appointment = {
        patientId: payload.patientId,
        date: payload.date,
        time: payload.time,
        resolved: payload.resolved,
      };
      firebase.database().ref('appointments').push(appointment)
        .then(data => {
          const key = data.key;
          commit('createPatientVaccineAppointment', {
            ...appointment,
            id: key
          });
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    updatePatientVaccineAppointment({ commit }, payload) {
      commit('setLoading', true);
      commit('showNotification', true);
      const appointment = {
        patientId: payload.patientId,
        date: payload.date,
        time: payload.time,
        resolved: payload.resolved,
      };
      firebase.database().ref(`appointments/${payload.id}`).set(appointment)
        .then(result => {
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    editPatient({ commit }, payload) {
      commit('setLoading', true);
      commit('showNotification', true);
      const patient = {
        firstname: payload.firstname,
        lastname: payload.lastname,
        age: payload.age,
        region: payload.region,
        county: payload.county,
        city: payload.city,
        gender: payload.gender,
        bloodPressure: payload.bloodPressure,
        covidBefore: payload.covidBefore,
        covidNow: payload.covidNow,
        covidVaccine: payload.covidVaccine,
        diseases: payload.diseases,
      };
      firebase.database().ref(`patients/${payload.id}`).set(patient)
        .then(result => {
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    confirmAppointment({ commit }, payload) {
      commit('setLoading', true);
      commit('showNotification', true);
      const appointment = {
        patientId: payload.patientId,
        date: payload.date,
        time: payload.time,
        resolved: payload.resolved,
      };
      firebase.database().ref(`appointments/${payload.id}`).set(appointment)
        .then(result => {
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    deletePatient({ commit }, payload) {
      commit('setLoading', true);
      commit('showNotification', true);
      firebase.database().ref(`patients/${payload.id}`).remove()
        .then(result => {
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    deleteAppointment({ commit }, payload) {
      commit('setLoading', true);
      commit('showNotification', true);
      firebase.database().ref(`appointments/${payload.id}`).remove()
        .then(result => {
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    clearError({ commit }) {
      commit('clearError');
    },
    clearShowNotification({ commit }) {
      commit('showNotification', false);
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    patients(state) {
      return state.loadedPatients;
    },
    appointments(state) {
      return state.loadedAppointments.filter(app => app.resolved === false);
    },
    confirmedAppointments(state) {
      return state.loadedAppointments.filter(app => app.resolved === true);
    },
    showNotification(state) {
      return state.showNotification;
    }
  },
  modules: {
  }
})

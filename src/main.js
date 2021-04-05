import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import Alert from './components/Alert.vue'
import Notification from './components/Notification.vue'
import SimpleCard from './components/cards/SimpleCard.vue'
import GeneralCard from './components/cards/GeneralCard.vue'
import DiseaseCard from './components/cards/DiseaseCard.vue'
import PressureCard from './components/cards/PressureCard.vue'
import AppointmentCard from './components/cards/AppointmentCard.vue'
import DoughnutChart from './components/DoughnutChart.vue'

Vue.config.productionTip = false

Vue.component('app-alert', Alert)
Vue.component('notification', Notification)
Vue.component('simpleCard', SimpleCard)
Vue.component('generalCard', GeneralCard)
Vue.component('diseaseCard', DiseaseCard)
Vue.component('pressureCard', PressureCard)
Vue.component('appointmentCard', AppointmentCard)
Vue.component('doughnutChart', DoughnutChart)

const firebaseConfig = {
  apiKey: "AIzaSyCa8kHgoahdbn0GELXHc-XTFzv0cUHVGOU",
  authDomain: "medapp1-df616.firebaseapp.com",
  projectId: "medapp1-df616",
  storageBucket: "medapp1-df616.appspot.com",
  messagingSenderId: "855743993903",
  appId: "1:855743993903:web:cc20391436544f10db8eda"
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch("loadPatients");
    this.$store.dispatch("loadAppointments");
  }
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Patients from '../views/Patients.vue'
import Statistics from '../views/Statistics.vue'
import Appointments from '../views/Appointments.vue'
import Profile from '../views/Profile.vue'
import ApplicationInfo from '../views/ApplicationInfo.vue'
// import ConnectionOffline from '../views/ConnectionOffline.vue'
import AuthGuard from './authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: AuthGuard
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients,
    beforeEnter: AuthGuard
  },
  // {
  //   path: '/patients/:id',
  //   name: 'Patient',
  //   props: true,
  //   component: Patient
  // },
  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments,
    beforeEnter: AuthGuard
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    beforeEnter: AuthGuard
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/application-info',
    name: 'ApplicationInfo',
    component: ApplicationInfo,
    beforeEnter: AuthGuard
  },
  // {
  //   path: '/offline',
  //   name: 'ConnectionOffline',
  //   component: ConnectionOffline,
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

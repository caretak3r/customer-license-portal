import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './views/HomePage.vue'

const LicenseDashboard = () => import('./views/LicenseDashboard.vue')
const InstallerPage = () => import('./views/InstallerPage.vue')

const routes = [
  { path: '/', component: HomePage },
  { path: '/license-dashboard', component: LicenseDashboard },
  { path: '/installer', component: InstallerPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
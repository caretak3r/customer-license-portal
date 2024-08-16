<template>
  <div id="app">
    <header>
      <h1>Customer License Portal</h1>
    </header>
    <main>
      <LoginPage v-if="!isLoggedIn" @login-success="handleLogin" />
      <LicenseList v-else></LicenseList>
    </main>
    <footer>
      <p>&copy; 2023 Your Company Name. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import LicenseList from './components/LicenseList.vue'

export default {
  name: 'App',
  components: {
    LoginPage,
    LicenseList
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
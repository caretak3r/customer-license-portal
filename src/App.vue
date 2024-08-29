<template>
  <div id="app">
    <header>
      <h1>Customer License Portal</h1>
      <button v-if="isLoggedIn" @click="handleLogout" class="logout-button" title="Log out of your account">Logout</button>
    </header>
    <div class="content-wrapper" v-if="isLoggedIn">
      <SideNavigation />
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
    <LoginPage v-else @login-success="handleLogin" />
    <footer>
      <p>&copy; 2024 CloudRippers. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import SideNavigation from './components/SideNavigation.vue'

export default {
  name: 'App',
  components: {
    LoginPage,
    SideNavigation
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true
    },
    handleLogout() {
      this.isLoggedIn = false
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content-wrapper {
  display: flex;
  min-height: calc(100vh - 60px); /* Adjust based on your header and footer height */
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

header, footer {
  padding: 10px;
  background-color: #f8f8f8;
}

header h1 {
  margin: 0;
}

footer {
  text-align: center;
}
</style>
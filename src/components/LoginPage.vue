<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'admin') {
        this.$emit('login-success');
      } else {
        this.error = 'Invalid credentials';
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.login-page input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
.login-page button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
<template>
  <nav class="side-navigation">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/license-dashboard">License Dashboard</router-link></li>
      <li><router-link to="/installer">Installer</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'SideNavigation'
}
</script>

<style scoped>
.side-navigation {
  width: 200px;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #333;
}
</style>
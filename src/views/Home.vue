<template>
  <div class="home">
    <h1>Welcome to Your License Dashboard</h1>
    <LicenseList />
  </div>
</template>

<script>
import LicenseList from '@/components/LicenseList.vue'

export default {
  name: 'Home',
  components: {
    LicenseList
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
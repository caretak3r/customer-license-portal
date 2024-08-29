<template>
  <div class="license-dashboard">
    <LicenseList />
    <p>Welcome to your license dashboard. Here you can view and manage your licenses.</p>
  </div>
</template>

<script>
import LicenseList from '@/components/LicenseList.vue'

export default {
  name: 'LicenseDashboard',
  components: {
    LicenseList
  }
}
</script>

<style scoped>
.license-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
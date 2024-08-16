<template>
  <div class="license-dashboard">
    <h2>License Dashboard</h2>
    <div v-if="licenses.length > 0">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" @change="toggleSelectAll" :checked="allLicensesSelected">
            </th>
            <th>License Key</th>
            <th>Nickname</th>
            <th>Description</th>
            <th>Entitlements</th>
            <th>Created At</th>
            <th>Customer Name</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="license in licenses" 
              :key="license.id" 
              @click="toggleLicenseSelection(license)"
              :class="{ 'selected': isLicenseSelected(license) }">
            <td>
              <input type="checkbox" :checked="isLicenseSelected(license)">
            </td>
            <td>{{ license.key }}</td>
            <td>{{ license.nickname }}</td>
            <td>{{ license.description }}</td>
            <td>{{ license.entitlements.join(', ') }}</td>
            <td>{{ formatDate(license.createdAt) }}</td>
            <td>{{ license.customerName }}</td>
            <td>{{ formatDate(license.expirationDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-licenses">
      <p>No licenses have been created for this account.</p>
    </div>
    <div class="actions">
      <button @click="openNewLicenseModal" class="btn btn-primary">Generate New License</button>
      <button @click="deleteLicenses" class="btn btn-danger" :disabled="selectedLicenses.length === 0">Delete Selected Licenses</button>
      <button @click="viewSelectedLicensesAsJson" class="btn btn-info" :disabled="selectedLicenses.length === 0">View Selected License(s) as JSON</button>
      <button @click="fetchLicenses" class="btn btn-secondary">Refresh Licenses</button>
    </div>

    <!-- New License Modal -->
    <div v-if="showNewLicenseModal" class="modal">
      <div class="modal-content">
        <h3>Generate New License</h3>
        <form @submit.prevent="generateLicense">
          <div class="form-group">
            <label for="nickname">License Nickname:</label>
            <input type="text" id="nickname" v-model="newLicense.nickname" required>
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="newLicense.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="customerName">Customer Name:</label>
            <input type="text" id="customerName" v-model="newLicense.customerName" required>
          </div>
          <div class="form-group">
            <label for="entitlements">Entitlements (comma-separated):</label>
            <input type="text" id="entitlements" v-model="newLicense.entitlements" required>
          </div>
          <div class="form-group">
            <label for="expirationDate">Expiration Date:</label>
            <input type="date" id="expirationDate" v-model="newLicense.expirationDate" required>
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn btn-primary">Generate</button>
            <button type="button" @click="closeNewLicenseModal" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- JSON Modal -->
  <div v-if="showJsonModal" class="modal">
    <div class="modal-content">
      <h3>Selected License(s) JSON</h3>
      <pre>{{ selectedLicensesJson }}</pre>
      <button @click="closeJsonModal" class="btn btn-secondary">Close</button>
    </div>
  </div>
</template>

<script>

// import axios from 'axios'

export default {
  name: 'LicenseList',
  data() {
    return {
      licenses: [],
      selectedLicenses: [],
      showNewLicenseModal: false,
      showJsonModal: false,
      selectedLicensesJson: '',
      newLicense: {
        nickname: '',
        description: '',
        customerName: '',
        entitlements: '',
        expirationDate: ''
      }
    };
  },
  computed: {
    allLicensesSelected() {
      return this.selectedLicenses.length === this.licenses.length;
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
    viewSelectedLicensesAsJson() {
      this.selectedLicensesJson = JSON.stringify(this.selectedLicenses, null, 2);
      this.showJsonModal = true;
    },
    closeJsonModal() {
      this.showJsonModal = false;
    },

    async getAWSAuth() {
      // TODO: implement AWS authentication logic
      // This is a placeholder for demonstration
      // might need CORS for this? no idea 
      // await
    },

    async fetchLicenses() {
      // TODO: Implement API call to fetch licenses
      // This is a placeholder for demonstration
      // get auth and then make the request
      
      // await this.getAWSAuth()

      // if getAWSAuth() is successful, then make the request
      // if not, then show an error message
      // if (this.getAWSAuth()) {
        // const response = await axios.get('https://api-123.amazonaws.com/licenses')
        // if (response.status === 200) {
        //   this.licenses = response.data.map(license => ({
        //     id: license.id,
        //     key: license.key,
        //     nickname: license.nickname,
        //     description: license.description,
        //     entitlements: license.entitlements,
        //     createdAt: license.createdAt,
        //     customerName: license.customerName,
        //     expirationDate: license.expirationDate
        //   }))
        // } else {
        //   console.error('Failed to fetch licenses:', response.status, response.statusText)
        // }
      // } else {
      //   console.error('Failed to authenticate with AWS')
      // }
    // },

      this.licenses = [
        { 
          id: 1, 
          key: 'ABC-123-XYZ',
          nickname: 'Standard License 1',
          description: 'Standard License',
          entitlements: ['Feature A', 'Feature B'],
          createdAt: '2023-06-01T10:00:00Z',
          customerName: 'Acme Corp',
          expirationDate: '2024-06-01T10:00:00Z'
        },
        { 
          id: 2, 
          key: 'DEF-456-UVW',
          nickname: 'Premium License 1',
          description: 'Premium License',
          entitlements: ['Feature A', 'Feature B', 'Feature C'],
          createdAt: '2023-06-15T14:30:00Z',
          customerName: 'TechCo Inc',
          expirationDate: '2025-06-15T14:30:00Z'
        }
      ]
    },
    toggleLicenseSelection(license) {
      const index = this.selectedLicenses.findIndex(l => l.id === license.id);
      if (index > -1) {
        this.selectedLicenses.splice(index, 1);
      } else {
        this.selectedLicenses.push(license);
      }
    },
    isLicenseSelected(license) {
      return this.selectedLicenses.some(l => l.id === license.id);
    },
    toggleSelectAll() {
      this.selectedLicenses = this.allLicensesSelected ? [] : [...this.licenses];
    },
    openNewLicenseModal() {
      this.showNewLicenseModal = true
    },
    closeNewLicenseModal() {
      this.showNewLicenseModal = false
      this.newLicense = {
        nickname: '',
        description: '',
        customerName: '',
        entitlements: '',
        expirationDate: ''
      }
    },
    async generateLicense() {
      // TODO: Implement API call to generate a new license
      // For now, we'll just add it to the local array
      const newLicense = {
        id: this.licenses.length + 1,
        key: 'NEW-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        nickname: this.newLicense.nickname,
        description: this.newLicense.description,
        entitlements: this.newLicense.entitlements.split(',').map(e => e.trim()),
        createdAt: new Date().toISOString(),
        customerName: this.newLicense.customerName,
        expirationDate: new Date(this.newLicense.expirationDate).toISOString()
      }
      this.licenses.push(newLicense)
      this.closeNewLicenseModal()
    },
    async deleteLicenses() {
      if (this.selectedLicenses.length > 0) {
        // TODO: Implement API call to delete the licenses
        // probably needs a double-confirm to delete
        this.licenses = this.licenses.filter(license => !this.isLicenseSelected(license));
        this.selectedLicenses = [];
      }
    }
  },
  mounted() {
    this.fetchLicenses()
  }
}
</script>

<style scoped>
.license-dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f5f5f5;
}

tr.selected {
  background-color: #e0f7fa;
}

.no-licenses {
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.actions {
  margin-top: 20px;
  text-align: right;
}

.btn {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-danger {
  background-color: #f44336;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  text-align: right;
  margin-top: 20px;
}

pre {
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}
</style>
<template>
  <div class="installer-page">
    <h2>Kubernetes Installer</h2>
    <p>Select components for your Kubernetes installation:</p>
    
    <div class="component-selection">
      <div v-for="(component, index) in components" :key="index" class="component-item">
        <label>
          <input type="checkbox" v-model="component.selected" @change="updateInstallCommand">
          {{ component.name }}
        </label>
        <select v-if="component.selected" v-model="component.version" @change="updateInstallCommand">
          <option v-for="version in component.versions" :key="version" :value="version">{{ version }}</option>
        </select>
      </div>
    </div>

    <div class="install-command" v-if="installCommand">
      <h3>Installation Command:</h3>
      <pre>{{ installCommand }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InstallerPage',
  data() {
    return {
      components: [
        { name: 'Kubernetes', selected: true, version: '1.21.0', versions: ['1.20.0', '1.21.0', '1.22.0'] },
        { name: 'Containerd', selected: true, version: '1.4.6', versions: ['1.4.4', '1.4.6', '1.5.0'] },
        { name: 'Flannel', selected: false, version: '0.14.0', versions: ['0.13.0', '0.14.0', '0.15.0'] },
        { name: 'Contour', selected: false, version: '1.18.0', versions: ['1.17.0', '1.18.0', '1.19.0'] },
      ],
      installCommand: '',
    }
  },
  methods: {
    updateInstallCommand() {
      const selectedComponents = this.components
        .filter(c => c.selected)
        .map(c => `${c.name.toLowerCase()}=${c.version}`)
        .join(' ')
      
      this.installCommand = `curl https://kurl.sh/custom | sudo bash -s -- ${selectedComponents}`
    }
  },
  mounted() {
    this.updateInstallCommand()
  }
}
</script>

<style scoped>
.installer-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.component-selection {
  margin-top: 20px;
}

.component-item {
  margin-bottom: 10px;
}

.install-command {
  margin-top: 30px;
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
}

pre {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
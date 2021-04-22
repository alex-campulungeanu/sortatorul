<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
  name: 'MainLayout',
  components: {
    Sidebar
  }
}
</script>
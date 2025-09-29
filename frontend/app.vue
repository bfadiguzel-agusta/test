<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Global store initialization
const authStore = useAuthStore()

// Initialize auth on app start
onMounted(() => {
  authStore.initializeAuth()
})
</script>

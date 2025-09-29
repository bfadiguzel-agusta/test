<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out" :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }">
      <!-- Sidebar header -->
      <div class="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <NuxtLink to="/dashboard" class="flex items-center">
          <h1 class="text-xl font-bold text-gray-900">Todo App</h1>
        </NuxtLink>
        <button 
          @click="sidebarOpen = false"
          class="md:hidden rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="mt-8 px-4">
        <div class="space-y-2">
          <!-- Dashboard -->
          <NuxtLink 
            to="/dashboard"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="$route.path === '/dashboard' ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
            </svg>
            Dashboard
          </NuxtLink>

          <!-- Projects -->
          <NuxtLink 
            to="/projects"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="$route.path.startsWith('/projects') ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            Projeler
          </NuxtLink>

          <!-- Users (Admin Only) -->
          <NuxtLink 
            v-if="authStore.isAdmin"
            to="/admin/users"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="$route.path.startsWith('/admin/users') ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
            Kullanıcılar
          </NuxtLink>

          <!-- Settings -->
          <NuxtLink 
            to="/admin/settings"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="$route.path.startsWith('/admin/settings') ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Ayarlar
          </NuxtLink>
        </div>
      </nav>

      <!-- User info at bottom -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div class="flex items-center">
          <div class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
            <span class="text-sm font-medium text-white">
              {{ authStore.user?.firstName?.charAt(0) || 'U' }}
            </span>
          </div>
          <div class="ml-3 flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ authStore.fullName }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ authStore.user?.email }}
            </p>
          </div>
          <button 
            @click="authStore.logout()"
            class="ml-2 p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            title="Çıkış Yap"
          >
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile sidebar overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity md:hidden z-40"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main content -->
    <div class="flex-1 md:ml-64">
      <!-- Top bar for mobile -->
      <div class="md:hidden bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between h-16 px-4">
          <button 
            @click="sidebarOpen = true"
            class="rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 class="text-lg font-semibold text-gray-900">Todo App</h1>
          <div class="w-10"></div> <!-- Spacer -->
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const sidebarOpen = ref(false)

// Close sidebar on route change (mobile)
const route = useRoute()
watch(() => route.path, () => {
  sidebarOpen.value = false
})

// Close sidebar on window resize (if becomes desktop)
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      sidebarOpen.value = false
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

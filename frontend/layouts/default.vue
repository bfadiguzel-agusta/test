<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/dashboard" class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">Todo App</h1>
            </NuxtLink>
            
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink 
                to="/dashboard" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-primary-500 text-gray-900"
              >
                Dashboard
              </NuxtLink>
              <NuxtLink 
                to="/projects" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-primary-500 text-gray-900"
              >
                Projeler
              </NuxtLink>
              <NuxtLink 
                v-if="authStore.isAdmin"
                to="/admin" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-primary-500 text-gray-900"
              >
                Yönetim
              </NuxtLink>
            </div>
          </div>
          
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="relative">
                <button 
                  @click="showUserMenu = !showUserMenu"
                  class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span class="sr-only">Kullanıcı menüsünü aç</span>
                  <div class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <span class="text-sm font-medium text-white">
                      {{ authStore.user?.firstName?.charAt(0) || 'U' }}
                    </span>
                  </div>
                </button>
                
                <div 
                  v-if="showUserMenu"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  @click="showUserMenu = false"
                >
                  <div class="py-1">
                    <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      <div class="font-medium">{{ authStore.fullName }}</div>
                      <div class="text-gray-500">{{ authStore.user?.email }}</div>
                    </div>
                    <NuxtLink 
                      to="/profile" 
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profil
                    </NuxtLink>
                    <button 
                      @click="authStore.logout()"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const showUserMenu = ref(false)

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showUserMenu.value = false
    }
  })
})
</script>

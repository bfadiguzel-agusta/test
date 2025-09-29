<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-900 mb-6">
          Todo App
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Jira ve Trello benzeri modern proje yönetim uygulaması. 
          Projelerinizi organize edin, görevlerinizi takip edin ve ekibinizle işbirliği yapın.
        </p>
        <div class="space-x-4">
          <NuxtLink 
            to="/login" 
            class="btn btn-primary text-lg px-8 py-3"
          >
            Giriş Yap
          </NuxtLink>
          <NuxtLink 
            to="/register" 
            class="btn btn-secondary text-lg px-8 py-3"
          >
            Kayıt Ol
          </NuxtLink>
        </div>
      </div>

      <div class="mt-20 grid md:grid-cols-3 gap-8">
        <div class="card text-center p-8">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Proje Yönetimi</h3>
          <p class="text-gray-600">
            Projelerinizi organize edin ve ekip üyelerinizi atayın
          </p>
        </div>

        <div class="card text-center p-8">
          <div class="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Kanban Panoları</h3>
          <p class="text-gray-600">
            Görevlerinizi sürükle-bırak ile kolayca yönetin
          </p>
        </div>

        <div class="card text-center p-8">
          <div class="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Ekip İşbirliği</h3>
          <p class="text-gray-600">
            Rol bazlı yetkilendirme ile güvenli işbirliği
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Redirect if already authenticated
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  }
})
</script>

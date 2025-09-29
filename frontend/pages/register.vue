<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Yeni hesap oluşturun
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Veya
          <NuxtLink to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            mevcut hesabınızla giriş yapın
          </NuxtLink>
        </p>
      </div>
      
      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">Ad</label>
              <input
                id="firstName"
                v-model="form.firstName"
                name="firstName"
                type="text"
                required
                class="input mt-1"
                placeholder="Adınız"
              />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Soyad</label>
              <input
                id="lastName"
                v-model="form.lastName"
                name="lastName"
                type="text"
                required
                class="input mt-1"
                placeholder="Soyadınız"
              />
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email adresi</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="input mt-1"
              placeholder="Email adresiniz"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="input mt-1"
              placeholder="En az 6 karakter"
            />
          </div>
        </div>

        <div v-if="error" class="text-sm text-danger-600 text-center">
          {{ error }}
        </div>

        <div v-if="success" class="text-sm text-success-600 text-center">
          {{ success }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ authStore.isLoading ? 'Kaydediliyor...' : 'Kayıt Ol' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
})

const authStore = useAuthStore()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const error = ref('')
const success = ref('')

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  }
})

const handleRegister = async () => {
  error.value = ''
  success.value = ''
  
  try {
    await authStore.register(form)
    success.value = 'Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...'
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
  } catch (err) {
    error.value = err.message
  }
}
</script>

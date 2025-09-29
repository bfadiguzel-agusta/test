export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Client-side'da çalışıyorsa token'ı kontrol et
  if (process.client) {
    authStore.initializeAuth()
  }

  // Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})

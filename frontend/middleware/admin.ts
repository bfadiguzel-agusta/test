export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  // Önce auth kontrolü
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }

  // Admin kontrolü
  if (!authStore.isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Bu sayfaya erişim yetkiniz yok',
    })
  }
})

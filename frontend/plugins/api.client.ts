export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ request, options }) {
      // Token'ı her istekte ekle
      const token = authStore.token || (process.client ? localStorage.getItem('token') : null)
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        }
      }
    },
    onResponseError({ response }) {
      // 401 durumunda kullanıcıyı çıkış yaptır
      if (response.status === 401) {
        authStore.logout()
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})

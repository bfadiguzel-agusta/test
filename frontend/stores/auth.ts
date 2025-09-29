import { defineStore } from 'pinia'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'user'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  firstName: string
  lastName: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    fullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.isLoading = true
      try {
        const { $api } = useNuxtApp()
        const response = await $api('/auth/login', {
          method: 'POST',
          body: credentials,
        })

        this.token = response.access_token
        this.user = response.user

        // Token'ı localStorage'a kaydet
        if (process.client) {
          localStorage.setItem('token', response.access_token)
        }

        await navigateTo('/dashboard')
      } catch (error: any) {
        throw new Error(error.data?.message || 'Giriş başarısız')
      } finally {
        this.isLoading = false
      }
    },

    async register(data: RegisterData) {
      this.isLoading = true
      try {
        const { $api } = useNuxtApp()
        await $api('/auth/register', {
          method: 'POST',
          body: data,
        })

        // Kayıt başarılı, giriş sayfasına yönlendir
        await navigateTo('/login')
      } catch (error: any) {
        throw new Error(error.data?.message || 'Kayıt başarısız')
      } finally {
        this.isLoading = false
      }
    },

    async fetchProfile() {
      if (!this.token) return

      try {
        const { $api } = useNuxtApp()
        const user = await $api('/auth/profile')
        this.user = user
      } catch (error) {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null

      if (process.client) {
        localStorage.removeItem('token')
      }

      navigateTo('/login')
    },

    initializeAuth() {
      if (process.client) {
        const token = localStorage.getItem('token')
        if (token) {
          this.token = token
          this.fetchProfile()
        }
      }
    },
  },
})

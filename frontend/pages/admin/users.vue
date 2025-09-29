<template>
  <NuxtLayout name="admin">
    <div class="p-6">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
            <p class="mt-2 text-sm text-gray-600">
              Sistem kullanıcılarını yönetin, yeni kullanıcı ekleyin ve roller atayın.
            </p>
          </div>
          <button
            @click="showAddUserModal = true"
            class="btn btn-primary"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Yeni Kullanıcı
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Toplam Kullanıcı</div>
              <div class="text-2xl font-bold text-gray-900">{{ users.length }}</div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Aktif Kullanıcı</div>
              <div class="text-2xl font-bold text-gray-900">{{ activeUsers }}</div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Admin</div>
              <div class="text-2xl font-bold text-gray-900">{{ adminUsers }}</div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Normal Kullanıcı</div>
              <div class="text-2xl font-bold text-gray-900">{{ normalUsers }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow mb-6">
        <div class="p-6 border-b border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div class="flex-1 min-w-0">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="input pl-10 w-full sm:w-64"
                  placeholder="Kullanıcı ara..."
                />
              </div>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-4">
              <select v-model="filterRole" class="input">
                <option value="">Tüm Roller</option>
                <option value="admin">Admin</option>
                <option value="user">Kullanıcı</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kullanıcı
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kayıt Tarihi
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                          <span class="text-sm font-medium text-white">
                            {{ user.firstName?.charAt(0) || 'U' }}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ user.firstName }} {{ user.lastName }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ user.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'"
                    >
                      {{ user.role === 'admin' ? 'Admin' : 'Kullanıcı' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end space-x-2">
                      <button
                        @click="editUser(user)"
                        class="text-primary-600 hover:text-primary-900"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button
                        v-if="user.id !== authStore.user?.id"
                        @click="deleteUser(user)"
                        class="text-red-600 hover:text-red-900"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div 
      v-if="showAddUserModal" 
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="closeAddUserModal"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle' }}
          </h3>
          
          <form @submit.prevent="saveUser" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                <input
                  v-model="userForm.firstName"
                  type="text"
                  required
                  class="input w-full"
                  placeholder="Ad"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                <input
                  v-model="userForm.lastName"
                  type="text"
                  required
                  class="input w-full"
                  placeholder="Soyad"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="userForm.email"
                type="email"
                required
                class="input w-full"
                placeholder="email@example.com"
              />
            </div>
            
            <div v-if="!editingUser">
              <label class="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input
                v-model="userForm.password"
                type="password"
                required
                class="input w-full"
                placeholder="Şifre"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                v-model="userForm.role"
                class="input w-full"
                required
              >
                <option value="user">Kullanıcı</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button" 
                @click="closeAddUserModal"
                class="btn btn-secondary"
              >
                İptal
              </button>
              <button 
                type="submit" 
                :disabled="saving"
                class="btn btn-primary"
              >
                {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const authStore = useAuthStore()

// Data
const users = ref([])
const searchQuery = ref('')
const filterRole = ref('')
const showAddUserModal = ref(false)
const editingUser = ref(null)
const saving = ref(false)

const userForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'user'
})

// Computed
const filteredUsers = computed(() => {
  let filtered = users.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.firstName?.toLowerCase().includes(query) ||
      user.lastName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    )
  }

  if (filterRole.value) {
    filtered = filtered.filter(user => user.role === filterRole.value)
  }

  return filtered
})

const activeUsers = computed(() => users.value.length) // Tüm kullanıcıları aktif sayıyoruz
const adminUsers = computed(() => users.value.filter(user => user.role === 'admin').length)
const normalUsers = computed(() => users.value.filter(user => user.role === 'user').length)

// Methods
const fetchUsers = async () => {
  try {
    const { $api } = useNuxtApp()
    const response = await $api('/users')
    users.value = response
  } catch (error) {
    console.error('Kullanıcılar yüklenemedi:', error)
  }
}

const editUser = (user) => {
  editingUser.value = user
  userForm.firstName = user.firstName
  userForm.lastName = user.lastName
  userForm.email = user.email
  userForm.role = user.role
  userForm.password = '' // Şifre düzenlemede boş
  showAddUserModal.value = true
}

const deleteUser = async (user) => {
  if (!confirm(`${user.firstName} ${user.lastName} kullanıcısını silmek istediğinizden emin misiniz?`)) {
    return
  }

  try {
    const { $api } = useNuxtApp()
    await $api(`/users/${user.id}`, { method: 'DELETE' })
    await fetchUsers()
  } catch (error) {
    console.error('Kullanıcı silinemedi:', error)
    alert('Kullanıcı silinirken hata oluştu')
  }
}

const saveUser = async () => {
  saving.value = true
  try {
    const { $api } = useNuxtApp()
    
    if (editingUser.value) {
      // Update user
      await $api(`/users/${editingUser.value.id}/role`, {
        method: 'PATCH',
        body: { role: userForm.role }
      })
    } else {
      // Create user
      await $api('/auth/register', {
        method: 'POST',
        body: {
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          email: userForm.email,
          password: userForm.password,
          role: userForm.role
        }
      })
    }
    
    await fetchUsers()
    closeAddUserModal()
  } catch (error) {
    console.error('Kullanıcı kaydedilemedi:', error)
    alert('Kullanıcı kaydedilirken hata oluştu')
  } finally {
    saving.value = false
  }
}

const closeAddUserModal = () => {
  showAddUserModal.value = false
  editingUser.value = null
  userForm.firstName = ''
  userForm.lastName = ''
  userForm.email = ''
  userForm.password = ''
  userForm.role = 'user'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('tr-TR')
}

// Load users on mount
onMounted(() => {
  fetchUsers()
})
</script>

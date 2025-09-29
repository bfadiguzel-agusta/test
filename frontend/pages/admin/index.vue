<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Yönetim Paneli</h1>
      <p class="mt-2 text-gray-600">Kullanıcıları ve projeleri yönetin</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Toplam Kullanıcı</p>
            <p class="text-2xl font-semibold text-gray-900">{{ users.length }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Aktif Proje</p>
            <p class="text-2xl font-semibold text-gray-900">{{ projectsStore.projects.length }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Admin Kullanıcı</p>
            <p class="text-2xl font-semibold text-gray-900">{{ adminUsers.length }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-danger-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Bu Ay Kayıt</p>
            <p class="text-2xl font-semibold text-gray-900">{{ recentUsers.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Users Management -->
    <div class="card mb-8">
      <div class="card-header flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">Kullanıcı Yönetimi</h2>
        <div class="flex items-center space-x-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Kullanıcı ara..."
              class="input w-64"
            />
            <svg class="absolute right-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="card-content p-0">
        <div v-if="usersLoading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p class="mt-2 text-gray-500">Kullanıcılar yükleniyor...</p>
        </div>
        
        <div v-else-if="filteredUsers.length === 0" class="text-center py-8">
          <p class="text-gray-500">Kullanıcı bulunamadı</p>
        </div>
        
        <div v-else class="overflow-x-auto">
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
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-primary-600">
                        {{ user.firstName.charAt(0) }}
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ user.firstName }} {{ user.lastName }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'bg-danger-100 text-danger-800': user.role === 'admin',
                      'bg-primary-100 text-primary-800': user.role === 'user'
                    }"
                    class="px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ user.role === 'admin' ? 'Yönetici' : 'Kullanıcı' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="changeUserRole(user)"
                      class="text-primary-600 hover:text-primary-900"
                    >
                      Rol Değiştir
                    </button>
                    <button
                      v-if="user.id !== authStore.user?.id"
                      @click="deactivateUser(user)"
                      class="text-danger-600 hover:text-danger-900"
                    >
                      Deaktive Et
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Project Assignment -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-lg font-medium text-gray-900">Proje Atama Yönetimi</h2>
      </div>
      <div class="card-content">
        <div class="space-y-4">
          <div 
            v-for="project in projectsStore.projects" 
            :key="project.id"
            class="border rounded-lg p-4"
          >
            <div class="flex items-center justify-between mb-3">
              <div>
                <h3 class="font-medium text-gray-900">{{ project.name }}</h3>
                <p class="text-sm text-gray-500">{{ project.description || 'Açıklama yok' }}</p>
              </div>
              <button 
                @click="manageProjectUsers(project)"
                class="btn btn-sm btn-primary"
              >
                Kullanıcı Yönet
              </button>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="projectUser in project.projectUsers" 
                :key="projectUser.id"
                class="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2"
              >
                <div class="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <span class="text-xs font-medium text-primary-600">
                    {{ projectUser.user.firstName.charAt(0) }}
                  </span>
                </div>
                <span class="text-sm text-gray-900">
                  {{ projectUser.user.firstName }} {{ projectUser.user.lastName }}
                </span>
                <span 
                  :class="{
                    'bg-danger-100 text-danger-800': projectUser.role === 'admin',
                    'bg-primary-100 text-primary-800': projectUser.role === 'developer',
                    'bg-gray-100 text-gray-800': projectUser.role === 'viewer'
                  }"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ getRoleLabel(projectUser.role) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Role Change Modal -->
  <div 
    v-if="showRoleModal" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click.self="showRoleModal = false"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-medium mb-4">Kullanıcı Rolünü Değiştir</h3>
      
      <div class="mb-4">
        <p class="text-sm text-gray-600">
          <strong>{{ selectedUser?.firstName }} {{ selectedUser?.lastName }}</strong> kullanıcısının rolünü değiştirin:
        </p>
      </div>
      
      <form @submit.prevent="updateUserRole" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Yeni Rol</label>
          <select v-model="newRole" class="input w-full" required>
            <option value="user">Kullanıcı</option>
            <option value="admin">Yönetici</option>
          </select>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button 
            type="button" 
            @click="showRoleModal = false"
            class="btn btn-secondary"
          >
            İptal
          </button>
          <button 
            type="submit" 
            :disabled="updatingRole"
            class="btn btn-primary"
          >
            {{ updatingRole ? 'Güncelleniyor...' : 'Güncelle' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const authStore = useAuthStore()
const projectsStore = useProjectsStore()

const users = ref([])
const usersLoading = ref(false)
const searchQuery = ref('')
const showRoleModal = ref(false)
const selectedUser = ref(null)
const newRole = ref('user')
const updatingRole = ref(false)

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.firstName.toLowerCase().includes(query) ||
    user.lastName.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  )
})

const adminUsers = computed(() => 
  users.value.filter(user => user.role === 'admin')
)

const recentUsers = computed(() => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  
  return users.value.filter(user => 
    new Date(user.createdAt) > oneMonthAgo
  )
})

const getRoleLabel = (role) => {
  const labels = {
    'admin': 'Yönetici',
    'developer': 'Geliştirici',
    'viewer': 'Görüntüleyici'
  }
  return labels[role] || 'Bilinmiyor'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('tr-TR')
}

const fetchUsers = async () => {
  usersLoading.value = true
  try {
    const { $api } = useNuxtApp()
    users.value = await $api('/users')
  } catch (error) {
    console.error('Kullanıcılar yüklenemedi:', error)
  } finally {
    usersLoading.value = false
  }
}

const changeUserRole = (user) => {
  selectedUser.value = user
  newRole.value = user.role
  showRoleModal.value = true
}

const updateUserRole = async () => {
  if (!selectedUser.value) return
  
  updatingRole.value = true
  try {
    const { $api } = useNuxtApp()
    const updatedUser = await $api(`/users/${selectedUser.value.id}/role`, {
      method: 'PATCH',
      body: { role: newRole.value }
    })
    
    // Update user in list
    const index = users.value.findIndex(u => u.id === selectedUser.value.id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], role: updatedUser.role }
    }
    
    showRoleModal.value = false
    alert('Kullanıcı rolü başarıyla güncellendi')
  } catch (error) {
    console.error('Rol güncellenemedi:', error)
    alert('Rol güncellenirken hata oluştu')
  } finally {
    updatingRole.value = false
  }
}

const deactivateUser = async (user) => {
  if (!confirm(`${user.firstName} ${user.lastName} kullanıcısını deaktive etmek istediğinizden emin misiniz?`)) {
    return
  }
  
  try {
    const { $api } = useNuxtApp()
    await $api(`/users/${user.id}`, { method: 'DELETE' })
    
    // Remove user from list
    users.value = users.value.filter(u => u.id !== user.id)
    alert('Kullanıcı başarıyla deaktive edildi')
  } catch (error) {
    console.error('Kullanıcı deaktive edilemedi:', error)
    alert('Kullanıcı deaktive edilirken hata oluştu')
  }
}

const manageProjectUsers = (project) => {
  // Navigate to project management page
  navigateTo(`/admin/projects/${project.id}`)
}

onMounted(async () => {
  await Promise.all([
    fetchUsers(),
    projectsStore.fetchProjects()
  ])
})
</script>

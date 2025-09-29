<template>
  <NuxtLayout name="admin">
    <div class="p-6">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Projeler</h1>
        <p class="mt-2 text-gray-600">Tüm projelerinizi buradan yönetin</p>
      </div>
      
      <button 
        v-if="authStore.isAdmin"
        @click="showCreateProject = true"
        class="btn btn-primary"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Yeni Proje
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="projectsStore.isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-500">Projeler yükleniyor...</p>
    </div>

    <!-- Projects Grid -->
    <div v-else-if="projectsStore.projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in projectsStore.projects" 
        :key="project.id"
        class="card hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateTo(`/projects/${project.id}`)"
      >
        <div class="card-content">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">
              {{ project.name }}
            </h3>
            <div class="flex items-center space-x-2">
              <span 
                :class="getRoleBadgeClass(getUserRole(project))"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ getRoleLabel(getUserRole(project)) }}
              </span>
              <button 
                v-if="authStore.isAdmin || getUserRole(project) === 'admin'"
                @click.stop="editProject(project)"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">
            {{ project.description || 'Açıklama yok' }}
          </p>
          
          <div class="flex items-center justify-between text-sm text-gray-500">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span>{{ project.projectUsers?.length || 0 }} üye</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span>{{ project.boards?.length || 0 }} pano</span>
              </div>
            </div>
            <div class="text-xs">
              {{ formatDate(project.createdAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Henüz proje yok</h3>
      <p class="mt-1 text-sm text-gray-500">İlk projenizi oluşturarak başlayın.</p>
      <div class="mt-6">
        <button 
          v-if="authStore.isAdmin"
          @click="showCreateProject = true"
          class="btn btn-primary"
        >
          İlk Projenizi Oluşturun
        </button>
      </div>
    </div>

    <!-- Create Project Modal -->
    <div 
      v-if="showCreateProject" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showCreateProject = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-medium mb-4">
          {{ editingProject ? 'Proje Düzenle' : 'Yeni Proje Oluştur' }}
        </h3>
        
        <form @submit.prevent="saveProject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Proje Adı</label>
            <input
              v-model="projectForm.name"
              type="text"
              required
              class="input w-full"
              placeholder="Proje adını giriniz"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea
              v-model="projectForm.description"
              rows="3"
              class="input w-full resize-none"
              placeholder="Proje açıklaması (opsiyonel)"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              @click="closeProjectModal"
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
  middleware: 'auth'
})

const authStore = useAuthStore()
const projectsStore = useProjectsStore()

const showCreateProject = ref(false)
const editingProject = ref(null)
const saving = ref(false)

const projectForm = reactive({
  name: '',
  description: ''
})

const getUserRole = (project) => {
  if (!authStore.user) return null
  const projectUser = project.projectUsers?.find(pu => pu.userId === authStore.user.id)
  return projectUser?.role || null
}

const getRoleLabel = (role) => {
  const labels = {
    'admin': 'Yönetici',
    'developer': 'Geliştirici',
    'viewer': 'Görüntüleyici'
  }
  return labels[role] || 'Bilinmiyor'
}

const getRoleBadgeClass = (role) => {
  const classes = {
    'admin': 'bg-danger-100 text-danger-800',
    'developer': 'bg-primary-100 text-primary-800',
    'viewer': 'bg-gray-100 text-gray-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('tr-TR')
}

const editProject = (project) => {
  editingProject.value = project
  projectForm.name = project.name
  projectForm.description = project.description || ''
  showCreateProject.value = true
}

const closeProjectModal = () => {
  showCreateProject.value = false
  editingProject.value = null
  projectForm.name = ''
  projectForm.description = ''
}

const saveProject = async () => {
  saving.value = true
  try {
    if (editingProject.value) {
      await projectsStore.updateProject(editingProject.value.id, projectForm)
    } else {
      await projectsStore.createProject(projectForm)
    }
    closeProjectModal()
  } catch (error) {
    console.error('Proje kaydedilemedi:', error)
    alert(error.message || 'Proje kaydedilirken hata oluştu')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  projectsStore.fetchProjects()
})
</script>

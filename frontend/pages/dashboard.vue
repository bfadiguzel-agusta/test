<template>
  <NuxtLayout name="admin">
    <div class="p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-gray-600">Hoş geldiniz, {{ authStore.fullName }}</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Toplam Proje</p>
            <p class="text-2xl font-semibold text-gray-900">{{ projectsStore.projects.length }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Bekleyen Görevler</p>
            <p class="text-2xl font-semibold text-gray-900">{{ pendingTasks.length }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Tamamlanan</p>
            <p class="text-2xl font-semibold text-gray-900">{{ completedTasks.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Projects -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="card">
        <div class="card-header">
          <h2 class="text-lg font-medium text-gray-900">Son Projeler</h2>
        </div>
        <div class="card-content">
          <div v-if="projectsStore.isLoading" class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p class="mt-2 text-gray-500">Projeler yükleniyor...</p>
          </div>
          <div v-else-if="projectsStore.projects.length === 0" class="text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <p class="mt-2 text-gray-500">Henüz proje yok</p>
            <NuxtLink to="/projects" class="btn btn-primary mt-4">
              İlk Projenizi Oluşturun
            </NuxtLink>
          </div>
          <div v-else class="space-y-4">
            <div 
              v-for="project in recentProjects" 
              :key="project.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 class="font-medium text-gray-900">{{ project.name }}</h3>
                <p class="text-sm text-gray-500">{{ project.description || 'Açıklama yok' }}</p>
              </div>
              <NuxtLink 
                :to="`/projects/${project.id}`"
                class="btn btn-sm btn-primary"
              >
                Görüntüle
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- My Tasks -->
      <div class="card">
        <div class="card-header">
          <h2 class="text-lg font-medium text-gray-900">Benim Görevlerim</h2>
        </div>
        <div class="card-content">
          <div v-if="tasksLoading" class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p class="mt-2 text-gray-500">Görevler yükleniyor...</p>
          </div>
          <div v-else-if="myTasks.length === 0" class="text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
            <p class="mt-2 text-gray-500">Atanmış görev yok</p>
          </div>
          <div v-else class="space-y-3">
            <div 
              v-for="task in recentTasks" 
              :key="task.id"
              class="p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center justify-between">
                <h4 class="font-medium text-gray-900 text-sm">{{ task.title }}</h4>
                <span 
                  :class="{
                    'bg-gray-100 text-gray-800': task.status === 'todo',
                    'bg-primary-100 text-primary-800': task.status === 'in_progress',
                    'bg-warning-100 text-warning-800': task.status === 'testing',
                    'bg-success-100 text-success-800': task.status === 'done'
                  }"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ getStatusLabel(task.status) }}
                </span>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                {{ task.board?.project?.name }} - {{ task.board?.name }}
              </p>
            </div>
          </div>
        </div>
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

const myTasks = ref([])
const tasksLoading = ref(false)

const recentProjects = computed(() => 
  projectsStore.projects.slice(0, 5)
)

const recentTasks = computed(() => 
  myTasks.value.slice(0, 5)
)

const pendingTasks = computed(() => 
  myTasks.value.filter(task => task.status !== 'done')
)

const completedTasks = computed(() => 
  myTasks.value.filter(task => task.status === 'done')
)

const getStatusLabel = (status) => {
  const labels = {
    'todo': 'Yapılacak',
    'in_progress': 'Devam Ediyor',
    'testing': 'Test',
    'done': 'Tamamlandı'
  }
  return labels[status] || status
}

const fetchMyTasks = async () => {
  if (!authStore.user) return
  
  tasksLoading.value = true
  try {
    const { $api } = useNuxtApp()
    myTasks.value = await $api('/tasks/user/assigned')
  } catch (error) {
    console.error('Görevler yüklenemedi:', error)
  } finally {
    tasksLoading.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    projectsStore.fetchProjects(),
    fetchMyTasks()
  ])
})
</script>

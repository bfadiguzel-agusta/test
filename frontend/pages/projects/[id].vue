<template>
  <NuxtLayout name="admin">
    <div class="p-6">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-500">Proje yükleniyor...</p>
    </div>

    <!-- Project Content -->
    <div v-else-if="project">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <div class="flex items-center space-x-2 mb-2">
            <NuxtLink to="/projects" class="text-gray-500 hover:text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </NuxtLink>
            <h1 class="text-3xl font-bold text-gray-900">{{ project.name }}</h1>
          </div>
          <p v-if="project.description" class="text-gray-600">{{ project.description }}</p>
        </div>
        
        <div class="flex items-center space-x-3">
          <button 
            v-if="canManageBoards"
            @click="showAddBoard = true"
            class="btn btn-secondary"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Pano Ekle
          </button>
          
          <button 
            v-if="isProjectAdmin"
            @click="showProjectSettings = true"
            class="btn btn-secondary"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Ayarlar
          </button>
        </div>
      </div>

      <!-- Project Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-gray-900">{{ boards.length }}</div>
          <div class="text-sm text-gray-500">Pano</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-primary-600">{{ totalTasks }}</div>
          <div class="text-sm text-gray-500">Toplam Görev</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-warning-600">{{ activeTasks }}</div>
          <div class="text-sm text-gray-500">Aktif Görev</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-success-600">{{ completedTasks }}</div>
          <div class="text-sm text-gray-500">Tamamlanan</div>
        </div>
      </div>

      <!-- Kanban Board -->
      <div v-if="boards.length > 0">
        <KanbanBoard 
          :boards="boards"
          :project-id="project.id"
          :can-manage-tasks="canManageTasks"
          @task-updated="handleTaskUpdated"
          @task-created="handleTaskCreated"
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Henüz pano yok</h3>
        <p class="mt-1 text-sm text-gray-500">İlk panonuzu oluşturarak başlayın.</p>
        <div class="mt-6">
          <button 
            v-if="canManageBoards"
            @click="showAddBoard = true"
            class="btn btn-primary"
          >
            İlk Panonuzu Oluşturun
          </button>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Proje bulunamadı</h3>
      <p class="mt-1 text-sm text-gray-500">Bu projeye erişim yetkiniz yok veya proje mevcut değil.</p>
    </div>

    <!-- Add Board Modal -->
    <div 
      v-if="showAddBoard" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showAddBoard = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-medium mb-4">Yeni Pano Oluştur</h3>
        
        <form @submit.prevent="createBoard" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pano Adı</label>
            <input
              v-model="boardForm.name"
              type="text"
              required
              class="input w-full"
              placeholder="Örn: Sprint 1, Backlog, In Progress"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea
              v-model="boardForm.description"
              rows="3"
              class="input w-full resize-none"
              placeholder="Pano açıklaması (opsiyonel)"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              @click="showAddBoard = false"
              class="btn btn-secondary"
            >
              İptal
            </button>
            <button 
              type="submit" 
              :disabled="creatingBoard"
              class="btn btn-primary"
            >
              {{ creatingBoard ? 'Oluşturuluyor...' : 'Oluştur' }}
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

const route = useRoute()
const authStore = useAuthStore()
const projectsStore = useProjectsStore()

const project = ref(null)
const boards = ref([])
const loading = ref(true)
const showAddBoard = ref(false)
const showProjectSettings = ref(false)
const creatingBoard = ref(false)

const boardForm = reactive({
  name: '',
  description: ''
})

const userRole = computed(() => {
  if (!project.value || !authStore.user) return null
  return projectsStore.getUserProjectRole(project.value.id, authStore.user.id)
})

const isProjectAdmin = computed(() => 
  authStore.isAdmin || userRole.value === 'admin'
)

const canManageBoards = computed(() => 
  isProjectAdmin.value || userRole.value === 'developer'
)

const canManageTasks = computed(() => 
  isProjectAdmin.value || userRole.value === 'developer'
)

const totalTasks = computed(() => 
  boards.value.reduce((total, board) => total + (board.tasks?.length || 0), 0)
)

const activeTasks = computed(() => 
  boards.value.reduce((total, board) => 
    total + (board.tasks?.filter(task => task.status !== 'done').length || 0), 0
  )
)

const completedTasks = computed(() => 
  boards.value.reduce((total, board) => 
    total + (board.tasks?.filter(task => task.status === 'done').length || 0), 0
  )
)

const fetchProjectData = async () => {
  loading.value = true
  try {
    const [projectData, boardsData] = await Promise.all([
      projectsStore.fetchProjectDetails(route.params.id),
      projectsStore.fetchProjectBoards(route.params.id)
    ])
    
    project.value = projectData
    boards.value = boardsData
    console.log('Boards loaded:', boardsData)
    console.log('Boards length:', boardsData.length)
  } catch (error) {
    console.error('Proje verileri yüklenemedi:', error)
  } finally {
    loading.value = false
  }
}

const createBoard = async () => {
  creatingBoard.value = true
  try {
    const { $api } = useNuxtApp()
    const newBoard = await $api('/boards', {
      method: 'POST',
      body: {
        ...boardForm,
        projectId: project.value.id
      }
    })
    
    boards.value.push({ ...newBoard, tasks: [] })
    showAddBoard.value = false
    boardForm.name = ''
    boardForm.description = ''
  } catch (error) {
    console.error('Pano oluşturulamadı:', error)
    alert('Pano oluşturulurken hata oluştu')
  } finally {
    creatingBoard.value = false
  }
}

const handleTaskUpdated = (updatedTask) => {
  // Find and update the task in boards
  for (const board of boards.value) {
    if (board.tasks) {
      const taskIndex = board.tasks.findIndex(t => t.id === updatedTask.id)
      if (taskIndex !== -1) {
        board.tasks[taskIndex] = updatedTask
        break
      }
    }
  }
}

const handleTaskCreated = (newTask) => {
  // Add task to the appropriate board
  const targetBoard = boards.value.find(b => b.id === newTask.boardId)
  if (targetBoard) {
    if (!targetBoard.tasks) targetBoard.tasks = []
    targetBoard.tasks.push(newTask)
  }
}

onMounted(() => {
  fetchProjectData()
})

// Watch for route changes
watch(() => route.params.id, () => {
  if (route.params.id) {
    fetchProjectData()
  }
})
</script>

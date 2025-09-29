<template>
  <div class="space-y-6">
    <!-- Board Selector -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <select 
          v-model="selectedBoardId" 
          @change="onBoardChange"
          class="input"
        >
          <option value="">Tüm Panolar</option>
          <option v-for="board in boards" :key="board.id" :value="board.id">
            {{ board.name }}
          </option>
        </select>
        <span class="text-sm text-gray-500">
          Toplam {{ filteredTasks.length }} görev
        </span>
      </div>
      <button 
        v-if="canManageTasks"
        @click="showAddTask(selectedBoardId || boards[0]?.id)"
        class="btn btn-primary"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Yeni Görev
      </button>
    </div>

    <!-- Status Columns (Kanban Board) -->
    <div class="flex space-x-6 overflow-x-auto pb-6">
      <div 
        v-for="status in taskStatuses" 
        :key="status.key"
        class="flex-shrink-0 w-80"
        @drop="onDrop($event, status.key)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="card h-full">
          <div class="card-header flex items-center justify-between">
            <h3 class="font-medium text-gray-900 flex items-center">
              <span :class="status.color" class="w-3 h-3 rounded-full mr-2"></span>
              {{ status.label }}
            </h3>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {{ getTasksByStatus(status.key).length }}
            </span>
          </div>
          
          <div class="card-content p-3 max-h-96 overflow-y-auto">
            <div class="space-y-3 min-h-[200px]">
              <div 
                v-for="task in getTasksByStatus(status.key)"
                :key="task.id"
                :draggable="canManageTasks"
                @dragstart="onDragStart($event, task)"
                class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                :class="{ 'cursor-move': canManageTasks, 'cursor-default': !canManageTasks }"
              >
                <div class="flex items-start justify-between mb-2">
                  <h4 class="font-medium text-sm text-gray-900 line-clamp-2">
                    {{ task.title }}
                  </h4>
                  <div class="flex items-center space-x-1 ml-2">
                    <span 
                      :class="`priority-${task.priority}`"
                      class="text-xs font-medium"
                    >
                      {{ getPriorityIcon(task.priority) }}
                    </span>
                    <button 
                      v-if="canManageTasks"
                      @click="editTask(task)"
                      class="text-gray-400 hover:text-gray-600"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p v-if="task.description" class="text-xs text-gray-600 mb-2 line-clamp-2">
                  {{ task.description }}
                </p>
                
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <div class="flex items-center space-x-2">
                    <div v-if="task.assignee" class="flex items-center space-x-1">
                      <div class="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                        <span class="text-xs font-medium text-primary-600">
                          {{ task.assignee.firstName.charAt(0) }}
                        </span>
                      </div>
                      <span>{{ task.assignee.firstName }}</span>
                    </div>
                    <div v-else class="text-gray-400">
                      Atanmamış
                    </div>
                  </div>
                  
                  <div v-if="task.dueDate" class="flex items-center space-x-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>{{ formatDate(task.dueDate) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Task Modal -->
  <div 
    v-if="showTaskModal" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click.self="closeTaskModal"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-medium mb-4">
        {{ editingTask ? 'Görev Düzenle' : 'Yeni Görev' }}
      </h3>
      
      <form @submit.prevent="saveTask" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
          <input
            v-model="taskForm.title"
            type="text"
            required
            class="input w-full"
            placeholder="Görev başlığı"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
          <textarea
            v-model="taskForm.description"
            rows="3"
            class="input w-full resize-none"
            placeholder="Görev açıklaması (opsiyonel)"
          ></textarea>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Öncelik</label>
            <select
              v-model="taskForm.priority"
              class="input w-full"
            >
              <option value="Düşük">Düşük</option>
              <option value="Orta">Orta</option>
              <option value="Yüksek">Yüksek</option>
              <option value="Acil">Acil</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Durum</label>
            <select
              v-model="taskForm.status"
              class="input w-full"
            >
              <option value="Yapılacak">Yapılacak</option>
              <option value="Devam Ediyor">Devam Ediyor</option>
              <option value="Test">Test</option>
              <option value="Tamamlandı">Tamamlandı</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Atanan Kişi</label>
          <select
            v-model="taskForm.assigneeId"
            class="input w-full"
          >
            <option value="">Atanmamış</option>
            <option v-for="user in availableUsers" :key="user.id" :value="user.id">
              {{ user.firstName }} {{ user.lastName }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Son Tarih</label>
          <input
            v-model="taskForm.dueDate"
            type="date"
            class="input w-full"
          />
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button 
            type="button" 
            @click="closeTaskModal"
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
</template>

<script setup>
const props = defineProps({
  boards: {
    type: Array,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  canManageTasks: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['task-updated', 'task-created'])

const showTaskModal = ref(false)
const editingTask = ref(null)
const selectedBoardId = ref('')
const saving = ref(false)

// Task statuses with labels and colors
const taskStatuses = [
  { key: 'todo', label: 'Yapılacak', color: 'bg-gray-500' },
  { key: 'in_progress', label: 'Devam Ediyor', color: 'bg-blue-500' },
  { key: 'testing', label: 'Test', color: 'bg-yellow-500' },
  { key: 'done', label: 'Tamamlandı', color: 'bg-green-500' }
]

const taskForm = reactive({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  boardId: '',
  assigneeId: '',
  dueDate: ''
})

// Available users for assignment (will be fetched from API)
const availableUsers = ref([])

// Fetch available users for assignment
const fetchAvailableUsers = async () => {
  try {
    const { $api } = useNuxtApp()
    const users = await $api('/users/search', {
      method: 'GET',
      query: { projectId: props.projectId }
    })
    availableUsers.value = users
  } catch (error) {
    console.error('Kullanıcılar yüklenemedi:', error)
  }
}

// Load users when component mounts
onMounted(() => {
  fetchAvailableUsers()
})

const getPriorityIcon = (priority) => {
  const icons = {
    'low': '⬇️',
    'medium': '➡️',
    'high': '⬆️',
    'urgent': '🔥'
  }
  return icons[priority] || '➡️'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('tr-TR')
}

// Computed properties for filtering tasks
const filteredTasks = computed(() => {
  let allTasks = []
  props.boards.forEach(board => {
    if (board.tasks) {
      allTasks = [...allTasks, ...board.tasks]
    }
  })
  
  if (selectedBoardId.value) {
    return allTasks.filter(task => task.boardId === selectedBoardId.value)
  }
  
  return allTasks
})

// Get tasks by status
const getTasksByStatus = (status) => {
  return filteredTasks.value.filter(task => task.status === status)
}

// Board change handler
const onBoardChange = () => {
  // Board değiştiğinde gerekli işlemleri yap
}

const showAddTask = (boardId) => {
  selectedBoardId.value = boardId
  taskForm.boardId = boardId
  taskForm.status = getBoardDefaultStatus(boardId)
  resetTaskForm()
  showTaskModal.value = true
}

const editTask = (task) => {
  editingTask.value = task
  taskForm.title = task.title
  taskForm.description = task.description || ''
  taskForm.status = getStatusLabel(task.status)
  taskForm.priority = getPriorityLabel(task.priority)
  taskForm.boardId = task.boardId
  taskForm.assigneeId = task.assigneeId || ''
  taskForm.dueDate = task.dueDate || ''
  showTaskModal.value = true
}

const resetTaskForm = () => {
  taskForm.title = ''
  taskForm.description = ''
  taskForm.status = 'Yapılacak'
  taskForm.priority = 'Orta'
  taskForm.assigneeId = ''
  taskForm.dueDate = ''
  editingTask.value = null
}

const closeTaskModal = () => {
  showTaskModal.value = false
  resetTaskForm()
}

const getBoardDefaultStatus = (boardId) => {
  return 'todo'
}

const getStatusLabel = (status) => {
  const statusMap = {
    'todo': 'Yapılacak',
    'in_progress': 'Devam Ediyor',
    'testing': 'Test',
    'done': 'Tamamlandı'
  }
  return statusMap[status] || 'Yapılacak'
}

const getPriorityLabel = (priority) => {
  const priorityMap = {
    'low': 'Düşük',
    'medium': 'Orta',
    'high': 'Yüksek',
    'urgent': 'Acil'
  }
  return priorityMap[priority] || 'Orta'
}

const saveTask = async () => {
  saving.value = true
  try {
    const { $api } = useNuxtApp()
    
    // Priority mapping from Turkish to English
    const priorityMap = {
      'Düşük': 'low',
      'Orta': 'medium', 
      'Yüksek': 'high',
      'Acil': 'urgent'
    }
    
    // Status mapping from Turkish to English
    const statusMap = {
      'Yapılacak': 'todo',
      'Devam Ediyor': 'in_progress',
      'Test': 'testing',
      'Tamamlandı': 'done'
    }
    
    const taskData = {
      title: taskForm.title,
      description: taskForm.description,
      status: statusMap[taskForm.status] || taskForm.status,
      priority: priorityMap[taskForm.priority] || taskForm.priority,
      boardId: taskForm.boardId,
      assigneeId: taskForm.assigneeId || null,
      dueDate: taskForm.dueDate || null
    }
    
    if (editingTask.value) {
      // Update existing task
      const updatedTask = await $api(`/tasks/${editingTask.value.id}`, {
        method: 'PATCH',
        body: taskData
      })
      emit('task-updated', updatedTask)
    } else {
      // Create new task
      const newTask = await $api('/tasks', {
        method: 'POST',
        body: taskData
      })
      emit('task-created', newTask)
    }
    
    closeTaskModal()
  } catch (error) {
    console.error('Görev kaydedilemedi:', error)
    alert('Görev kaydedilirken hata oluştu')
  } finally {
    saving.value = false
  }
}

// Native Drag & Drop handlers
let draggedTask = null

const onDragStart = (event, task) => {
  if (!props.canManageTasks) return
  console.log('Drag started:', task.title)
  draggedTask = task
  event.dataTransfer.effectAllowed = 'move'
}

const onDrop = async (event, newStatus) => {
  if (!props.canManageTasks || !draggedTask) return
  
  event.preventDefault()
  console.log('Drop event:', draggedTask.title, 'to', newStatus)
  
  if (draggedTask.status === newStatus) return
  
  try {
    const { $api } = useNuxtApp()
    
    // Update task status via API
    const updatedTask = await $api(`/tasks/${draggedTask.id}`, {
      method: 'PATCH',
      body: {
        status: newStatus
      }
    })
    
    // Update local task data
    draggedTask.status = newStatus
    
    emit('task-updated', updatedTask)
    console.log('Task updated successfully')
  } catch (error) {
    console.error('Görev durumu değiştirilemedi:', error)
    alert('Görev durumu değiştirilemedi: ' + error.message)
  } finally {
    draggedTask = null
  }
}
</script>
<template>
  <NuxtLayout name="admin">
    <div class="p-6">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Ayarlar</h1>
        <p class="mt-2 text-sm text-gray-600">
          Sistem ayarlarını yönetin ve yapılandırın.
        </p>
      </div>

      <!-- Settings Sections -->
      <div class="space-y-6">
        <!-- General Settings -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Genel Ayarlar</h3>
            <p class="mt-1 text-sm text-gray-600">Uygulama genel ayarları</p>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Uygulama Adı
              </label>
              <input
                v-model="settings.appName"
                type="text"
                class="input w-full max-w-md"
                placeholder="Todo App"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Açıklama
              </label>
              <textarea
                v-model="settings.appDescription"
                rows="3"
                class="input w-full max-w-md resize-none"
                placeholder="Proje ve görev yönetim uygulaması"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- User Settings -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Kullanıcı Ayarları</h3>
            <p class="mt-1 text-sm text-gray-600">Kullanıcı kayıt ve yetki ayarları</p>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div class="flex items-center">
              <input
                v-model="settings.allowUserRegistration"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900">
                Kullanıcı kayıt olabilir
              </label>
            </div>
            <div class="flex items-center">
              <input
                v-model="settings.requireEmailVerification"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900">
                Email doğrulama gerekli
              </label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Varsayılan Kullanıcı Rolü
              </label>
              <select v-model="settings.defaultUserRole" class="input w-full max-w-xs">
                <option value="user">Kullanıcı</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Project Settings -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Proje Ayarları</h3>
            <p class="mt-1 text-sm text-gray-600">Proje oluşturma ve yönetim ayarları</p>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Maksimum Proje Sayısı (Kullanıcı Başına)
              </label>
              <input
                v-model.number="settings.maxProjectsPerUser"
                type="number"
                min="1"
                max="100"
                class="input w-full max-w-xs"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Maksimum Pano Sayısı (Proje Başına)
              </label>
              <input
                v-model.number="settings.maxBoardsPerProject"
                type="number"
                min="1"
                max="50"
                class="input w-full max-w-xs"
              />
            </div>
            <div class="flex items-center">
              <input
                v-model="settings.allowGuestAccess"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900">
                Misafir erişimine izin ver
              </label>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Bildirim Ayarları</h3>
            <p class="mt-1 text-sm text-gray-600">Email ve sistem bildirimleri</p>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div class="flex items-center">
              <input
                v-model="settings.enableEmailNotifications"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900">
                Email bildirimlerini etkinleştir
              </label>
            </div>
            <div class="flex items-center">
              <input
                v-model="settings.enableTaskReminders"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900">
                Görev hatırlatıcıları
              </label>
            </div>
            <div class="flex items-center">
              <input
                v-model="settings.enableProjectUpdates"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900">
                Proje güncellemeleri
              </label>
            </div>
          </div>
        </div>

        <!-- System Info -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Sistem Bilgileri</h3>
            <p class="mt-1 text-sm text-gray-600">Uygulama ve sistem durumu</p>
          </div>
          <div class="px-6 py-4">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Uygulama Versiyonu</dt>
                <dd class="mt-1 text-sm text-gray-900">v1.0.0</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Son Güncelleme</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ new Date().toLocaleDateString('tr-TR') }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Toplam Kullanıcı</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ systemStats.totalUsers }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Toplam Proje</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ systemStats.totalProjects }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Toplam Görev</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ systemStats.totalTasks }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Database Durumu</dt>
                <dd class="mt-1">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Bağlı
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button
            @click="saveSettings"
            :disabled="saving"
            class="btn btn-primary"
          >
            {{ saving ? 'Kaydediliyor...' : 'Ayarları Kaydet' }}
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

// Data
const saving = ref(false)

const settings = reactive({
  appName: 'Todo App',
  appDescription: 'Proje ve görev yönetim uygulaması',
  allowUserRegistration: true,
  requireEmailVerification: false,
  defaultUserRole: 'user',
  maxProjectsPerUser: 10,
  maxBoardsPerProject: 20,
  allowGuestAccess: false,
  enableEmailNotifications: true,
  enableTaskReminders: true,
  enableProjectUpdates: true
})

const systemStats = reactive({
  totalUsers: 0,
  totalProjects: 0,
  totalTasks: 0
})

// Methods
const loadSystemStats = async () => {
  try {
    const { $api } = useNuxtApp()
    
    // Load users count
    const users = await $api('/users')
    systemStats.totalUsers = users.length
    
    // Load projects count
    const projects = await $api('/projects')
    systemStats.totalProjects = projects.length
    
    // Calculate total tasks (approximate)
    systemStats.totalTasks = projects.reduce((total, project) => {
      return total + (project.boards?.reduce((boardTotal, board) => {
        return boardTotal + (board.tasks?.length || 0)
      }, 0) || 0)
    }, 0)
  } catch (error) {
    console.error('Sistem istatistikleri yüklenemedi:', error)
  }
}

const saveSettings = async () => {
  saving.value = true
  try {
    // Burada ayarları backend'e kaydetmek için API çağrısı yapılabilir
    // Şu an için localStorage'da saklayalım
    localStorage.setItem('appSettings', JSON.stringify(settings))
    
    // Başarı mesajı göster
    alert('Ayarlar başarıyla kaydedildi!')
  } catch (error) {
    console.error('Ayarlar kaydedilemedi:', error)
    alert('Ayarlar kaydedilirken hata oluştu')
  } finally {
    saving.value = false
  }
}

const loadSettings = () => {
  try {
    const savedSettings = localStorage.getItem('appSettings')
    if (savedSettings) {
      Object.assign(settings, JSON.parse(savedSettings))
    }
  } catch (error) {
    console.error('Ayarlar yüklenemedi:', error)
  }
}

// Load data on mount
onMounted(() => {
  loadSettings()
  loadSystemStats()
})
</script>

import { defineStore } from 'pinia'

export interface Project {
  id: string
  name: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  projectUsers: ProjectUser[]
  boards?: Board[]
}

export interface ProjectUser {
  id: string
  userId: string
  projectId: string
  role: 'admin' | 'developer' | 'viewer'
  assignedAt: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
}

export interface Board {
  id: string
  name: string
  description?: string
  projectId: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  tasks?: Task[]
}

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'testing' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  boardId: string
  assigneeId?: string
  createdById: string
  order: number
  dueDate?: string
  createdAt: string
  updatedAt: string
  assignee?: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  createdBy: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    currentProject: null as Project | null,
    currentProjectBoards: [] as Board[],
    isLoading: false,
  }),

  getters: {
    getUserProjectRole: (state) => (projectId: string, userId: string) => {
      const project = state.projects.find(p => p.id === projectId)
      const projectUser = project?.projectUsers.find(pu => pu.userId === userId)
      return projectUser?.role || null
    },
  },

  actions: {
    async fetchProjects() {
      this.isLoading = true
      try {
        const { $api } = useNuxtApp()
        this.projects = await $api('/projects')
      } catch (error) {
        console.error('Projeler yüklenemedi:', error)
      } finally {
        this.isLoading = false
      }
    },

    async createProject(data: { name: string; description?: string }) {
      try {
        const { $api } = useNuxtApp()
        const newProject = await $api('/projects', {
          method: 'POST',
          body: data,
        })
        this.projects.unshift(newProject)
        return newProject
      } catch (error: any) {
        throw new Error(error.data?.message || 'Proje oluşturulamadı')
      }
    },

    async updateProject(id: string, data: { name?: string; description?: string }) {
      try {
        const { $api } = useNuxtApp()
        const updatedProject = await $api(`/projects/${id}`, {
          method: 'PATCH',
          body: data,
        })
        
        const index = this.projects.findIndex(p => p.id === id)
        if (index !== -1) {
          this.projects[index] = updatedProject
        }
        
        if (this.currentProject?.id === id) {
          this.currentProject = updatedProject
        }
        
        return updatedProject
      } catch (error: any) {
        throw new Error(error.data?.message || 'Proje güncellenemedi')
      }
    },

    async deleteProject(id: string) {
      try {
        const { $api } = useNuxtApp()
        await $api(`/projects/${id}`, { method: 'DELETE' })
        
        this.projects = this.projects.filter(p => p.id !== id)
        
        if (this.currentProject?.id === id) {
          this.currentProject = null
          this.currentProjectBoards = []
        }
      } catch (error: any) {
        throw new Error(error.data?.message || 'Proje silinemedi')
      }
    },

    async assignUserToProject(projectId: string, data: { userId: string; role: string }) {
      try {
        const { $api } = useNuxtApp()
        await $api(`/projects/${projectId}/users`, {
          method: 'POST',
          body: data,
        })
        
        // Projeyi yeniden yükle
        await this.fetchProjectDetails(projectId)
      } catch (error: any) {
        throw new Error(error.data?.message || 'Kullanıcı atananamadı')
      }
    },

    async removeUserFromProject(projectId: string, userId: string) {
      try {
        const { $api } = useNuxtApp()
        await $api(`/projects/${projectId}/users/${userId}`, {
          method: 'DELETE',
        })
        
        // Projeyi yeniden yükle
        await this.fetchProjectDetails(projectId)
      } catch (error: any) {
        throw new Error(error.data?.message || 'Kullanıcı çıkarılamadı')
      }
    },

    async fetchProjectDetails(id: string) {
      try {
        const { $api } = useNuxtApp()
        const project = await $api(`/projects/${id}`)
        this.currentProject = project
        
        // Projeyi listede de güncelle
        const index = this.projects.findIndex(p => p.id === id)
        if (index !== -1) {
          this.projects[index] = project
        }
        
        return project
      } catch (error: any) {
        throw new Error(error.data?.message || 'Proje detayları yüklenemedi')
      }
    },

    async fetchProjectBoards(projectId: string) {
      try {
        const { $api } = useNuxtApp()
        this.currentProjectBoards = await $api(`/boards/project/${projectId}`)
        return this.currentProjectBoards
      } catch (error: any) {
        throw new Error(error.data?.message || 'Panolar yüklenemedi')
      }
    },

    setCurrentProject(project: Project | null) {
      this.currentProject = project
      if (!project) {
        this.currentProjectBoards = []
      }
    },
  },
})

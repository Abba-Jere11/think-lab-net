const API_BASE = process.env.NEXT_PUBLIC_API_URL

export interface AnnouncementFilters {
  search?: string
  type?: string
  priority?: string
  department?: string
  status?: string
  page?: number
  limit?: number
}

export interface CreateAnnouncementData {
  title: string
  content: string
  type: "info" | "warning" | "announcement"
  priority: "High" | "Medium" | "Low"
  department: string
  author: string
  expiryDate?: string
  isUrgent?: boolean
  isPinned?: boolean
}

export const announcementAPI = {
  // Get all announcements with filters
  async getAnnouncements(filters: AnnouncementFilters = {}) {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString())
      }
    })

    const response = await fetch(`${API_BASE}/announcements?${params}`)
    if (!response.ok) throw new Error("Failed to fetch announcements")
    return response.json()
  },

  // Get dashboard announcements
  async getDashboardAnnouncements() {
    const response = await fetch(`${API_BASE}/announcements/dashboard`)
    if (!response.ok) throw new Error("Failed to fetch dashboard announcements")
    return response.json()
  },

  // Create announcement
  async createAnnouncement(data: CreateAnnouncementData) {
    const response = await fetch(`${API_BASE}/announcements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create announcement")
    return response.json()
  },

  // Update announcement
  async updateAnnouncement(id: number, data: Partial<CreateAnnouncementData>) {
    const response = await fetch(`${API_BASE}/announcements/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update announcement")
    return response.json()
  },

  // Delete announcement
  async deleteAnnouncement(id: number) {
    const response = await fetch(`${API_BASE}/announcements/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete announcement")
    return response.json()
  },

  // Increment views
  async incrementViews(id: number) {
    const response = await fetch(`${API_BASE}/announcements/${id}/views`, {
      method: "PATCH",
    })
    if (!response.ok) throw new Error("Failed to increment views")
    return response.json()
  },
}

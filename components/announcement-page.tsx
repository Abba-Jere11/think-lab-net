"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Megaphone, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Your existing AnnouncementPage component code here
export function AnnouncementPage() {
  const [showNewAnnouncementDialog, setShowNewAnnouncementDialog] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    priority: "all",
    department: "all",
    status: "all",
  })
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "info",
    priority: "Medium",
    author: "Current User", // You can make this dynamic later
    department: "All Departments",
    expiryDate: "",
    isUrgent: false,
  })

  // Add your API integration here
  useEffect(() => {
    // Fetch announcements from API
    fetchAnnouncements()
  }, [filters])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      // Replace with actual API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements`)
      const data = await response.json()
      setAnnouncements(data.announcements || [])
    } catch (err) {
      setError("Failed to load announcements")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAnnouncement = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newAnnouncement,
          author: "Current User", // Update when you add auth
        }),
      })

      if (response.ok) {
        setShowNewAnnouncementDialog(false)
        setNewAnnouncement({
          title: "",
          content: "",
          type: "info",
          priority: "Medium",
          author: "Current User", // You can make this dynamic later
          department: "All Departments",
          expiryDate: "",
          isUrgent: false,
        })
        fetchAnnouncements() // Refresh the list
      }
    } catch (error) {
      console.error("Error creating announcement:", error)
    }
  }

  // Your existing JSX return here - keeping your original design
  return (
    <div className="min-h-screen bg-gray-50/30 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-1">Manage company announcements and important updates</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
              <Input
                placeholder="Search announcements..."
                className="pl-9 w-full sm:w-64"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            <Dialog open={showNewAnnouncementDialog} onOpenChange={setShowNewAnnouncementDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary" style={{ backgroundColor: "oklch(0.637 0.237 25.331)" }}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                  <DialogDescription>
                    Create a new announcement to share with your team or organization.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter announcement title..."
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Enter announcement content..."
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newAnnouncement.type}
                        onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, type: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Information</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="announcement">Announcement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newAnnouncement.priority}
                        onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, priority: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewAnnouncementDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitAnnouncement}
                    className="bg-primary"
                    style={{ backgroundColor: "oklch(0.637 0.237 25.331)" }}
                  >
                    Publish Announcement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading announcements...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchAnnouncements} variant="outline" size="sm" className="mt-2 bg-transparent">
              Try Again
            </Button>
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement: any) => (
            <Card key={announcement.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      <Info className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{announcement.title}</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">{announcement.content}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span>{announcement.author}</span>
                        <span>{new Date(announcement.publishDate).toLocaleDateString()}</span>
                        <span>{announcement.views} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {announcement.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {announcement.priority}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {!loading && announcements.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
              <p className="text-gray-500 mb-4">Create your first announcement to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Default export
export default AnnouncementPage

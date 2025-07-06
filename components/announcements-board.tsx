"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Building, Megaphone, Pin, Eye } from "lucide-react"

const getDepartmentIcon = (department: string) => {
  switch (department) {
    case "Finance":
      return <Building className="h-3 w-3" />
    case "Corporate Service":
      return <Users className="h-3 w-3" />
    case "Technical":
      return <Megaphone className="h-3 w-3" />
    case "Information Tech":
      return <Calendar className="h-3 w-3" />
    default:
      return <Megaphone className="h-3 w-3" />
  }
}

const getDepartmentColor = (department: string) => {
  switch (department) {
    case "Finance":
      return "bg-green-100 text-green-800"
    case "Corporate Service":
      return "bg-blue-100 text-blue-800"
    case "Technical":
      return "bg-purple-100 text-purple-800"
    case "Information Tech":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "warning":
      return "bg-red-100 text-red-800 border-red-200"
    case "info":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "announcement":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function AnnouncementsBoard() {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardAnnouncements()
  }, [])

  const fetchDashboardAnnouncements = async () => {
    try {
      setError(null)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements/dashboard`)

      if (!response.ok) {
        throw new Error("Failed to fetch announcements")
      }

      const data = await response.json()
      setAnnouncements(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching dashboard announcements:", error)
      setError("Failed to load announcements")
      setAnnouncements([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 px-4 sm:px-6">
        <div>
          <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />
            Major Announcements
          </CardTitle>
        </div>
        <Button size="sm" variant="outline" asChild>
          <a href="/dashboard/announcement">View All Announcements</a>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
        {error && (
          <div className="text-center py-4">
            <p className="text-sm text-red-600">{error}</p>
            <Button onClick={fetchDashboardAnnouncements} size="sm" variant="outline" className="mt-2 bg-transparent">
              Try Again
            </Button>
          </div>
        )}
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading announcements...</p>
          </div>
        ) : (
          !loading &&
          !error &&
          Array.isArray(announcements) &&
          announcements.length > 0 &&
          announcements.map((announcement: any) => (
            <div key={announcement.id} className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {announcement.isPinned && <Pin className="h-4 w-4 text-orange-500 flex-shrink-0" />}
                  <h4 className="font-medium text-xs sm:text-sm break-words">{announcement.title}</h4>
                </div>
                <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              </div>

              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{announcement.content}</p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`text-xs ${getTypeColor(announcement.type)}`} variant="secondary">
                    {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                  </Badge>
                  <Badge className={`text-xs ${getDepartmentColor(announcement.department)}`} variant="secondary">
                    {getDepartmentIcon(announcement.department)}
                    <span className="ml-1">{announcement.department}</span>
                  </Badge>
                  <Badge variant={announcement.priority === "High" ? "destructive" : "outline"} className="text-xs">
                    {announcement.priority}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {announcement.views && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {announcement.views}
                    </div>
                  )}
                  <span className="whitespace-nowrap">{new Date(announcement.publishDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-2 text-xs text-muted-foreground">By {announcement.author}</div>
            </div>
          ))
        )}

        {!loading && !error && announcements.length === 0 && (
          <div className="text-center py-8">
            <Megaphone className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No announcements available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Default export
export default AnnouncementsBoard
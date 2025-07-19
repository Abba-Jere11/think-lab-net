import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, User, Eye } from "lucide-react"

const leaveRequests = [
  {
    id: 1,
    employee: "Muhammad Jere",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Sick Leave",
    dates: "Jul 23-27, 2025",
    status: "Approved",
    days: 4,
    reason: "Sick",
    appliedDate: "Dec 20, 2025",
  },
  {
    id: 2,
    employee: "Omar Tor",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Annual Leave",
    dates: "Jul 21, 2025",
    status: "Pending",
    days: 1,
    reason: "Family Vacation",
    appliedDate: "Jul 20, 2024",
  },
  {
    id: 3,
    employee: "Rufai Shagari",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Personal Leave",
    dates: "July 25-28, 2025",
    status: "Approved",
    days: 2,
    reason: "Personal matters",
    appliedDate: "Jul 20, 2025",
  },
]

export function LeaveRequests() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Leave Requests</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Manage employee leave applications</p>
        </div>
        <Button size="sm" variant="outline">
           <Eye className="h-4 w-4 mr-2" />
          <a href="/dashboard/leave-hr">View All Requests</a>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaveRequests.map((request) => (
          <div
            key={request.id}
            className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={request.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {request.employee
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{request.employee}</h4>
                  <Badge
                    variant={
                      request.status === "Approved"
                        ? "default"
                        : request.status === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-xs"
                    style={
                      request.status === "Approved"
                        ? { backgroundColor: "oklch(0.637 0.237 25.331)", color: "white" }
                        : {}
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{request.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{request.dates}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {request.days} day{request.days > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="text-gray-500">Applied: {request.appliedDate}</div>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">"{request.reason}"</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

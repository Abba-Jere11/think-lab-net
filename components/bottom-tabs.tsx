"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, Award, Clock, Calendar, ArrowUpRight, Star } from "lucide-react"

const tabs = [
  { id: "recent-hires", label: "Recent Hires", active: true },
  { id: "top-performers", label: "Top Performers", active: false },
  { id: "recent-requests", label: "Recent Requests", active: false },
  { id: "this-month", label: "This Month", active: false },
]

const recentHires = [
  {
    name: "Muhammad Jere",
    position: "Software Engineer",
    department: "IT",
    startDate: "May 11, 2025",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Saadatu Dalhatu",
    position: "Engineer",
    department: "Technical",
    startDate: "May 11, 2025",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Abdullahi Kolo",
    position: "Digital Marketer",
    department: "Business developmet",
    startDate: "May 07, 2025",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  
]

const topPerformers = [
  {
    name: "Muhammad Jere",
    position: "Senior Developer",
    department: "Engineering",
    score: 98,
    achievement: "Project Excellence",
  },
  {
    name: "Adeniyi Favor",
    position: "Barrister",
    department: "Legal",
    score: 96,
    achievement: "Employee Satisfaction",
  },
  {
    name: "Omar Tor",
    position: "Computer Engineer",
    department: "IT",
    score: 94,
    achievement: "Employee Satisfaction",
  },
]

const recentRequests = [
  {
    type: "Leave Request",
    employee: "Muhammad jere",
    details: "Annual Leave - 5 days",
    status: "Pending",
    time: "2 hours ago",
  },
  {
    type: "Overtime Request",
    employee: "Omar Tor",
    details: "Weekend work - 8 hours",
    status: "Approved",
    time: "4 hours ago",
  },
  {
    type: "Training Request",
    employee: "Rufai Shagari",
    details: "AWS Certification Course",
    status: "Under Review",
    time: "1 day ago",
  },
]

const monthlyStats = [
  {
    title: "New Hires",
    value: "7",
    change: "+7 from last month",
    icon: UserPlus,
  },
  {
    title: "Promotions",
    value: "2",
    change: "+2 from last month",
    icon: Award,
  },
  {
    title: "Avg. Work Hours",
    value: "42.5",
    change: "Within target range",
    icon: Clock,
  },
  {
    title: "Events Held",
    value: "6",
    change: "Team building focus",
    icon: Calendar,
  },
]

export function BottomTabs() {
  const [activeTab, setActiveTab] = useState("recent-hires")

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
          <CardTitle className="text-lg sm:text-xl font-semibold">HR Analytics</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary self-end sm:self-auto">
            View All <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg w-full sm:w-fit overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs whitespace-nowrap flex-shrink-0 ${activeTab === tab.id ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
              style={activeTab === tab.id ? { backgroundColor: "oklch(0.637 0.237 25.331)", color: "white" } : {}}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {activeTab === "recent-hires" && (
          <div className="space-y-3 sm:space-y-4">
            {recentHires.map((hire, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors"
              >
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                  <AvatarImage src={hire.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs sm:text-sm">
                    {hire.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs sm:text-sm truncate">{hire.name}</h4>
                  <p className="text-xs text-gray-500 truncate">
                    {hire.position} • {hire.department}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Badge variant="outline" className="text-xs whitespace-nowrap">
                    Started {hire.startDate}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "top-performers" && (
          <div className="space-y-3 sm:space-y-4">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50"
              >
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex-shrink-0">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs sm:text-sm truncate">{performer.name}</h4>
                  <p className="text-xs text-gray-500 truncate">
                    {performer.position} • {performer.department}
                  </p>
                  <p className="text-xs text-yellow-600 font-medium truncate">{performer.achievement}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base sm:text-lg font-bold text-yellow-700">{performer.score}%</div>
                  <p className="text-xs text-gray-500 whitespace-nowrap">Performance Score</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "recent-requests" && (
          <div className="space-y-3 sm:space-y-4">
            {recentRequests.map((request, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50/50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-medium text-xs sm:text-sm">{request.type}</h4>
                    <Badge
                      variant={
                        request.status === "Approved"
                          ? "default"
                          : request.status === "Pending"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 break-words">
                    {request.employee} • {request.details}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400 whitespace-nowrap">{request.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "this-month" && (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            {monthlyStats.map((stat, index) => (
              <div
                key={index}
                className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <stat.icon className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "oklch(0.637 0.237 25.331)" }} />
                  </div>
                  <h4 className="font-medium text-xs sm:text-sm">{stat.title}</h4>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

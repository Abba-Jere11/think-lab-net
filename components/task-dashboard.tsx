"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import AddTaskModal from "./add-task-modal"
import {
  Search,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  Calendar,
  TrendingUp,
  Filter,
  Target,
} from "lucide-react"

export default function TaskDashboard() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Track progress and manage your team's workflow</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Quick search..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Tasks</p>
                  <p className="text-2xl font-bold text-blue-900">24</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-900">18</p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">In Progress</p>
                  <p className="text-2xl font-bold text-orange-900">4</p>
                </div>
                <div className="bg-orange-500 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Overdue</p>
                  <p className="text-2xl font-bold text-red-900">2</p>
                </div>
                <div className="bg-red-500 p-3 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Tasks Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Active Tasks</h2>
              <Button variant="ghost" size="sm" className="text-gray-500">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {/* Task Item 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Website Redesign Project</h3>
                        <p className="text-sm text-gray-600">Update the landing page with new branding guidelines</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                        High Priority
                      </Badge>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
                        Engineering
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-700">SJ</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-green-100 text-green-700">MC</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due Dec 18
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />2 days left
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Task Item 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">API Documentation Update</h3>
                        <p className="text-sm text-gray-600">Review and update API endpoints documentation</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                        Medium
                      </Badge>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
                        Design
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-purple-100 text-purple-700">RK</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due Dec 22
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />6 days left
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Task Item 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">User Testing Session</h3>
                        <p className="text-sm text-gray-600">Conduct usability testing for new features</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                        Low Priority
                      </Badge>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
                        Marketing
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-pink-100 text-pink-700">AL</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-yellow-100 text-yellow-700">TM</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due Dec 16
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Tomorrow
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Activity */}
            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Team Activity
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">SJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Sarah completed <span className="font-medium">Design Review</span>
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-green-100 text-green-700 text-xs">MC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Mike started <span className="font-medium">Backend Integration</span>
                    </p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">RK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Rachel updated <span className="font-medium">API Docs</span>
                    </p>
                    <p className="text-xs text-gray-500">6 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* This Week's Goals */}
            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  This Week's Goals
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">Complete 5 high priority tasks</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">4/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">Review team performance</span>
                  </div>
                  <span className="text-xs text-orange-600 font-medium">Pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">Update project roadmap</span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">In Progress</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Upcoming Deadlines
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-red-900">Security Audit</p>
                    <p className="text-xs text-red-600">Tomorrow</p>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-xs">
                    Critical
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-orange-900">Client Presentation</p>
                    <p className="text-xs text-orange-600">Dec 18</p>
                  </div>
                  <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                    High
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Clock, CheckCircle, Users } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Complete Q4 Performance Reviews",
    priority: "High",
    dueDate: "Dec 15, 2024",
    status: "In Progress",
    assignee: "HR Team",
    progress: 65,
  },
  {
    id: 2,
    title: "Update Employee Handbook",
    priority: "Medium",
    dueDate: "Dec 20, 2024",
    status: "Pending",
    assignee: "Sarah Johnson",
    progress: 20,
  },
  {
    id: 3,
    title: "Organize Team Building Event",
    priority: "Low",
    dueDate: "Jan 10, 2025",
    status: "Planning",
    assignee: "Events Team",
    progress: 45,
  },
  {
    id: 4,
    title: "Process December Payroll",
    priority: "High",
    dueDate: "Dec 28, 2024",
    status: "Completed",
    assignee: "Finance Team",
    progress: 100,
  },
]

export function TasksProjects() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 px-4 sm:px-6">
        <div>
          <CardTitle className="text-base sm:text-lg font-semibold">Tasks & Projects</CardTitle>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Track ongoing projects and deadlines</p>
        </div>
         <Button size="sm" variant="outline" asChild>
            <a href="/dashboard/tasks">View All tasks</a>
          </Button>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 space-y-2 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-xs sm:text-sm mb-2 break-words">{task.title}</h4>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <Badge
                    variant={
                      task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    <span className="truncate">{task.assignee}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <Clock className="h-3 w-3" />
                  <span className="whitespace-nowrap">{task.dueDate}</span>
                </div>
                <Badge
                  variant={task.status === "Completed" ? "default" : "outline"}
                  className="text-xs"
                  style={
                    task.status === "Completed" ? { backgroundColor: "oklch(0.637 0.237 25.331)", color: "white" } : {}
                  }
                >
                  {task.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {task.status}
                </Badge>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${task.progress}%`,
                  backgroundColor: "oklch(0.637 0.237 25.331)",
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium" style={{ color: "oklch(0.637 0.237 25.331)" }}>
                {task.progress}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

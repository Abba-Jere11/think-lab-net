"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Flag, Tag, Clock, FileText, Users, Sparkles } from "lucide-react"

interface AddTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const priorities = [
  { value: "low", label: "Low Priority", color: "bg-green-100 text-green-700 border-green-200" },
  { value: "medium", label: "Medium Priority", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { value: "high", label: "High Priority", color: "bg-red-100 text-red-700 border-red-200" },
]

const departments = [
  { value: "engineering", label: "Engineering", icon: "⚙️" },
  { value: "design", label: "Design", icon: "🎨" },
  { value: "marketing", label: "Marketing", icon: "📢" },
  { value: "sales", label: "Sales", icon: "💼" },
  { value: "hr", label: "Human Resources", icon: "👥" },
  { value: "finance", label: "Finance", icon: "💰" },
  { value: "operations", label: "Operations", icon: "🔧" },
  { value: "legal", label: "Legal", icon: "⚖️" },
]

const teamMembers = [
  { id: "sj", name: "Sarah Johnson", initials: "SJ", color: "bg-blue-100 text-blue-700" },
  { id: "mc", name: "Mike Chen", initials: "MC", color: "bg-green-100 text-green-700" },
  { id: "rk", name: "Rachel Kim", initials: "RK", color: "bg-purple-100 text-purple-700" },
  { id: "al", name: "Alex Lee", initials: "AL", color: "bg-pink-100 text-pink-700" },
  { id: "tm", name: "Tom Miller", initials: "TM", color: "bg-yellow-100 text-yellow-700" },
]

export default function AddTaskModal({ open, onOpenChange }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    department: "",
    assignees: [] as string[],
    dueDate: undefined as Date | undefined,
  })

  const [date, setDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Task created:", { ...formData, dueDate: date })

    // Reset form and close modal
    setFormData({
      title: "",
      description: "",
      priority: "",
      department: "",
      assignees: [],
      dueDate: undefined,
    })
    setDate(undefined)
    onOpenChange(false)
  }

  const toggleAssignee = (memberId: string) => {
    setFormData((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(memberId)
        ? prev.assignees.filter((id) => id !== memberId)
        : [...prev.assignees, memberId],
    }))
  }

  const selectedPriority = priorities.find((p) => p.value === formData.priority)
  const selectedDepartment = departments.find((d) => d.value === formData.department)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
          </div>
          <p className="text-sm text-gray-600">Add a new task to keep your team organized and productive</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="w-4 h-4" />
              Task Title
            </Label>
            <Input
              id="title"
              placeholder="Enter a clear, descriptive task title..."
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="text-base"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="w-4 h-4" />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about what needs to be done..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px] resize-none"
              required
            />
          </div>

          {/* Priority and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Flag className="w-4 h-4" />
                Priority Level
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority">
                    {selectedPriority && (
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${selectedPriority.value === "high" ? "bg-red-500" : selectedPriority.value === "medium" ? "bg-orange-500" : "bg-green-500"}`}
                        ></div>
                        {selectedPriority.label}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${priority.value === "high" ? "bg-red-500" : priority.value === "medium" ? "bg-orange-500" : "bg-green-500"}`}
                        ></div>
                        {priority.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Tag className="w-4 h-4" />
                Department
              </Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select department">
                    {selectedDepartment && (
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{selectedDepartment.icon}</span>
                        <span className="font-medium">{selectedDepartment.label}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value} className="h-12">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{dept.icon}</span>
                        <span className="font-medium">{dept.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Clock className="w-4 h-4" />
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Team Members */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Users className="w-4 h-4" />
              Assign Team Members
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => toggleAssignee(member.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50",
                    formData.assignees.includes(member.id) ? "border-blue-500 bg-blue-50" : "border-gray-200",
                  )}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={`text-xs ${member.color}`}>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  </div>
                  {formData.assignees.includes(member.id) && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {formData.assignees.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">Selected:</span>
                <div className="flex items-center gap-1">
                  {formData.assignees.map((assigneeId) => {
                    const member = teamMembers.find((m) => m.id === assigneeId)
                    return member ? (
                      <Avatar key={assigneeId} className="w-6 h-6">
                        <AvatarFallback className={`text-xs ${member.color}`}>{member.initials}</AvatarFallback>
                      </Avatar>
                    ) : null
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              disabled={!formData.title || !formData.description}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

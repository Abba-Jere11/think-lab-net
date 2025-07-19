import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Welcomebanner() {
  // Mock user data - replace with your actual user data
  const user = {
    name: "Sarah Johnson",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
  }

  return (
    <Card className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200 shadow-sm">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">{user.initials}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user.name}</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium">
                {user.role}
              </Badge>
            </div>
            <p className="text-slate-600 text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-800 hover:bg-white/50">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-800 hover:bg-white/50">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

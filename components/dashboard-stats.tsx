import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Calendar, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { staffApi } from "@/lib/api"

export function DashboardStats() {
  const [totalStaff, setTotalStaff] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  // Fetch total staff count
  useEffect(() => {
    const fetchTotalStaff = async () => {
      try {
        setLoading(true)
        const response = await staffApi.getAllStaff()
        
        if (response.success && response.data) {
          // Calculate total staff from all departments
          const totalCount = Object.values(response.data.staffByDepartment).reduce(
            (total: number, staff: any) => total + staff.length,
            0
          )
          setTotalStaff(totalCount)
        }
      } catch (error) {
        console.error("Error fetching staff data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTotalStaff()
  }, [])

  const stats = [
    {
      title: "Total Employees",
      value: loading ? "..." : totalStaff.toString(),
      change: "+12",
      changeText: "from last month",
      icon: Users,
      trend: "up",
    },
    {
      title: "Present Today",
      value: "231",
      change: "93.5%",
      changeText: "attendance rate",
      icon: UserCheck,
      trend: "up",
    },
    {
      title: "Staff on Leave",
      value: "16",
      change: "8",
      changeText: "pending approval",
      icon: UserX,
      trend: "neutral",
    },
    {
      title: "Upcoming Events",
      value: "5",
      change: "2",
      changeText: "this week",
      icon: Calendar,
      trend: "up",
    },
  ]

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <stat.icon className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "oklch(0.637 0.237 25.331)" }} />
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="flex items-center text-xs sm:text-sm">
              {stat.trend === "up" && (
                <div className="flex items-center text-green-600 mr-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span className="font-medium">{stat.change}</span>
                </div>
              )}
              {stat.trend === "neutral" && <span className="font-medium text-orange-600 mr-2">{stat.change}</span>}
              <span className="text-gray-500 text-xs sm:text-sm">{stat.changeText}</span>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-primary/5 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10"></div>
        </Card>
      ))}
    </div>
  )
}
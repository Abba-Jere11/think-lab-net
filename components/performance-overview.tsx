import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Award, Target, BarChart3 } from "lucide-react"

const departmentPerformance = [
  { dept: "IT", score: 96, trend: "up", change: "+2%", employees: 45 },
  { dept: "Technical", score: 94, trend: "up", change: "+1%", employees: 18 },
  { dept: "Corporate Services", score: 92, trend: "down", change: "-1%", employees: 32 },
  { dept: "Communications", score: 98, trend: "up", change: "+3%", employees: 8 },
  { dept: "Finance", score: 95, trend: "up", change: "+1%", employees: 12 },
]

const performanceMetrics = [
  {
    title: "Overall Performance",
    value: "94.8%",
    change: "+2.1%",
    trend: "up",
    icon: Target,
  },
  {
    title: "Goal Achievement",
    value: "87%",
    change: "+5%",
    trend: "up",
    icon: Award,
  },
  {
    title: "Employee Satisfaction",
    value: "4.6/5",
    change: "+0.2",
    trend: "up",
    icon: TrendingUp,
  },
]

export function PerformanceOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="border-0 shadow-sm md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Department Performance</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Performance scores by department</p>
          </div>
          <Button size="sm" variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Detailed Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentPerformance.map((dept) => (
              <div
                key={dept.dept}
                className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-sm">{dept.dept}</h4>
                    <p className="text-xs text-gray-500">{dept.employees} employees</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold">{dept.score}%</span>
                      {dept.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <span className={`text-xs font-medium ${dept.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {dept.change}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${dept.score}%`,
                      backgroundColor: "oklch(0.637 0.237 25.331)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Key Metrics</CardTitle>
          <p className="text-sm text-gray-500">Company-wide performance indicators</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {performanceMetrics.map((metric, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <metric.icon className="h-4 w-4" style={{ color: "oklch(0.637 0.237 25.331)" }} />
                </div>
                <h4 className="font-medium text-sm">{metric.title}</h4>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="flex items-center gap-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-xs font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change} from last month
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

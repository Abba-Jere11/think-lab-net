import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, MoreHorizontal } from "lucide-react"

export function ModernCharts() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 px-4 sm:px-6">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold">Notice Board</CardTitle>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Track team progress and announcements</p>
          </div>
          <Button variant="ghost" size="icon" className="self-end sm:self-auto">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-xs sm:text-sm truncate">Q4 Performance Reviews</h4>
                  <p className="text-xs text-gray-500">Due Dec 15, 2024</p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full whitespace-nowrap">
                  High Priority
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200/50">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-xs sm:text-sm truncate">Holiday Schedule Updated</h4>
                  <p className="text-xs text-gray-500">Posted today</p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-2">
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap">
                  Announcement
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl border border-orange-200/50">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-xs sm:text-sm truncate">Team Building Event</h4>
                  <p className="text-xs text-gray-500">Planning phase</p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-2">
                <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full whitespace-nowrap">
                  In Progress
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 px-4 sm:px-6">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold">Calendar</CardTitle>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Upcoming leave requests and events</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary self-end sm:self-auto">
            View All <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-xs text-purple-600 font-medium">JUL</span>
                <span className="text-base sm:text-lg font-bold text-purple-700">23</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-xs sm:text-sm truncate">Muhammad Jere - Sick Leave</h4>
                <p className="text-xs text-gray-500">5 days • Approved</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-pink-100/50 rounded-xl border border-pink-200/50">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-xs text-pink-600 font-medium">JUL</span>
                <span className="text-base sm:text-lg font-bold text-pink-700">29</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-xs sm:text-sm truncate">Omar Tor - Annual Leave</h4>
                <p className="text-xs text-gray-500">14 days • Approved</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-xl border border-yellow-200/50">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-xs text-yellow-600 font-medium">Aug</span>
                <span className="text-base sm:text-lg font-bold text-yellow-700">20</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-xs sm:text-sm truncate">Staff Week</h4>
                <p className="text-xs text-gray-500">Company Event • 10:00 AM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

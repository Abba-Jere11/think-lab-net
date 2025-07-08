"use client"


import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"


import { DashboardStats } from "./components/dashboard-stats"
import { ModernCharts } from "./components/modern-charts"
import { TasksProjects } from "./components/tasks-projects"
import { NoticeBoard } from "./components/notice-board"
import { LeaveRequests } from "./components/leave-requests"
import { UpcomingEvents } from "./components/upcoming-events"
import { PerformanceOverview } from "./components/performance-overview"
import { BottomTabs } from "./components/bottom-tabs"
import { AnnouncementsBoard } from "./components/announcements-board"

export default function HRDashboard() {
  return (
    <SidebarProvider>
     
      <SidebarInset>
        

        <main className="flex flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-gray-50/30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Good morning, Jere! 👋</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Here's what's happening today.</p>
            </div>
          </div>

          <DashboardStats />

          <ModernCharts />

          <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
            <TasksProjects />
            <AnnouncementsBoard />
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
            <LeaveRequests />
            <UpcomingEvents />
          </div>

          <PerformanceOverview />

          <BottomTabs />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

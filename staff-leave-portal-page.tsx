// "use client"

// import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
// import { Separator } from "@/components/ui/separator"

// import { StaffLeavePortal } from "./components/staff-leave-portal"

// export default function StaffLeavePortalPage() {
//   return (
//     <SidebarProvider>

//       <SidebarInset>
//         <header className="sticky top-0 flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-3 sm:px-4 z-10">
//           <SidebarTrigger className="-ml-1" />
//           <Separator orientation="vertical" className="mr-2 h-4" />
//           <div className="hidden sm:block">
//             <span className="font-medium text-sm text-gray-900">My Leave Requests</span>
//           </div>
//         </header>

//         <main className="flex flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 lg:p-6 bg-gray-50/30">
//           <StaffLeavePortal />
//         </main>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }

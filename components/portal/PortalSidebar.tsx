"use client";
import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Calendar,
  CalendarCheck,
  Check,
  CircleEllipsis,
  CircleUser,
  Clock,
  Database,
  ExternalLink,
  FileText,
  History,
  Home,
  LayoutGrid,
  LineChart,
  LucideIcon,
  Menu,
  Package,
  Package2,
  RefreshCcw,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Speaker,
  SpeakerIcon,
  Star,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { UserRole } from "@/types/types";
import LogoLogin from "../logo-login";

interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  count?: number;
}


interface RoleLinksMap {
  STAFF: NavLink[];
  PARENT: NavLink[];
  ADMIN: NavLink[];
  SUPER_ADMIN: NavLink[];
  MANAGEMENT:NavLink[];
}
function renderLoggedInUserLinks(role:UserRole):NavLink[]{
    const commonLinks =[
         {
          title: "Dashboard",
          href: "/portal",
          icon: Home,
        },
    ]
    const links:RoleLinksMap = {
        STAFF:[
            {
          title: "Announcemnts",
          href: "/announcementss",
          icon: SpeakerIcon,
          count: 6,
        },
        {
          title: "Departments",
          href: "/departments",
          icon: ShoppingCart,
          
        },
        
        ],
        MANAGEMENT:[
            {
          title: "Announcemnts",
          href: "/dashboard/announcements",
          icon: Home,
        },
        {
          title: "Orders",
          href: "/dashboard/orders",
          icon: ShoppingCart,
          count: 6,
        },
        
        ],
        PARENT:[
            {
          title: "Staffs",
          href: "/dashboard/staffs",
          icon: Home,
        },
        ],
        ADMIN:[
        {
          title: "Orders",
          href: "/dashboard/orders",
          icon: ShoppingCart,
          count: 6,
        },
        {
          title: "Products",
          href: "/dashboard/products",
          icon: Package,
        },
        {
          title: "Customers",
          href: "/dashboard/customers",
          icon: Users,
        },
        {
          title: "Categories",
          href: "/dashboard/categories",
          icon: LayoutGrid,
        },
        {
          title: "Analytics",
          href: "/dashboard/analytics",
          icon: LineChart,
        },  
        ],
        SUPER_ADMIN: [
    { title: "Staff Management", href: "/staff", icon: Users, count: 12 },
    { title: "System Admin", href: "/admin", icon: Shield },
    { title: "Database", href: "/database", icon: Database },
    { title: "Reports", href: "/reports", icon: FileText },
    { title: "Settings", href: "/settings", icon: Settings },
  ]
    }
   return [...commonLinks, ...(links[role] || [])];
}
export default function PortalSidebar({userRole}: {userRole:UserRole}) {
      const sidebarLinks = renderLoggedInUserLinks(userRole);

        const pathname = usePathname();
  return (
     <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 m-2 lg:h-[60px] lg:px-6">
            <LogoLogin/>
           
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarLinks.map((item, i) => {
                const Icon = item.icon;
                const isActive = item.href === pathname;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      isActive && " bg-muted  text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                    {item.count && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {item.count}
                      </Badge>
                    )}
                  </Link>
                );
              })}
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                )}
              >
                
                
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            
          </div>
        </div>
      </div>
  )
}




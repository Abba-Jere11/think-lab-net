"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Users,
  Briefcase,
  MessageSquare,
  DollarSign,
  ClipboardList,
  
  BarChart2,
  
  Bell,
  Shield,
} from "lucide-react";

import Logo from "@/components/logo";

const features = [
  { 
    icon: Users, 
    title: "Employee Management", 
    description: "Comprehensive employee information system for managing profiles, onboarding, and personnel records with ease",
    href: "/features/employee-management"
  },
  { 
    icon: Briefcase, 
    title: "Project Management", 
    description: "Streamline project planning, task assignment, milestone tracking, and deliverable management in one unified system",
    href: "/features/project-management"
  },
  { 
    icon: MessageSquare, 
    title: "Communication Hub", 
    description: "Integrated messaging system with multi-channel notifications for seamless organization-wide communication",
    href: "/features/communication"
  },
  { 
    icon: DollarSign, 
    title: "Financial Management", 
    description: "Complete expense management system with budget tracking, invoicing, and comprehensive financial reporting",
    href: "/features/finance"
  },
  { 
    icon: ClipboardList, 
    title: "HR Management", 
    description: "Efficient tools for managing employee records, performance evaluation, payroll processing, and benefits administration",
    href: "/features/hr-management"
  },
  { 
    icon: BarChart2, 
    title: "Analytics & Reports", 
    description: "Powerful analytics tools for data-driven decisions with customizable reporting and business insights",
    href: "/features/analytics"
  },
  { 
    icon: Bell, 
    title: "Notice Board", 
    description: "Digital announcement board for company news, events, and important updates with targeted distribution",
    href: "/features/announcements"
  },
  { 
    icon: Shield, 
    title: "Security & Access", 
    description: "Role-based access control with data encryption and secure backups for complete peace of mind",
    href: "/features/security"
  }
];

;

export default function SiteHeader() {
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3">
        <div className="container max-w-6xl mx-auto flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">

            <Logo/>
            

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-4">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b">
                        <h4 className="text-lg font-medium">Features</h4>
                        <Link
                          href="/features"
                          className="text-sm text-red-500 hover:underline"
                        >
                          View all
                        </Link>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {features.map((feature, index) => (
                          <Link
                            key={index}
                            href={`/feature/${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block group"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-muted rounded-md group-hover:bg-muted/80">
                                <feature.icon className="h-6 w-6 text-red-500" />
                              </div>
                              <div>
                                <h5 className="font-medium mb-1 group-hover:text-red-500">
                                  {feature.title}
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/learn" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Departments
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/academy" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Company Wiki
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* <Button asChild variant="ghost">
              <Link href={"/login"}>Log in</Link>
            </Button> */}
            <Button>
              <Link href={"/contact-us"}>Contact HR</Link>
            </Button>
          </div>

          {/* Mobile Sheet Menu (no legacyBehavior used here, so it’s already good) */}
        </div>
      </header>
  );
}

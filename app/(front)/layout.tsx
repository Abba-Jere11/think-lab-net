import  SiteHeader  from "@/components/side-header";
import React, { ReactNode } from "react";

export default function FrontLayout({ children }: { children: ReactNode }) {
  return(
    <div>
      
    <SiteHeader />
    {children}
    </div>
    ) 
}


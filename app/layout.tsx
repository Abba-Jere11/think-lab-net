import type { Metadata } from "next";
import {Rethink_Sans } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
// import { ourFileRouter } from "~/app/api/uploadthing/core";
import { Toaster} from 'react-hot-toast';
const Inter = Rethink_Sans({
  subsets: ["latin"],
  display:"swap",
});

import "./globals.css";
import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
  title: "think-net",
  description: "Erp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Inter.className} ${Inter.className} antialiased`}>
          <Toaster 
          position="top-center" reverseOrder={false}/>
      <NextSSRPlugin
      
      routerConfig={extractRouterConfig(ourFileRouter)}
    />
        {children}
      </body>
    </html>
  );
}
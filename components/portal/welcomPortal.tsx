
import React from "react";


import PoratAnalytics from "@/components/portal/PoratAnalytics";
import { getServerUser } from "@/actions/auth";
export function getInitials(name: string | null | undefined): string {
  if (name) {
    // Split the name into an array of words
    const nameParts = name.split(" ");

    // Map each word to its first letter and convert to uppercase
    const initials = nameParts.map((part) => part.charAt(0).toUpperCase());

    // Join the initials to form the final string
    return initials.join("");
  } else {
    return "CN";
  }
}
export interface PatientProps {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  occupation: string;
  dob: string;
}


export default async function WelcomePortal() {
    const user = await getServerUser();
  return (
    <div className="px-8 py-4">
                <div className="flex items-center justify-between">
                  <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
                    Welcome, {user?.name} <br /> {user?.role}
                  </h1>
                  <div className="">
                    <p></p>
                  </div>
                </div>
             <PoratAnalytics/>
              
              </div>
  )
}

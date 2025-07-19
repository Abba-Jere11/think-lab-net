
import { getServerUser } from "@/actions/auth";
import WelcomePortal from "@/components/portal/welcomPortal";
import React from "react";




export default async  function Portal() {
 const user = await getServerUser();
  return (
   <WelcomePortal/>
  );
}

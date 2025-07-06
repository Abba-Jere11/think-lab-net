import { getServerUser } from "@/actions/auth"
import HRDashboard from "@/hr-dashboard"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getServerUser()
  const role =user?.role
  if(!user || role!=="SUPER_ADMIN"){
    redirect("/login")
  }
  return <HRDashboard />
}

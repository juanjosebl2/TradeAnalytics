import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { PageDashboardClient } from "./components/PageMainDashboardClient"

export default async function PageDashboard() {

  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }

  const strategies = await db.strategy.findMany({
    where: {
      isPublic: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return <PageDashboardClient strategies={strategies} />
}
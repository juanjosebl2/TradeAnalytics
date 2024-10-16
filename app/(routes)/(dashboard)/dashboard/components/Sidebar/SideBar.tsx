import { SidebarRoutes } from '../SidebarRoutes'
import { LogoDashboard } from '../LogoDashboard'

export function Sidebar() {
  return (
    <div className='h-screen'>
        <div className='flex flex-col h-full border-r'>
        <LogoDashboard />
        <SidebarRoutes />
        </div>
    </div>
  )
}
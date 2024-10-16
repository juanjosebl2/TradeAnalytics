"use client";

// import { useAuth } from "@clerk/nextjs";
import { dataGeneralSidebar} from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem";
import { Separator } from "@/components/ui/separator";
// import { isAdministrator } from "@/lib/isAdministratos";

export function SidebarRoutes() {
  // const { userId } = useAuth();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6">
          <p className="mb-2 text-slate-500">General</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
        <Separator />
        {/* {isAdministrator(userId) && (
          <div className="p-2 md:p-6">
            <p className="mb-2 text-slate-500">General</p>
            {dataAdminSidebar.map((item) => (
              <SidebarItem key={item.label} item={item} />
            ))}
          </div>
        )} */}
      </div>
      <div>
        <Separator />
        <footer className="p-3 mt-3 text-center">2024 © TradeAnalytics</footer>
      </div>
    </div>
  );
}
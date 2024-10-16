import { Calendar, Car, Heart, SquareChartGantt, NotebookPen } from "lucide-react";

export const dataGeneralSidebar = [
    {
        icon: Car,
        label: "Probador estrategias",
        href: "/dashboard",
    },
    {
        icon: Calendar,
        label: "Estrategias personalizadas",
        href: "/strategy-personality",
    },
    {
        icon: Heart,
        label: "Estrategias favoritas",
        href: "/loved-strategies",
    },
    {
        icon: Heart,
        label: "Historial",
        href: "/history-strategies",
    }
]

export const dataAdminSidebar = [
    {
        icon: SquareChartGantt,
        label: "Administrar estrategias",
        href: "/dashboard/admin/strategy-manager",
    },
    {
        icon: NotebookPen,
        label: "Todas las historias",
        href: "/dashboard/admin/history-admin",
    }
]
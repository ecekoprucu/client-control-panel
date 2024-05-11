import { ROUTE_CLIENTS, ROUTE_DASHBOARD } from "./routes";
// Pages
import { DashboardPage } from "@/views/Dashboard";
import { ClientsPage } from "@/views/Clients";

export const MENU_ITEMS = {
    dashboard: {
        key: 1,
        nameKey: "dashboard",
        path: ROUTE_DASHBOARD,
        isMenuItem: true,
        component: DashboardPage,
    },
    clients: {
        key: 2,
        nameKey: "clients",
        path: ROUTE_CLIENTS,
        isMenuItem: true,
        component: ClientsPage,
    }
}
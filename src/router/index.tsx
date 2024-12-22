import { ROUTE_APP, ROUTE_CLIENTS, ROUTE_LOGIN, ROUTE_ROOT } from "./routes";
// Pages
import { DashboardPage } from "@/views/Dashboard";
import { ClientsPage } from "@/views/Clients";
import { createBrowserRouter } from "react-router-dom";
import RootPage from "@/views/Root";
import MasterPage from "@/views/MasterPage";
import ProtectedRoute from "@/router/ProtectedRoute";

export const routes = createBrowserRouter([
  {
    children: [
      {
        path: ROUTE_LOGIN,
        element: <RootPage />,
      },
      {
        path: ROUTE_ROOT,
        element: <RootPage />,
      },
      {
        path: ROUTE_APP,
        element: (
          <ProtectedRoute>
            <MasterPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
          {
            path: ROUTE_CLIENTS,
            element: <ClientsPage />,
          },
        ],
      },
      {
        path: "*",
        element: <h2>Not Found</h2>,
      },
    ],
  },
]);

import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ROUTE_APP,
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_ROOT,
} from "./router/routes";
import { DashboardPage } from "@/views/Dashboard";
import MasterPage from "@/views/MasterPage";
import ProtectedRoute from "@/router/ProtectedRoute";

const RootPage = lazy(() => import("@/views/Root"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {[ROUTE_ROOT, ROUTE_LOGIN].map((route, index) => (
            <Route key={index} path={route} element={<RootPage />} />
          ))}
          <Route
            path={ROUTE_APP}
            element={
              <ProtectedRoute>
                <MasterPage />
              </ProtectedRoute>
            }
          >
            <Route path={ROUTE_DASHBOARD} element={<DashboardPage />} />
            <Route path="*" element={<h2>Not Found</h2>} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

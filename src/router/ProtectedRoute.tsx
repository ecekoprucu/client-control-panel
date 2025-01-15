// Redux
import { useSelector } from "react-redux";

// Router
import { Navigate, useLocation } from "react-router-dom";
import { ROUTE_LOGIN } from "./routes";

// Helpers
import _ from "lodash";

// Types
import { IRootState } from "@/redux/store";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useSelector((state: IRootState) => state?.auth?.user);
  const storedUser = JSON.parse(localStorage.getItem("user") ?? "{}");

  const { pathname } = useLocation();

  if (_.isEmpty(user) && _.isEmpty(storedUser)) {
    return (
      <Navigate to={ROUTE_LOGIN} state={{ redirectPath: pathname }} replace />
    );
  }

  return children;
}

export default ProtectedRoute;

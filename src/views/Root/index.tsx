// Router
import { Navigate, useLocation } from "react-router-dom";
import { ROUTE_APP } from "@/router/routes";
// Redux
import { useSelector } from "react-redux";
// Helpers
import _ from "lodash";
// Components
import { LoginPage } from "@/views/Login";
import { IRootState } from "@/redux/store";

const RootPage = () => {
    const user = useSelector((state: IRootState) => state.auth.user);
    const storedUser = JSON.parse(localStorage.getItem("user") ?? "{}");

    const location = useLocation();

    if (_.isEmpty(user) && _.isEmpty(storedUser)) {
        return <LoginPage />;
    }
    
    <Navigate to={location.state?.from || location.state?.redirectPath || ROUTE_APP} replace />;
    
}

export default RootPage;
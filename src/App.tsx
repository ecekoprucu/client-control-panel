import "./App.css";
import { RouterProvider } from "react-router-dom";

import { routes } from "@/router";
import { CircularProgress } from "@mui/material";

function App() {
  return (
    <RouterProvider router={routes} fallbackElement={<CircularProgress />} />
  );
}

export default App;

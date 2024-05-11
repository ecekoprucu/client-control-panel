import { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_LOGIN, ROUTE_ROOT } from './router/routes';

const RootPage = lazy(() => import('@/views/Root'));

function App() {
  return (
   <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {[ROUTE_ROOT, ROUTE_LOGIN].map((route, index) => (
            <Route key={index} path={route} element={<RootPage />} />
          ))}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App

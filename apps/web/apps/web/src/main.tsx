import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AuthLayout } from './routes/auth/index.tsx';
import { Login } from './routes/auth/login.tsx';
import { Register } from './routes/auth/register.tsx';
import { Home } from './routes/home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },

        ]}
    ]
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
)

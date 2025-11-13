import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import type { JSX } from "react";
import { pbClient } from "./api/client";

function RequireAuth({ children }: { children: JSX.Element }) {
  const isLoggedIn = pbClient.authStore.token || localStorage.getItem("pb_auth_token");
  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<Login />} />
      </Route>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;

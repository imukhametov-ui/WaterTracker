import { Navigate, Route, Routes } from "react-router-dom";

import SharedLayout from "./layouts/SharedLayout";
import WelcomePage from "./pages/WelcomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="/welcome" replace />} />

        <Route path="welcome" element={<WelcomePage />} />

        <Route element={<PublicRoute />}>
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="home" element={<HomePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}
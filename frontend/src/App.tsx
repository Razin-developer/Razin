import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ForgotPage from "./pages/ForgotPage";
import ForgotVerifyPage from "./pages/ForgotVerifyPage";
import ResetPage from "./pages/ResetPage";
import Footer from "./components/Footer";
import SkillsPage from "./pages/SkillsPage";
import WorksPage from "./pages/WorksPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

import "./App.css";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/forgot" element={!authUser ? <ForgotPage /> : <Navigate to="/" />} />
        <Route path="/forgot/verify" element={!authUser ? <ForgotVerifyPage /> : <Navigate to="/" />} />
        <Route path="/reset" element={authUser ? <ResetPage /> : <Navigate to="/" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />

      <Toaster />
    </div>
  );
};
export default App;

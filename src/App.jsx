import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import AOS from "aos";
import Home from "./pages/Home";
import AlumniDashboard from "./pages/AlumniDashboard";
import VideoGallery from "./pages/VideoGallery";
import User from "./pages/User";
import Permission from "./pages/Permission";
import Role from "./pages/Role";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/services" element={<VideoGallery />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<AlumniDashboard />} />
            <Route path="/dashboard/users" element={<User />} />
            <Route path="/dashboard/role" element={<Role />} />
            <Route path="/dashboard/permission" element={<Permission />} />
            <Route path="/dashboard/alumni" element={<AlumniDashboard />} />
            <Route path="/dashboard/events" element={<AlumniDashboard />} />
            <Route path="/dashboard/jobs" element={<AlumniDashboard />} />
            <Route path="/dashboard/messages" element={<AlumniDashboard />} />
            <Route path="/dashboard/profile" element={<AlumniDashboard />} />
            <Route path="/dashboard/settings" element={<AlumniDashboard />} />
            
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

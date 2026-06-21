import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import AOS from "aos";
import Home from "./pages/Home";
import AlumniDashboard from "./pages/AlumniDashboard";

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
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<AlumniDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App

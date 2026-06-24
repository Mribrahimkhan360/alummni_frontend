import { Navigate, Outlet } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const [user, , { loading }] = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <ScaleLoader color="#0E2A47" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

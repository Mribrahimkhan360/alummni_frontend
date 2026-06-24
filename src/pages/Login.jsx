import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { notifyMessage, notifyError } from "../utils/notify";
import { ScaleLoader } from "react-spinners";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [user, updateAuthState] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login", { email, password });
      if (response.status === 200) {
        notifyMessage("Login successful!");
        updateAuthState(response.data);
        navigate("/dashboard");
        console.log("Login successful:", response.data);
        // Handle successful login (e.g., redirect, store token)
      }
    } catch (err) {
      notifyError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {loading ? (
            <button
              type="button"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
              disabled
            >
              <ScaleLoader
                height={20}
                width={3}
                radius={2}
                margin={2}
                color="#ffffff"
              />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          )}
        </form>
        <div className="text-sm text-center">
          <div>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
          <div>
            Forgot your password?{" "}
            <Link
              to="/reset-password"
              className="text-blue-600 hover:underline"
            >
              Reset it
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

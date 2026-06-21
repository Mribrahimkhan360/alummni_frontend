import React, {createContext,useContext, useEffect, useState} from 'react'
import api from '../api/api';

const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return [context.user, context.updateAuthState, context];
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
  useEffect(() => {
    // Check if the user is already logged in
    checkAuth(); 
  }, []);

  const checkAuth = async () => {
    try {
     const token = localStorage.getItem('access_token');
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get("/user");
          setUser(response.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
          localStorage.removeItem('token_type');
          localStorage.removeItem('access_token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
      clearAuthState();
    }
    setLoading(false);
  };
  const clearAuthState = ()=>{
    localStorage.removeItem('token_type');
    localStorage.removeItem('access_token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  }

    const updateAuthState = (data) => {
        localStorage.setItem('token_type', data.token_type);
        localStorage.setItem('access_token', data.access_token);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        setUser(data.user);
    }

    return (
        <AuthContext.Provider value={{ user, loading, updateAuthState,checkAuth,clearAuthState }}>
            {children}
        </AuthContext.Provider>
    );
}

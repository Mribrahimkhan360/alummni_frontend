import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopHeader() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="bg-[#161f37] hidden md:block">
            <div className="flex flex-col md:flex-row items-center justify-between text-white max-w-7xl mx-auto px-4">
                <div className="flex items-center text-white">
                    <div className="mr-4">
                        <span className="font-bold">Email</span> : <span className="font-normal">info@alumni.org</span>
                    </div>
                    <div>
                        <span className="font-bold">Phone</span> : <span className="font-normal">+1 (123) 456-7890</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    {user ? (
                        <>
                            <div className="bg-blue-600 transition duration-300 py-2 hover:bg-blue-700 px-4 cursor-pointer">
                                <Link to="/dashboard">Dashboard</Link>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 transition duration-300 py-2 hover:bg-red-600 px-4 cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="bg-blue-600 transition duration-300 py-2 hover:bg-blue-700 px-4 cursor-pointer">
                                <Link to="/login">Login</Link>
                            </div>
                            <div className="bg-green-500 transition duration-300 py-2 hover:bg-green-600 px-4 cursor-pointer">
                                <Link to="/signup">Signup</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

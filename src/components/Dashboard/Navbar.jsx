import { Bell, ChevronDown, Menu, LogOut, User, Settings } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onMenuClick }) {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-20 h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-800 flex-shrink-0">
                    <Menu size={22} />
                </button>
                <div>
                    <h1 className="text-[20px] sm:text-[22px] font-semibold truncate text-gray-900">
                        Welcome back, {user?.name || 'User'}
                    </h1>
                    <p className="text-[13px] hidden sm:block text-gray-500">
                        Here&apos;s what&apos;s happening in your alumni network
                    </p>
                </div>
            </div>

            <div className="hidden md:flex items-center relative w-64 lg:w-80">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-full text-sm outline-none border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                />
            </div>

            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                <button className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
                    <Bell size={19} className="text-gray-600" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-yellow-500 ring-2 ring-white" />
                </button>
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100"
                    >
                        <img
                            src="https://i.pravatar.cc/64?img=47"
                            alt="avatar"
                            className="w-9 h-9 rounded-full object-cover border-2 border-yellow-400"
                        />
                        <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
                        <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
                    </button>
                    {dropdownOpen && (
                        <>
                            <div onClick={() => setDropdownOpen(false)} className="fixed inset-0 z-10" />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-20">
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2.5"
                                    onClick={() => { setDropdownOpen(false); navigate('/dashboard/profile'); }}
                                >
                                    <User size={15} /> Your Profile
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2.5"
                                    onClick={() => { setDropdownOpen(false); navigate('/dashboard/settings'); }}
                                >
                                    <Settings size={15} /> Account Settings
                                </button>
                                <div className="mx-3 my-1 border-t border-gray-100" />
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5"
                                >
                                    <LogOut size={15} /> Sign out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

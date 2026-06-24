import { Bell, ChevronDown, Menu, Search, LogOut, User, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onMenuClick }) {
  const [user, , { clearAuthState }] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    clearAuthState();
  };

  return (
    <header className="sticky top-0 z-20 h-20 bg-surface/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-800 flex-shrink-0">
          <Menu size={22} />
        </button>
        <div>
          <h1 className="text-[20px] sm:text-[22px] font-heading font-semibold truncate text-text-primary">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-[13px] hidden sm:block text-text-muted">
            Here's what's happening in your alumni network
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center relative w-64 lg:w-80">
        <Search size={16} className="absolute left-3 text-text-light pointer-events-none" />
        <input
          type="text"
          placeholder="Search alumni, events, jobs..."
          className="w-full pl-9 pr-3 py-2.5 rounded-full text-sm outline-none border border-border bg-neutral-bg text-text-primary placeholder:text-text-light transition-all duration-200 focus:border-navy focus:bg-surface focus:shadow-sm"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <button className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-neutral-bg">
          <Bell size={19} className="text-text-secondary" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-gold ring-2 ring-surface animate-pulse-dot" />
        </button>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full transition-colors duration-200 hover:bg-neutral-bg"
          >
            <img
              src="https://i.pravatar.cc/64?img=47"
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-gold-tint"
            />
            <ChevronDown size={16} className="text-text-muted hidden sm:block" />
          </button>
          {dropdownOpen && (
            <>
              <div onClick={() => setDropdownOpen(false)} className="fixed inset-0 z-10" />
              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-xl shadow-card-hover border border-border py-1.5 z-20 animate-fade-in">
                <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-neutral-bg transition-colors duration-200 flex items-center gap-2.5">
                  <User size={15} className="text-text-light" /> Your Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-neutral-bg transition-colors duration-200 flex items-center gap-2.5">
                  <Settings size={15} className="text-text-light" /> Account Settings
                </button>
                <div className="mx-3 my-1 border-t border-border" />
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2.5"
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

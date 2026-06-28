import { Briefcase, Calendar, GraduationCap, LayoutDashboard, MessageSquare, Settings, User, Users, X, Sparkles, Key, Shield, CreditCard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ open, onClose }) {
  const { hasPermission } = useAuth();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    ...(hasPermission("user-list") ? [{ label: "User", icon: Users, path: "/dashboard/users" }] : []),
    ...(hasPermission("role-list") ? [{ label: "Role", icon: Shield, path: "/dashboard/role" }] : []),
    ...(hasPermission("permission-list") ? [{ label: "Permission", icon: Key, path: "/dashboard/permission" }] : []),
    // { label: "Alumni Directory", icon: Users, path: "/dashboard/alumni" },
    // { label: "Events", icon: Calendar, path: "/dashboard/events" },
    // { label: "Jobs", icon: Briefcase, path: "/dashboard/jobs" },
    { label: "Payment", icon: CreditCard, path: "/dashboard/payment", badge: 3 },
    { label: "Profile", icon: User, path: "/dashboard/profile" },
    { label: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];
  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/30 z-30 lg:hidden backdrop-blur-sm" />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-surface border-r border-border z-40 flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:shadow-card`}>
        <div className="flex items-center gap-3 px-6 h-20 border-b border-border">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy to-navy-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
            <GraduationCap size={20} className="text-gold-tint" />
          </div>
          <div className="leading-tight">
            <p className="font-heading font-semibold text-[15px] text-text-primary">Alumni Hub</p>
            <p className="text-xs text-text-muted">Westfield University</p>
          </div>
          <button onClick={onClose} className="ml-auto lg:hidden text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                end={item.path === "/dashboard"}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-navy-tint text-navy"
                      : "text-text-secondary hover:bg-neutral-bg hover:text-text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-gradient-to-b from-gold to-navy" />
                    )}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? "bg-navy text-gold-tint shadow-sm"
                        : "text-text-muted group-hover:bg-navy-tint"
                    }`}>
                      <Icon size={16} />
                    </div>
                    <span className={isActive ? "font-semibold" : ""}>{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto text-[11px] font-semibold min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center ${
                        isActive ? "bg-gold text-navy" : "bg-navy-tint text-navy-secondary"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 m-3 mb-5 rounded-xl bg-gradient-to-br from-navy to-navy-secondary shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-gold-tint" />
            <p className="text-[13px] font-heading font-semibold text-gold-tint">Give back</p>
          </div>
          <p className="text-xs leading-relaxed text-white/70">Share your experience with current students.</p>
          <button className="mt-3 text-xs font-semibold px-4 py-2.5 rounded-lg w-full bg-gold text-navy transition-all duration-200 hover:bg-gold/90 active:scale-[0.98]">
            Become a Mentor
          </button>
        </div>
      </aside>
    </>
  );
}

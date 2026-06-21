import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  User,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  MapPin,
  ArrowUpRight,
  GraduationCap,
  TrendingUp,
  UserPlus,
  Building2,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ---------------------------------------------------------
   DESIGN TOKENS
   Navy:  #0E2A47 (primary), #16385C (secondary), #EAF0F6 (tint)
   Gold:  #C99A3D (accent), #F4E3B8 (gold tint)
   Neutral: #F6F7F9 (bg), #FFFFFF (surface), #E4E8EE (border)
   Text: #16213A (primary), #5B677A (muted)
   Display face: Poppins (headings) / Body: Inter
--------------------------------------------------------- */

const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Alumni Directory", icon: Users },
  { label: "Events", icon: Calendar },
  { label: "Jobs", icon: Briefcase },
  { label: "Messages", icon: MessageSquare, badge: 3 },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
];

const statCards = [
  { label: "Total Alumni", value: "24,850", delta: "+4.2%", icon: GraduationCap },
  { label: "Active Members", value: "8,320", delta: "+1.8%", icon: Users },
  { label: "New Members", value: "142", delta: "+12.6%", icon: UserPlus },
  { label: "Upcoming Events", value: "6", delta: "This month", icon: Calendar, neutral: true },
];

const upcomingEvents = [
  { date: "JUN 28", title: "Homecoming Networking Mixer", location: "Grand Hall, Main Campus" },
  { date: "JUL 04", title: "Class of 2016 Reunion Dinner", location: "Heritage Ballroom" },
  { date: "JUL 12", title: "Alumni Career Fair 2026", location: "Innovation Center" },
];

const jobPostings = [
  { role: "Senior Product Manager", company: "Meridian Analytics", location: "Remote", posted: "2d ago", tag: "Full-time" },
  { role: "Structural Engineer", company: "Harlow & Voss", location: "Boston, MA", posted: "3d ago", tag: "Full-time" },
  { role: "UX Research Lead", company: "Northbridge Labs", location: "Hybrid", posted: "5d ago", tag: "Contract" },
];

const messages = [
  { name: "Dr. Amara Whitfield", text: "Looking forward to the panel next week!", time: "9:42 AM", unread: true },
  { name: "Career Services", text: "Your mentorship request was approved.", time: "Yesterday", unread: true },
  { name: "James Okafor", text: "Thanks for connecting at the mixer.", time: "Mon", unread: false },
];

const engagementData = [
  { month: "Jan", active: 5200 },
  { month: "Feb", active: 5600 },
  { month: "Mar", active: 6100 },
  { month: "Apr", active: 6700 },
  { month: "May", active: 7400 },
  { month: "Jun", active: 8320 },
];

const eventAttendanceData = [
  { name: "Reunions", value: 420 },
  { name: "Career Fairs", value: 680 },
  { name: "Webinars", value: 310 },
  { name: "Mixers", value: 540 },
  { name: "Galas", value: 260 },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-40 flex flex-col transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{ borderColor: "#E4E8EE" }}
      >
        <div className="flex items-center gap-3 px-6 h-20 border-b" style={{ borderColor: "#E4E8EE" }}>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#0E2A47" }}
          >
            <GraduationCap size={20} color="#F4E3B8" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-[15px]" style={{ fontFamily: "Poppins, sans-serif", color: "#16213A" }}>
              Alumni Hub
            </p>
            <p className="text-xs" style={{ color: "#5B677A" }}>Westfield University</p>
          </div>
          <button onClick={onClose} className="ml-auto lg:hidden text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors duration-200 group"
                style={{
                  background: item.active ? "#0E2A47" : "transparent",
                  color: item.active ? "#FFFFFF" : "#3D4A5C",
                }}
                onMouseEnter={(e) => {
                  if (!item.active) e.currentTarget.style.background = "#F6F7F9";
                }}
                onMouseLeave={(e) => {
                  if (!item.active) e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon size={18} color={item.active ? "#F4E3B8" : "#5B677A"} />
                <span style={{ fontFamily: "Inter, sans-serif" }}>{item.label}</span>
                {item.badge && (
                  <span
                    className="ml-auto text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: item.active ? "#C99A3D" : "#EAF0F6", color: item.active ? "#16213A" : "#16385C" }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 m-3 mb-5 rounded-xl" style={{ background: "#EAF0F6" }}>
          <p className="text-[13px] font-semibold" style={{ color: "#16213A", fontFamily: "Poppins, sans-serif" }}>
            Give back, mentor on
          </p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "#5B677A" }}>
            Share your experience with current students.
          </p>
          <button
            className="mt-3 text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-200"
            style={{ background: "#0E2A47", color: "#F4E3B8" }}
          >
            Become a Mentor
          </button>
        </div>
      </aside>
    </>
  );
}

function Navbar({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-20 h-20 bg-white border-b flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4"
      style={{ borderColor: "#E4E8EE" }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-800 flex-shrink-0">
          <Menu size={22} />
        </button>
        <div>
          <h1
            className="text-[20px] sm:text-[22px] font-semibold truncate"
            style={{ fontFamily: "Poppins, sans-serif", color: "#16213A" }}
          >
            Welcome back, Elena
          </h1>
          <p className="text-[13px] hidden sm:block" style={{ color: "#5B677A" }}>
            Here's what's happening in your alumni network
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center relative w-64 lg:w-80">
        <Search size={16} className="absolute left-3" color="#8C97A8" />
        <input
          type="text"
          placeholder="Search alumni, events, jobs..."
          className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-colors duration-200 focus:border-[#0E2A47]"
          style={{ background: "#F6F7F9", borderColor: "#E4E8EE", color: "#16213A" }}
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <button className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[#F6F7F9]">
          <Bell size={19} color="#3D4A5C" />
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full"
            style={{ background: "#C99A3D" }}
          />
        </button>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full transition-colors duration-200 hover:bg-[#F6F7F9]"
          >
            <img
              src="https://i.pravatar.cc/64?img=47"
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
              style={{ border: "2px solid #F4E3B8" }}
            />
            <ChevronDown size={16} color="#5B677A" className="hidden sm:block" />
          </button>
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-30"
              style={{ borderColor: "#E4E8EE" }}
            >
              {["Your Profile", "Account Settings", "Sign out"].map((opt) => (
                <button
                  key={opt}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F7F9] transition-colors duration-200"
                  style={{ color: "#3D4A5C" }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function StatCard({ label, value, delta, icon: Icon, neutral }) {
  return (
    <div
      className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ borderColor: "#E4E8EE" }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: "#EAF0F6" }}
        >
          <Icon size={20} color="#16385C" />
        </div>
        <span
          className="text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1"
          style={{
            background: neutral ? "#F6F7F9" : "#FBF1DC",
            color: neutral ? "#5B677A" : "#9C7726",
          }}
        >
          {!neutral && <TrendingUp size={11} />}
          {delta}
        </span>
      </div>
      <p className="mt-4 text-[26px] font-semibold" style={{ fontFamily: "Poppins, sans-serif", color: "#16213A" }}>
        {value}
      </p>
      <p className="text-[13px] mt-1" style={{ color: "#5B677A" }}>
        {label}
      </p>
    </div>
  );
}

function SectionCard({ title, action, children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm p-5 sm:p-6 ${className}`}
      style={{ borderColor: "#E4E8EE" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold" style={{ fontFamily: "Poppins, sans-serif", color: "#16213A" }}>
          {title}
        </h2>
        {action && (
          <button
            className="text-xs font-semibold flex items-center gap-1 transition-colors duration-200"
            style={{ color: "#16385C" }}
          >
            {action} <ChevronRight size={14} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function EventsCard() {
  return (
    <SectionCard title="Upcoming Events" action="View all">
      <div className="space-y-3">
        {upcomingEvents.map((ev) => (
          <div
            key={ev.title}
            className="flex items-center gap-4 p-3 rounded-xl border transition-colors duration-200 hover:bg-[#F6F7F9]"
            style={{ borderColor: "#E4E8EE" }}
          >
            <div
              className="flex flex-col items-center justify-center w-14 h-14 rounded-lg flex-shrink-0"
              style={{ background: "#0E2A47" }}
            >
              <span className="text-[10px] font-semibold" style={{ color: "#F4E3B8" }}>
                {ev.date.split(" ")[0]}
              </span>
              <span className="text-[16px] font-bold text-white leading-none">
                {ev.date.split(" ")[1]}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium truncate" style={{ color: "#16213A" }}>
                {ev.title}
              </p>
              <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "#5B677A" }}>
                <MapPin size={12} /> {ev.location}
              </p>
            </div>
            <button
              className="text-xs font-semibold px-3 py-2 rounded-lg flex-shrink-0 transition-colors duration-200"
              style={{ background: "#EAF0F6", color: "#16385C" }}
            >
              RSVP
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function JobsCard() {
  return (
    <SectionCard title="Recent Job Postings" action="Browse jobs">
      <div className="space-y-3">
        {jobPostings.map((job) => (
          <div
            key={job.role}
            className="flex items-center gap-4 p-3 rounded-xl border transition-colors duration-200 hover:bg-[#F6F7F9]"
            style={{ borderColor: "#E4E8EE" }}
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#FBF1DC" }}
            >
              <Building2 size={18} color="#9C7726" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium truncate" style={{ color: "#16213A" }}>
                {job.role}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#5B677A" }}>
                {job.company} &middot; {job.location}
              </p>
            </div>
            <div className="text-right flex-shrink-0 hidden sm:block">
              <span
                className="text-[11px] font-semibold px-2 py-1 rounded-full"
                style={{ background: "#EAF0F6", color: "#16385C" }}
              >
                {job.tag}
              </span>
              <p className="text-[11px] mt-1 flex items-center gap-1 justify-end" style={{ color: "#8C97A8" }}>
                <Clock size={11} /> {job.posted}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SpotlightCard() {
  return (
    <SectionCard title="Alumni Spotlight">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://i.pravatar.cc/200?img=32"
          alt="featured alumni"
          className="w-20 h-20 rounded-full object-cover"
          style={{ border: "3px solid #F4E3B8" }}
        />
        <p className="mt-3 font-semibold text-[15px]" style={{ fontFamily: "Poppins, sans-serif", color: "#16213A" }}>
          Marcus Chen
        </p>
        <p className="text-xs" style={{ color: "#5B677A" }}>
          Class of 2014 &middot; VP of Engineering, Solara Inc.
        </p>
        <p className="text-[13px] mt-3 leading-relaxed" style={{ color: "#3D4A5C" }}>
          "Westfield's network opened doors I didn't know existed. Now I mentor three students each semester."
        </p>
        <button
          className="mt-4 text-xs font-semibold px-4 py-2.5 rounded-lg w-full transition-colors duration-200 flex items-center justify-center gap-1"
          style={{ background: "#0E2A47", color: "#F4E3B8" }}
        >
          View Full Profile <ArrowUpRight size={13} />
        </button>
      </div>
    </SectionCard>
  );
}

function MessagesCard() {
  return (
    <SectionCard title="Messages & Notifications" action="Open inbox">
      <div className="space-y-1">
        {messages.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-3 p-2.5 rounded-xl transition-colors duration-200 hover:bg-[#F6F7F9] cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold"
                style={{ background: "#EAF0F6", color: "#16385C" }}
              >
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              {m.unread && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                  style={{ background: "#C99A3D" }}
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium truncate" style={{ color: "#16213A" }}>
                {m.name}
              </p>
              <p className="text-xs truncate" style={{ color: "#5B677A" }}>
                {m.text}
              </p>
            </div>
            <span className="text-[11px] flex-shrink-0" style={{ color: "#8C97A8" }}>
              {m.time}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function AnalyticsSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <SectionCard title="Alumni Engagement Trend">
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <LineChart data={engagementData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#EEF1F5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8C97A8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#8C97A8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #E4E8EE", fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#0E2A47"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#C99A3D" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Event Attendance by Category">
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={eventAttendanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#EEF1F5" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#8C97A8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#8C97A8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #E4E8EE", fontSize: 12 }}
                cursor={{ fill: "#F6F7F9" }}
              />
              <Bar dataKey="value" fill="#C99A3D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}

export default function AlumniDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#F6F7F9" }} className="min-h-screen">
      <FontLoader />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-5">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {statCards.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Events + Jobs + Spotlight */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2 space-y-5">
              <EventsCard />
              <JobsCard />
            </div>
            <div className="space-y-5">
              <SpotlightCard />
              <MessagesCard />
            </div>
          </div>

          {/* Analytics */}
          <AnalyticsSection />

          <footer className="text-center text-xs py-4" style={{ color: "#8C97A8" }}>
            Westfield University Alumni Network &middot; © 2026
          </footer>
        </main>
      </div>
    </div>
  );
}
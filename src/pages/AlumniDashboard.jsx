import { Calendar, GraduationCap, UserPlus, Users } from "lucide-react";
import AnalyticsSection from "../components/Dashboard/AnalyticsSection";
import EventsCard from "../components/Dashboard/EventsCard";
import JobsCard from "../components/Dashboard/JobsCard";
import MessagesCard from "../components/Dashboard/MessagesCard";
import SpotlightCard from "../components/Dashboard/SpotlightCard";
import StatCard from "../components/Dashboard/StatCard";

const statCards = [
  { label: "Total Alumni", value: "24,850", delta: "+4.2%", icon: GraduationCap },
  { label: "Active Members", value: "8,320", delta: "+1.8%", icon: Users },
  { label: "New Members", value: "142", delta: "+12.6%", icon: UserPlus },
  { label: "Upcoming Events", value: "6", delta: "This month", icon: Calendar, neutral: true },
];

export default function AlumniDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((s, i) => (
          <div key={s.label} style={{ animationDelay: `${i * 80}ms` }}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

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

      <AnalyticsSection />

      <footer className="text-center text-xs py-6 text-text-light border-t border-border">
        Ibrahim Khan &middot; &copy; 2026
      </footer>
    </div>
  );
}

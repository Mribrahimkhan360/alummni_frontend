import { MapPin } from "lucide-react";
import SectionCard from "./SectionCard";

const upcomingEvents = [
  { date: "JUN 28", title: "Homecoming Networking Mixer", location: "Grand Hall, Main Campus" },
  { date: "JUL 04", title: "Class of 2016 Reunion Dinner", location: "Heritage Ballroom" },
  { date: "JUL 12", title: "Alumni Career Fair 2026", location: "Innovation Center" },
];

export default function EventsCard() {
  return (
    <SectionCard title="Upcoming Events" action="View all">
      <div className="space-y-3">
        {upcomingEvents.map((ev) => (
          <div key={ev.title} className="flex items-center gap-4 p-3 rounded-xl border border-border transition-all duration-200 hover:bg-neutral-bg hover:border-gold-tint hover:shadow-sm">
            <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-b from-navy to-navy-secondary flex-shrink-0 shadow-sm">
              <span className="text-[10px] font-semibold text-gold-tint">{ev.date.split(" ")[0]}</span>
              <span className="text-[16px] font-bold text-white leading-none">{ev.date.split(" ")[1]}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium truncate text-text-primary">{ev.title}</p>
              <p className="text-xs flex items-center gap-1 mt-0.5 text-text-muted">
                <MapPin size={12} /> {ev.location}
              </p>
            </div>
            <button className="text-xs font-semibold px-3 py-2 rounded-lg bg-navy-tint text-navy-secondary flex-shrink-0 transition-all duration-200 hover:bg-navy hover:text-white active:scale-95">
              RSVP
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

import SectionCard from "./SectionCard";

const messages = [
  { name: "Dr. Amara Whitfield", text: "Looking forward to the panel next week!", time: "9:42 AM", unread: true },
  { name: "Career Services", text: "Your mentorship request was approved.", time: "Yesterday", unread: true },
  { name: "James Okafor", text: "Thanks for connecting at the mixer.", time: "Mon", unread: false },
];

const initials = (name) =>
  name.split(" ").map((n) => n[0]).join("");

const bgColors = [
  "from-navy to-navy-secondary",
  "from-gold to-[#B8892D]",
  "from-navy-secondary to-navy",
];

export default function MessagesCard() {
  return (
    <SectionCard title="Messages & Notifications" action="Open inbox">
      <div className="space-y-1">
        {messages.map((m, i) => (
          <div key={m.name} className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 hover:bg-neutral-bg cursor-pointer">
            <div className="relative flex-shrink-0">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${bgColors[i % bgColors.length]} flex items-center justify-center text-[13px] font-semibold text-white shadow-sm`}>
                {initials(m.name)}
              </div>
              {m.unread && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-surface bg-gold animate-pulse-dot" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-[13px] truncate ${m.unread ? "font-semibold text-text-primary" : "font-medium text-text-secondary"}`}>{m.name}</p>
              <p className="text-xs truncate text-text-muted">{m.text}</p>
            </div>
            <span className={`text-[11px] flex-shrink-0 ${m.unread ? "font-medium text-text-muted" : "text-text-light"}`}>{m.time}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

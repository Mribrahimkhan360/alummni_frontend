import { ArrowUpRight, Quote } from "lucide-react";
import SectionCard from "./SectionCard";

export default function SpotlightCard() {
  return (
    <SectionCard title="Alumni Spotlight">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/200?img=32"
            alt="featured alumni"
            className="w-20 h-20 rounded-full object-cover border-[3px] border-gold-tint shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gold flex items-center justify-center shadow-sm">
            <Quote size={10} className="text-white" />
          </div>
        </div>
        <p className="mt-3 font-heading font-semibold text-[15px] text-text-primary">Marcus Chen</p>
        <p className="text-xs text-text-muted">Class of 2014 &middot; VP of Engineering, Solara Inc.</p>
        <div className="relative mt-3 pl-4 border-l-2 border-gold">
          <p className="text-[13px] leading-relaxed text-text-secondary text-left">
            "Westfield's network opened doors I didn't know existed. Now I mentor three students each semester."
          </p>
        </div>
        <button className="mt-4 text-xs font-semibold px-4 py-2.5 rounded-lg w-full bg-navy text-gold-tint transition-all duration-200 hover:bg-navy-secondary active:scale-[0.98] flex items-center justify-center gap-1 shadow-sm">
          View Full Profile <ArrowUpRight size={13} />
        </button>
      </div>
    </SectionCard>
  );
}

import { Building2, Clock } from "lucide-react";
import SectionCard from "./SectionCard";

const jobPostings = [
  { role: "Senior Product Manager", company: "Meridian Analytics", location: "Remote", posted: "2d ago", tag: "Full-time" },
  { role: "Structural Engineer", company: "Harlow & Voss", location: "Boston, MA", posted: "3d ago", tag: "Full-time" },
  { role: "UX Research Lead", company: "Northbridge Labs", location: "Hybrid", posted: "5d ago", tag: "Contract" },
];

export default function JobsCard() {
  return (
    <SectionCard title="Recent Job Postings" action="Browse jobs">
      <div className="space-y-3">
        {jobPostings.map((job) => (
          <div key={job.role} className="flex items-center gap-4 p-3 rounded-xl border border-border transition-all duration-200 hover:bg-neutral-bg hover:border-gold-tint hover:shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#FBF1DC] to-[#F4E3B8] flex items-center justify-center flex-shrink-0">
              <Building2 size={18} className="text-[#9C7726]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium truncate text-text-primary">{job.role}</p>
              <p className="text-xs mt-0.5 text-text-muted">{job.company} &middot; {job.location}</p>
            </div>
            <div className="text-right flex-shrink-0 hidden sm:block">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-navy-tint text-navy-secondary shadow-sm">{job.tag}</span>
              <p className="text-[11px] mt-1.5 flex items-center gap-1 justify-end text-text-light">
                <Clock size={11} /> {job.posted}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

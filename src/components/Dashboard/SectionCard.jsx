import { ChevronRight } from "lucide-react";

export default function SectionCard({ title, action, children, className = "" }) {
  return (
    <div className={`bg-surface rounded-2xl border border-border shadow-card p-5 sm:p-6 transition-shadow duration-300 hover:shadow-card-hover ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-heading font-semibold text-text-primary">
          {title}
        </h2>
        {action && (
          <button className="text-xs font-semibold flex items-center gap-1 text-navy-secondary transition-colors duration-200 hover:text-navy">
            {action} <ChevronRight size={14} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

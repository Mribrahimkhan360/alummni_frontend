import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

function AnimatedValue({ value }) {
  const raw = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9,]/g, "");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 600;
    const step = Math.ceil(raw / (duration / 16));
    let raf;

    function tick() {
      start += step;
      if (start >= raw) {
        setDisplay(raw);
        return;
      }
      setDisplay(start);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [raw]);

  return <>{display.toLocaleString()}{suffix}</>;
}

export default function StatCard({ label, value, delta, icon: Icon, neutral }) {
  return (
    <div className="group bg-surface rounded-2xl p-5 border border-border shadow-card transition-all duration-300 hover:scale-[1.02] hover:shadow-card-hover hover:border-gold/30">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy to-navy-secondary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
          <Icon size={20} className="text-gold-tint" />
        </div>
        <span className={`text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 transition-colors duration-200 ${neutral ? "bg-neutral-bg text-text-muted" : "bg-[#FBF1DC] text-[#9C7726]"}`}>
          {!neutral && <TrendingUp size={11} />}
          {delta}
        </span>
      </div>
      <p className="mt-4 text-[26px] font-heading font-semibold text-text-primary animate-count-up">
        <AnimatedValue value={value} />
      </p>
      <p className="text-[13px] mt-1 text-text-muted">{label}</p>
    </div>
  );
}

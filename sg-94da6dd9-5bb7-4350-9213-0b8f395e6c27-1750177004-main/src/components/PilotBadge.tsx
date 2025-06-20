
import { Sparkles } from "lucide-react";

export default function PilotBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 border border-emerald-500/30 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 animate-pulse" />
      <span className="text-emerald-400 font-semibold text-sm sm:text-base whitespace-nowrap">
        Now Open for First 250 Users Only
      </span>
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 animate-pulse" />
    </div>
  );
}

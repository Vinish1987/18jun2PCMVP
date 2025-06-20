import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PilotBadge from "@/components/PilotBadge";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 sm:pt-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-2 sm:left-10 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Pilot Badge Component - Now with proper spacing from header */}
        <div className="mb-8 sm:mb-12">
          <PilotBadge />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          This isn't saving.
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            This is time travel.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
          Grow your money daily. Earn up to{" "}
          <span className="text-emerald-400 font-semibold">2% per month</span>{" "}
          with 2PC micro-savings and fixed monthly returns.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
          <Link href="/signup">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/25 group relative overflow-hidden min-w-[200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center justify-center gap-2">
                Join the Pilot
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </Link>

          <Button 
            variant="outline" 
            className="w-full sm:w-auto bg-transparent border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-slate-500 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl rounded-2xl transition-all duration-300 backdrop-blur-sm min-w-[200px]"
          >
            Login
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Monthly Returns Card */}
            <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 shadow-xl shadow-emerald-500/10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-white font-bold text-lg">%</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2">2%</div>
                <div className="text-slate-300 font-medium text-sm sm:text-base">Monthly Returns</div>
                <div className="text-slate-500 text-xs mt-1">Guaranteed Growth</div>
              </div>
            </div>

            {/* Pilot Users Card */}
            <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-xl shadow-purple-500/10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-white font-bold text-lg">👥</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">250</div>
                <div className="text-slate-300 font-medium text-sm sm:text-base">Pilot Users Only</div>
                <div className="text-slate-500 text-xs mt-1">Exclusive Access</div>
              </div>
            </div>

            {/* AI Monitoring Card */}
            <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-xl shadow-blue-500/10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-white font-bold text-lg">🤖</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-slate-300 font-medium text-sm sm:text-base">AI Monitoring</div>
                <div className="text-slate-500 text-xs mt-1">Smart Protection</div>
              </div>
            </div>
          </div>

          {/* Additional Trust Elements */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Bank-grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <span>Instant Withdrawals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

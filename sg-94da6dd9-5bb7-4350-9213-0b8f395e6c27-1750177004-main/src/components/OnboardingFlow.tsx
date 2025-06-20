import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft, Sparkles, Zap, Target, Clock, Coins } from "lucide-react";
import { useRouter } from "next/router";

interface OnboardingData {
  goal: string;
  amount: string;
  timeline: string;
  savingStyle: string;
}

const questions = [
  {
    id: 1,
    text: "Hey! 👋 What are you saving for?",
    icon: Target,
    options: [
      { value: "trip", label: "A Trip", emoji: "✈️", gradient: "from-blue-500 to-cyan-500" },
      { value: "education", label: "Child's Education", emoji: "🎓", gradient: "from-purple-500 to-pink-500" },
      { value: "business", label: "Starting a Business", emoji: "💼", gradient: "from-orange-500 to-red-500" },
      { value: "gadget", label: "Buying a Gadget", emoji: "💻", gradient: "from-green-500 to-emerald-500" },
      { value: "emergency", label: "Emergency Fund", emoji: "🆘", gradient: "from-red-500 to-pink-500" },
      { value: "wealth", label: "Just Growing My Wealth", emoji: "💰", gradient: "from-yellow-500 to-orange-500" }
    ]
  },
  {
    id: 2,
    text: "How much would you like to save for this?",
    icon: Coins,
    options: [
      { value: "15000", label: "₹15,000", emoji: "💵", gradient: "from-emerald-400 to-teal-500", disabled: false },
      { value: "25000", label: "₹25,000", emoji: "💰", gradient: "from-emerald-500 to-green-500", disabled: false },
      { value: "50000", label: "₹50,000", emoji: "💎", gradient: "from-blue-500 to-purple-500", disabled: false },
      { value: "100000", label: "₹1,00,000", emoji: "🏆", gradient: "from-purple-500 to-pink-500", disabled: false },
      { value: "custom", label: "Custom Amount", emoji: "💸", gradient: "from-orange-500 to-red-500", disabled: false }
    ]
  },
  {
    id: 3,
    text: "When would you like to reach your goal?",
    icon: Clock,
    options: [
      { value: "3", label: "3 months", emoji: "⏳", gradient: "from-red-500 to-orange-500", disabled: false },
      { value: "6", label: "6 months", emoji: "📅", gradient: "from-orange-500 to-yellow-500", disabled: false },
      { value: "12", label: "12 months", emoji: "🗓", gradient: "from-green-500 to-emerald-500", disabled: false },
      { value: "flexible", label: "No rush — just grow it!", emoji: "🧘‍♂️", gradient: "from-blue-500 to-purple-500", disabled: false }
    ]
  },
  {
    id: 4,
    text: "How would you like to save?",
    icon: Zap,
    options: [
      { value: "daily", label: "Daily micro-savings", emoji: "🪙", gradient: "from-emerald-500 to-teal-500", disabled: false },
      { value: "monthly", label: "Monthly contribution", emoji: "💵", gradient: "from-blue-500 to-indigo-500", disabled: false },
      { value: "onetime", label: "One-time investment", emoji: "💰", gradient: "from-purple-500 to-pink-500", disabled: false }
    ]
  }
];

export default function OnboardingFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingData>({
    goal: "",
    amount: "",
    timeline: "",
    savingStyle: ""
  });
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleAnswer = (questionId: number, value: string) => {
    setIsAnimating(true);
    
    const questionKey = ["goal", "amount", "timeline", "savingStyle"][questionId - 1] as keyof OnboardingData;
    
    if (questionId === 2 && value === "custom") {
      setShowCustomInput(true);
      setIsAnimating(false);
      return;
    }
    
    setAnswers(prev => ({ ...prev, [questionKey]: value }));
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setShowFinalMessage(true);
      }
      setIsAnimating(false);
      setShowCustomInput(false);
    }, 800);
  };

  const handleBack = () => {
    if (showCustomInput) {
      setShowCustomInput(false);
      setCustomAmount("");
      return;
    }
    
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleCustomAmount = () => {
    if (customAmount && parseInt(customAmount) > 0) {
      setAnswers(prev => ({ ...prev, amount: customAmount }));
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
        setShowCustomInput(false);
      }, 800);
    }
  };

  const handleContinueToInvest = () => {
    // Store the onboarding data in localStorage or pass it to payment page
    const paymentData = {
      goal: questions[0].options.find(opt => opt.value === answers.goal)?.label || "your goal",
      amount: parseInt(answers.amount || customAmount),
      timeline: answers.timeline === "flexible" ? 12 : parseInt(answers.timeline),
      savingStyle: answers.savingStyle,
      dailyAmount: Math.ceil(parseInt(answers.amount || customAmount) / ((answers.timeline === "flexible" ? 12 : parseInt(answers.timeline)) * 30)),
      expectedValue: Math.ceil(parseInt(answers.amount || customAmount) * 1.12) // 2% monthly for the duration
    };
    
    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    router.push("/payment");
  };

  const calculateRecommendation = () => {
    const amount = parseInt(answers.amount || customAmount);
    const months = answers.timeline === "flexible" ? 12 : parseInt(answers.timeline);
    const dailyAmount = Math.ceil(amount / (months * 30));
    
    return {
      amount,
      months,
      dailyAmount,
      goalLabel: questions[0].options.find(opt => opt.value === answers.goal)?.label || "your goal"
    };
  };

  const recommendation = showFinalMessage ? calculateRecommendation() : null;
  const currentQuestion = questions[currentStep];
  const IconComponent = currentQuestion?.icon || Sparkles;

  if (showFinalMessage && recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-emerald-900/20 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-2 sm:left-10 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 w-full max-w-4xl">
          {/* Vinni Avatar - Responsive */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/25 animate-pulse">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">V</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-20 blur-lg animate-pulse" />
            </div>
          </div>

          {/* AI Assistant Name */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Vinni – your money buddy
            </h2>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 animate-pulse" />
              <span className="text-xs sm:text-sm">AI-Powered Financial Assistant</span>
              <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 animate-pulse" />
            </div>
          </div>

          {/* Main Result Card */}
          <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-2xl sm:rounded-3xl opacity-50 animate-pulse" />
            
            <div className="relative z-10">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
                  <Target className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold text-sm sm:text-base">Goal Analysis Complete</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed">
                  Perfect! Based on your goal of{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    ₹{recommendation.amount.toLocaleString()}
                  </span>{" "}
                  in{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {recommendation.months} months
                  </span>
                </h3>
              </div>

              {/* Recommendation Cards - Mobile Responsive */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Coins className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <span className="text-emerald-400 font-semibold text-sm sm:text-base">
                      {answers.savingStyle === "daily" ? "Daily Savings" : 
                       answers.savingStyle === "monthly" ? "Monthly Investment" : 
                       "One-time Investment"}
                    </span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {answers.savingStyle === "daily" ? `₹${recommendation.dailyAmount}/day` :
                     answers.savingStyle === "monthly" ? `₹${Math.ceil(recommendation.amount / recommendation.months)}/month` :
                     `₹${recommendation.amount.toLocaleString()}`}
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    {answers.savingStyle === "daily" ? "Daily micro-savings" :
                     answers.savingStyle === "monthly" ? "Monthly contribution" :
                     "Single payment to start growing"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <span className="text-purple-400 font-semibold text-sm sm:text-base">Monthly Returns</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-white">Up to 2%</p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Earn while you save with 2PC</p>
                </div>
              </div>

              <div className="text-center mb-6 sm:mb-8">
                <p className="text-base sm:text-lg text-slate-300 mb-2">
                  You'll earn up to{" "}
                  <span className="text-emerald-400 font-semibold">2% monthly</span>{" "}
                  on your savings through 2PC 🚀
                </p>
                <p className="text-slate-400 text-sm sm:text-base">
                  Start your financial journey with AI-powered {answers.savingStyle === "daily" ? "micro-savings" : "investment"}
                </p>
              </div>

              <Button 
                onClick={handleContinueToInvest}
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold py-3 sm:py-4 text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/25 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-2">
                  Continue to Invest
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-emerald-900/20 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-2 sm:left-10 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 text-xs sm:text-sm">Question {currentStep + 1} of {questions.length}</span>
            <span className="text-slate-400 text-xs sm:text-sm">{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Back Button */}
        {(currentStep > 0 || showCustomInput) && (
          <div className="mb-4 sm:mb-6">
            <Button
              onClick={handleBack}
              variant="outline"
              className="bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-300 group"
            >
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back
            </Button>
          </div>
        )}

        {/* Vinni Avatar */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/25">
              <span className="text-lg sm:text-xl font-bold text-white">V</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-20 blur animate-pulse" />
          </div>
        </div>

        {/* AI Assistant Name */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">
            Vinni – your money buddy
          </h2>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span className="text-xs">AI Financial Assistant</span>
            <Sparkles className="w-3 h-3 animate-pulse" />
          </div>
        </div>

        {/* Question Card */}
        <div className={`bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-emerald-500/10 transition-all duration-500 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Question Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <IconComponent className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{currentQuestion.text}</h3>
          </div>

          {/* Custom Input for Amount */}
          {showCustomInput ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Enter your target amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="bg-slate-700/50 border-emerald-500/30 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-4 text-base sm:text-lg py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 h-12 sm:h-14"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl sm:rounded-2xl pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300" />
              </div>
              <Button
                onClick={handleCustomAmount}
                disabled={!customAmount || parseInt(customAmount) <= 0}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Continue
                <ChevronRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
            </div>
          ) : (
            /* Option Buttons - Mobile Responsive Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={option.value}
                  onClick={() => !option.disabled && handleAnswer(currentStep + 1, option.value)}
                  variant="outline"
                  disabled={option.disabled}
                  className={`bg-gradient-to-br ${option.gradient}/10 border-2 border-transparent ${
                    option.disabled 
                      ? 'opacity-30 cursor-not-allowed' 
                      : 'hover:border-emerald-500/30 hover:bg-gradient-to-br hover:' + option.gradient + '/20'
                  } text-white transition-all duration-300 p-4 sm:p-6 h-auto text-left justify-start group rounded-xl sm:rounded-2xl relative overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="relative flex items-center gap-3 sm:gap-4 w-full">
                    <div className={`w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r ${option.gradient} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-lg sm:text-xl">{option.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm sm:text-base md:text-lg font-semibold">{option.label}</span>
                    </div>
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

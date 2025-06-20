
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Target, 
  FileText, 
  HelpCircle, 
  Settings, 
  LogOut,
  TrendingUp,
  Calendar,
  Coins,
  Brain,
  Plus,
  Pause,
  RotateCcw,
  Download,
  ArrowUpRight,
  Clock,
  DollarSign,
  Wallet,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";

interface UserData {
  fullName: string;
  email: string;
  age: string;
  gender: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showAddFundsDialog, setShowAddFundsDialog] = useState(false);
  const [addFundsType, setAddFundsType] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Mock data for MVP
  const dashboardData = {
    totalInvested: 15000,
    interestEarned: 250,
    nextPayoutDate: "July 17, 2025",
    planType: "One-time Investment",
    currentValue: 15250,
    monthlyReturn: 2.0,
    daysActive: 30,
    expectedValue: 17000
  };

  const transactions = [
    {
      date: "17 June 2025",
      type: "investment",
      amount: 15000,
      description: "Initial Investment"
    },
    {
      date: "17 June 2025",
      type: "interest",
      amount: 250,
      description: "Monthly Interest Update"
    }
  ];

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert("Please enter a valid withdrawal amount");
      return;
    }
    
    if (parseFloat(withdrawAmount) > dashboardData.currentValue) {
      alert("Withdrawal amount cannot exceed current balance");
      return;
    }

    // Store withdrawal request
    const withdrawalRequest = {
      amount: parseFloat(withdrawAmount),
      timestamp: new Date().toISOString(),
      status: "pending",
      email: userData?.email
    };
    
    const existingWithdrawals = JSON.parse(localStorage.getItem("withdrawalRequests") || "[]");
    existingWithdrawals.push(withdrawalRequest);
    localStorage.setItem("withdrawalRequests", JSON.stringify(existingWithdrawals));
    
    alert("Withdrawal request submitted! Money will be reflected in your account within 24 hours.");
    setWithdrawAmount("");
  };

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "goals", label: "Goals", icon: Target },
    { id: "statements", label: "Statements", icon: FileText },
    { id: "support", label: "Support", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Logout", icon: LogOut }
  ];

  const firstName = userData?.fullName?.split(" ")[0] || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-emerald-900/20">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50">
        <div className="flex items-center justify-between p-4">
          <Image
            src="/asset-4-mc0qxufi.png"
            alt="2PC"
            width={60}
            height={24}
            className="h-6 w-auto"
            priority
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-slate-700/50"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-md">
          <div className="pt-20 p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-64 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 flex-col relative z-10 min-h-screen">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700/50">
            <Image
              src="/asset-4-mc0qxufi.png"
              alt="2PC"
              width={80}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30"
                          : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-500 leading-relaxed">
              2PC is a tech-powered savings platform by Quantloop Technologies.
              We don't provide investment advice or brokerage services.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative z-10 pt-16 lg:pt-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Welcome Section */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Hi {firstName} 👋, welcome back!
              </h1>
              <p className="text-lg sm:text-xl text-slate-300">
                Here's how your money's growing today.
              </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Total Invested */}
              <Card className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-emerald-500/20 shadow-xl shadow-emerald-500/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4 sm:p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <span className="text-slate-400 font-medium text-sm sm:text-base">Total Invested</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">₹{dashboardData.totalInvested.toLocaleString()}</p>
                  <p className="text-emerald-400 text-xs sm:text-sm">Principal Amount</p>
                </CardContent>
              </Card>

              {/* Interest Earned */}
              <Card className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 shadow-xl shadow-purple-500/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4 sm:p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <span className="text-slate-400 font-medium text-sm sm:text-base">Interest Earned</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">₹{dashboardData.interestEarned.toLocaleString()}</p>
                  <p className="text-purple-400 text-xs sm:text-sm">+{dashboardData.monthlyReturn}% Monthly</p>
                </CardContent>
              </Card>

              {/* Next Payout */}
              <Card className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 shadow-xl shadow-blue-500/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4 sm:p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <span className="text-slate-400 font-medium text-sm sm:text-base">Next Payout</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-white mb-1">July 17</p>
                  <p className="text-blue-400 text-xs sm:text-sm">Monthly Interest</p>
                </CardContent>
              </Card>

              {/* Plan Type */}
              <Card className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-orange-500/20 shadow-xl shadow-orange-500/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4 sm:p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <span className="text-slate-400 font-medium text-sm sm:text-base">Plan Type</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-white mb-1">One-time</p>
                  <p className="text-orange-400 text-xs sm:text-sm">Lump Sum</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Timeline/Activity */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                    <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    {transactions.map((transaction, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4">
                        <div className="relative">
                          <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "investment" 
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500" 
                              : "bg-gradient-to-r from-purple-500 to-pink-500"
                          }`}>
                            {transaction.type === "investment" ? (
                              <Wallet className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                            ) : (
                              <Coins className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                            )}
                          </div>
                          {index < transactions.length - 1 && (
                            <div className="absolute top-8 sm:top-10 left-1/2 transform -translate-x-1/2 w-px h-6 sm:h-8 bg-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white text-sm sm:text-base truncate">{transaction.description}</h4>
                            <span className={`font-bold text-sm sm:text-base ${
                              transaction.type === "investment" ? "text-emerald-400" : "text-purple-400"
                            }`}>
                              +₹{transaction.amount.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs sm:text-sm">{transaction.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 sm:mt-8 p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-300 font-medium text-sm sm:text-base">Growth Progress</span>
                      <span className="text-emerald-400 font-bold text-sm sm:text-base">
                        ₹{dashboardData.currentValue.toLocaleString()} / ₹{dashboardData.expectedValue.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(dashboardData.currentValue / dashboardData.expectedValue) * 100} 
                      className="h-2 sm:h-3 bg-slate-600"
                    />
                    <p className="text-slate-400 text-xs sm:text-sm mt-2">
                      {Math.round((dashboardData.currentValue / dashboardData.expectedValue) * 100)}% towards your goal
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions & Withdrawal */}
              <div className="space-y-4 sm:space-y-6">
                {/* Actions Card */}
                <Card className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg sm:text-xl font-bold text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    {/* Add More Funds */}
                    <Dialog open={showAddFundsDialog} onOpenChange={setShowAddFundsDialog}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] group">
                          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                          Add More Funds
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700 mx-4">
                        <DialogHeader>
                          <DialogTitle className="text-white">Add More Funds</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Label className="text-slate-300">Select Investment Type</Label>
                          <Select value={addFundsType} onValueChange={setAddFundsType}>
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                              <SelectValue placeholder="Choose investment type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="daily" className="text-white">Daily Micro-savings (Coming Soon)</SelectItem>
                              <SelectItem value="monthly" className="text-white">Monthly Contribution (Coming Soon)</SelectItem>
                              <SelectItem value="lump" className="text-white">Lump Sum Investment (Coming Soon)</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-slate-400 text-sm">Additional investment options will be available soon!</p>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Other Actions */}
                    <Button variant="outline" className="w-full bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:text-white py-3 sm:py-4 rounded-xl transition-all duration-300">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Saving
                    </Button>

                    <Button variant="outline" className="w-full bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:text-white py-3 sm:py-4 rounded-xl transition-all duration-300">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Change Plan
                    </Button>

                    <Button variant="outline" className="w-full bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:text-white py-3 sm:py-4 rounded-xl transition-all duration-300">
                      <Download className="w-4 h-4 mr-2" />
                      Download Statement
                    </Button>
                  </CardContent>
                </Card>

                {/* Withdrawal Card */}
                <Card className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-red-500/20 shadow-2xl shadow-red-500/10">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                      <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" />
                      Withdrawal Request
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300 text-sm sm:text-base">Withdrawal Amount</Label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-red-500 focus:ring-red-500/20 focus:ring-2 h-11 sm:h-12"
                        max={dashboardData.currentValue}
                      />
                      <p className="text-slate-400 text-xs">
                        Available: ₹{dashboardData.currentValue.toLocaleString()}
                      </p>
                    </div>

                    <Button 
                      onClick={handleWithdraw}
                      disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Request Withdrawal
                    </Button>

                    <p className="text-slate-400 text-xs text-center">
                      Money will be reflected in your account within 24 hours
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Target, Clock, Zap, ArrowRight, Upload, X, FileImage } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Added Link import

interface PaymentData {
  goal: string;
  amount: number;
  timeline: number;
  savingStyle: string;
  expectedValue: number;
}

export default function PaymentInterface() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fixed MVP data - ₹15,000 one-time investment
  const mvpData: PaymentData = {
    goal: "Growing Your Wealth",
    amount: 15000,
    timeline: 6,
    savingStyle: "onetime",
    expectedValue: 17000
  };

  const data = mvpData; // Always use MVP data

  // Auto-fetch user email from signup data
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserEmail(parsedData.email || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePaymentSubmit = () => {
    // User can either upload screenshot OR enter transaction ID (not both required)
    if (!uploadedImage && !transactionId.trim()) {
      alert("Please either upload payment screenshot or enter transaction ID");
      return;
    }

    if (!userEmail.trim()) {
      alert("Email address is required");
      return;
    }

    setIsProcessing(true);
    
    // Store payment data with user email for future reference
    const paymentSubmission = {
      email: userEmail,
      transactionId: transactionId || null,
      amount: data.amount,
      timestamp: new Date().toISOString(),
      screenshot: uploadedImage || null,
      paymentMethod: "UPI",
      status: "submitted"
    };
    
    // Store in localStorage for demo purposes (in real app, this would go to backend)
    const existingPayments = JSON.parse(localStorage.getItem("paymentSubmissions") || "[]");
    existingPayments.push(paymentSubmission);
    localStorage.setItem("paymentSubmissions", JSON.stringify(existingPayments));
    
    console.log("Payment submission stored:", paymentSubmission);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-emerald-900/20 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 w-full max-w-2xl text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/25 animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-20 blur-lg animate-pulse" />
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 shadow-2xl shadow-emerald-500/10 relative overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl opacity-50 animate-pulse" />
            
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white mb-4">
                🎉 You're In!
              </h1>
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                Your savings journey with 2PC has officially begun.
              </p>
              <p className="text-lg text-slate-400">
                Next payout update will appear on your dashboard.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-4 border border-emerald-500/20">
              <Target className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-slate-400">Investment</p>
              <p className="text-lg font-bold text-white">₹{data.amount.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-4 border border-purple-500/20">
              <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-slate-400">Timeline</p>
              <p className="text-lg font-bold text-white">{data.timeline} months</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-4 border border-blue-500/20">
              <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-slate-400">Expected</p>
              <p className="text-lg font-bold text-white">₹{data.expectedValue.toLocaleString()}</p>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold py-4 text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/25 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative flex items-center justify-center gap-2">
              <Link href="/dashboard" legacyBehavior>
                <a className="flex items-center gap-2">
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Link>
            </span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-emerald-900/20 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Time to Grow Your Money
          </h1>
          <p className="text-xl text-slate-300">
            Complete your payment to start your savings journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Summary Card */}
          <Card className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                <Target className="w-6 h-6 text-emerald-400" />
                Plan Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border border-emerald-500/20">
                <p className="text-sm text-slate-400 mb-1">Goal Amount</p>
                <p className="text-2xl font-bold text-white">₹{data.amount.toLocaleString()}</p>
                <p className="text-xs text-emerald-400">One-time Investment</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Expected Value</span>
                  <Zap className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white">₹{data.expectedValue.toLocaleString()}</p>
                <p className="text-xs text-yellow-400">Estimated value in 6 months (at up to 2% monthly returns)</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                <p className="text-sm text-slate-400 mb-1">Payment Method</p>
                <p className="text-lg font-bold text-white">UPI</p>
                <p className="text-xs text-purple-400">Secure & Instant</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Card */}
          <Card className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                Scan QR Code to Pay
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-4 shadow-xl">
                  <Image
                    src="/img-83c4a64f4e27-1-mc0rwty6.jpeg"
                    alt="UPI QR Code"
                    width={200}
                    height={200}
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Payment Amount */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-6 border border-emerald-500/20">
                <p className="text-sm text-slate-400 mb-2">Amount to Pay</p>
                <p className="text-3xl font-bold text-white mb-1">₹{data.amount.toLocaleString()}</p>
                <p className="text-sm text-emerald-400">One-time Investment</p>
              </div>

              <p className="text-xs text-slate-400">
                Secure payment powered by UPI. Your money is safe with bank-grade security.
              </p>
            </CardContent>
          </Card>

          {/* Upload Payment Proof Card */}
          <Card className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white text-center">
                Upload UPI Payment Screenshot or Share UPI transaction ID
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-2 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              {/* File Upload Area */}
              <div className="space-y-4">
                <Label className="text-slate-300">
                  Upload UPI Payment Screenshot (Optional)
                </Label>
                
                {!uploadedImage ? (
                  <div
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer ${
                      isDragOver 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : 'border-slate-600 hover:border-emerald-500/50 hover:bg-emerald-500/5'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-300 font-semibold mb-1">
                      Drop screenshot here or click to browse
                    </p>
                    <p className="text-slate-500 text-sm">
                      PNG, JPG up to 10MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative bg-slate-700/30 rounded-2xl p-4 border border-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={uploadedImage}
                          alt="Payment Screenshot"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileImage className="w-4 h-4 text-emerald-400" />
                          <span className="text-slate-300 font-medium">Payment Screenshot</span>
                        </div>
                        <p className="text-slate-500 text-sm">Image uploaded successfully</p>
                      </div>
                      <Button
                        onClick={removeUploadedImage}
                        variant="outline"
                        size="sm"
                        className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-600"></div>
                <span className="text-slate-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-slate-600"></div>
              </div>

              {/* Transaction ID Input */}
              <div className="space-y-2">
                <Label htmlFor="transactionId" className="text-slate-300">
                  UPI Transaction ID (Optional)
                </Label>
                <Input
                  id="transactionId"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-2 transition-all duration-200"
                  placeholder="Enter UPI transaction ID"
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handlePaymentSubmit}
                disabled={isProcessing || (!uploadedImage && !transactionId.trim()) || !userEmail.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold py-4 text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-2">
                  {isProcessing ? "Processing..." : "Submit Payment Proof"}
                  {!isProcessing && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
                </span>
              </Button>

              <p className="text-center text-slate-500 text-xs">
                Provide either a screenshot or transaction ID for verification
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

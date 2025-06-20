import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";

interface FormData {
  fullName: string;
  email: string;
  age: string;
  gender: string;
  password: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  age?: string;
  gender?: string;
  password?: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    password: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const ageNum = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(ageNum) || ageNum < 18 || ageNum > 70) {
      newErrors.age = "Age must be between 18 and 70";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Form submitted:", formData);
      // Store user data in localStorage for later use
      localStorage.setItem("userData", JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        timestamp: new Date().toISOString()
      }));
      
      // Simulate successful registration
      setTimeout(() => {
        router.push("/onboarding");
      }, 1000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-md border-slate-700/50 shadow-2xl">
      <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-2">
          Join the Pilot Program
        </CardTitle>
        <p className="text-slate-400 text-xs sm:text-sm">
          Be among the first 250 users to experience the future of saving
        </p>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-300 text-sm">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-2 transition-all duration-200 h-11 sm:h-12"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-400 text-xs sm:text-sm">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300 text-sm">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-2 transition-all duration-200 h-11 sm:h-12"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-xs sm:text-sm">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-slate-300 text-sm">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-2 transition-all duration-200 h-11 sm:h-12"
                placeholder="Age"
                min="18"
                max="70"
              />
              {errors.age && (
                <p className="text-red-400 text-xs">{errors.age}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-slate-300 text-sm">
                Gender
              </Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-2 transition-all duration-200 h-11 sm:h-12">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="male" className="text-white hover:bg-slate-700">Male</SelectItem>
                  <SelectItem value="female" className="text-white hover:bg-slate-700">Female</SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-slate-700">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say" className="text-white hover:bg-slate-700">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-400 text-xs">{errors.gender}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300 text-sm">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-2 transition-all duration-200 pr-10 h-11 sm:h-12"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs sm:text-sm">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
          >
            {isSubmitting ? "Processing..." : "Get Early Access"}
          </Button>

          <p className="text-center text-slate-400 text-xs sm:text-sm mt-4">
            Only 250 pilot users will be accepted. No spam, no risk.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

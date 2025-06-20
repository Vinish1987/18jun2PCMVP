import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative">
          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image
                src="/asset-4-mc0qxufi.png"
                alt="2PC"
                width={60}
                height={24}
                className="h-6 w-auto cursor-pointer"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Right side */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200">
                Join the Pilot
              </Button>
            </Link>
          </div>

          {/* Mobile menu button - Right side */}
          <div className="md:hidden ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-slate-700/50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 backdrop-blur-md rounded-lg mt-2 border border-slate-700/50">
              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-200">
                  Join the Pilot
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

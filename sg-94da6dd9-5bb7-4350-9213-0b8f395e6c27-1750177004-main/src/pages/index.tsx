
import React from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>2PC - This isn&apos;t saving. This is time travel.</title>
        <meta name="description" content="Grow your money daily. Earn up to 2% per month with 2PC micro-savings and fixed monthly returns." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <HeroSection />
      </div>
    </>
  );
}


import React from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import OnboardingFlow from "@/components/OnboardingFlow";

export default function Onboarding() {
  return (
    <>
      <Head>
        <title>Goal Setup - 2PC</title>
        <meta name="description" content="Set up your financial goals with Vinni, your money buddy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <div className="pt-16">
          <OnboardingFlow />
        </div>
      </div>
    </>
  );
}

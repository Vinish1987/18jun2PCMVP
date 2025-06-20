import React from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import SignUpForm from "@/components/SignUpForm";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Join the Pilot Program - 2PC</title>
        <meta name="description" content="Join the 2PC pilot program. Only 250 users will be accepted." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen px-4">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}

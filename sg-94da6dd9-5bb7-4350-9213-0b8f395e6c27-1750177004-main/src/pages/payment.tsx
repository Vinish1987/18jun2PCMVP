
import React from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import PaymentInterface from "@/components/PaymentInterface";

export default function Payment() {
  return (
    <>
      <Head>
        <title>Payment - 2PC</title>
        <meta name="description" content="Complete your payment to start your savings journey with 2PC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        <div className="pt-16">
          <PaymentInterface />
        </div>
      </div>
    </>
  );
}

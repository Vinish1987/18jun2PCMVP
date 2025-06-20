
import React from "react";
import Head from "next/head";
import Dashboard from "@/components/Dashboard";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard - 2PC</title>
        <meta name="description" content="Your 2PC savings dashboard - track your growth and manage your investments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-slate-900">
        <Dashboard />
      </div>
    </>
  );
}

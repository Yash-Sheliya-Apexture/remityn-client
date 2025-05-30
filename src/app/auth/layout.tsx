// app/auth/layout.tsx
"use client";
import React from "react";
import "../globals.css";
import AuthHeader from "../components/section/AuthHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      {/* <AuthHeader /> */}
      <main>
        {children}
      </main>
    </>
  );
}

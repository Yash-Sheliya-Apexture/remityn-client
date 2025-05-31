// app/auth/layout.tsx
"use client";
import React from "react";
import "../globals.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <main>
        {children}
      </main>
    </>
  );
}

// app/Dashboar/layout.tsx
import DashboardLayout from '../components/layout/DashboardLayout';
import { ReactNode } from 'react'; // Import ReactNode
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'User Dashboard', // Still good for browser tab
  robots: {
    index: false, // Do not index this page
    follow: false, // Do not follow links from this page (be cautious with this)
    // or simply: noindex: true, nofollow: true
  },
};


interface DashboardRootLayoutProps {
    children: ReactNode;
}

export default function DashboardRootLayout({ children }: DashboardRootLayoutProps) {
    return (<DashboardLayout>{children}</DashboardLayout>);
}

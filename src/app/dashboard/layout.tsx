// app/Dashboar/layout.tsx
import DashboardLayout from '../components/layout/DashboardLayout';
import { ReactNode } from 'react'; // Import ReactNode

interface DashboardRootLayoutProps {
    children: ReactNode;
}

export default function DashboardRootLayout({ children }: DashboardRootLayoutProps) {
    return (<DashboardLayout>{children}</DashboardLayout>);
}

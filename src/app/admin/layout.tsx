// // app/admin/layout.tsx
// import AdminLayout from '../components/layout/AdminLayout';

// export default function AdminRootLayout({ children }) {
//     return <AdminLayout>{children}</AdminLayout>;
// }



import { ReactNode } from 'react';
import AdminLayout from '../components/layout/AdminLayout';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminRootLayout({ children }: AdminLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}

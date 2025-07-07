import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AuthWrapper from "@/utils/AuthWrapper";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <AuthWrapper requiredRole="admin">
      <Navbar />
      <Sidebar />
      <div className="mt-[59px] h-[1px] w-full"></div>
      <div className="ml-[50px]">{children}</div>
    </AuthWrapper>
    // </Suspense>
  );
}

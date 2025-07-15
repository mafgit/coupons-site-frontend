import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AuthWrapper from "@/utils/AuthWrapper";

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
      <div className="mb-[70px] ml-0 sm:ml-[50px] sm:mb-0">{children}</div>
    </AuthWrapper>
    // </Suspense>
  );
}

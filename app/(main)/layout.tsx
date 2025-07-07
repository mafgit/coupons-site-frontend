import CouponPopup from "@/components/CouponPopup";
import Navbar from "@/components/Navbar";
import AuthWrapper from "@/utils/AuthWrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <AuthWrapper>
      <Navbar />
      <div className="mt-[52px] w-full"></div>
      {children}
      <CouponPopup />
    </AuthWrapper>
    // </Suspense>
  );
}

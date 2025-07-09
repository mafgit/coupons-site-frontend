import Search from "@/components/Search";
import CouponPopup from "@/components/CouponPopup";
import Navbar from "@/components/Navbar";
import AuthWrapper from "@/utils/AuthWrapper";
import '../globals.css'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <AuthWrapper>
      <Search />
      <CouponPopup />
      <Navbar />
      <div className="pt-[52px] w-full"></div>
      {children}
    </AuthWrapper>
    // </Suspense>
  );
}

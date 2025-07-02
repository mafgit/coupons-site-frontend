import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-col fixed left-0 top-0 z-40 w-full">
      <div className="flex px-8 items-center justify-between w-full py-4 bg-gray-800 text-white">
        <div className="flex gap-4">
          <Image src="/vercel.svg" alt="logo" width={20} height={20} />
          <h1 className="uppercase tracking-widest">Coupon Shop Dashboard</h1>
        </div>

        <nav className="flex items-center justify-center gap-6 text-sm">
          <Link
            href="/dashboard"
            className="flex gap-1 items-center justify-center h-full"
          >
            <span>Home</span>
          </Link>

          <Link
            href="/dashboard/brands"
            className="flex gap-1 items-center justify-center h-full"
          >
            <span>Brands</span>
          </Link>

          <Link
            href="/dashboard/coupons"
            className="flex gap-1 items-center justify-center h-full"
          >
            <span>Coupons</span>
          </Link>

          <Link
            href="/dashboard/categories"
            className="flex gap-1 items-center justify-center h-full"
          >
            <span>Categories</span>
          </Link>

          <Link
            href="/"
            className="flex gap-1 items-center justify-center h-full"
          >
            <span>Website</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

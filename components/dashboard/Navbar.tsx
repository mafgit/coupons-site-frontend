"use client";
import useStore from "@/hooks/useStore";
import Image from "next/image";
import ProfilePic from "../ProfilePic";

const Navbar = () => {
  const authenticated = useStore((state) => state.authenticated);
  const role = useStore((state) => state.role);

  return (
    <div className="flex flex-col fixed left-0 top-0 z-40 w-full">
      <div className="flex px-8 items-center justify-between w-full py-4 bg-primary text-white  rounded-b-md">
        <div className="flex gap-4">
          <Image src="/vercel.svg" alt="logo" className="w-[15px] sm:w-[20px]" width={20} height={20} />
          <h1 className="text-sm sm:text-[16px] uppercase tracking-widest">Coupons Dashboard</h1>
        </div>

        <ProfilePic authenticated={authenticated} image={""} role={role} />
      </div>
    </div>
  );
};

export default Navbar;

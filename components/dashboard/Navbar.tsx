"use client";
import useStore from "@/hooks/useStore";
import Image from "next/image";
import ProfilePic from "../ProfilePic";

const Navbar = () => {
  const authenticated = useStore((state) => state.authenticated);

  return (
    <div className="flex flex-col fixed left-0 top-0 z-40 w-full">
      <div className="flex px-8 items-center justify-between w-full py-4 bg-gray-800 text-white  rounded-b-md">
        <div className="flex gap-4">
          <Image src="/vercel.svg" alt="logo" width={20} height={20} />
          <h1 className="uppercase tracking-widest">Coupon Shop Dashboard</h1>
        </div>

        <ProfilePic authenticated={authenticated} image={""} />
      </div>
    </div>
  );
};

export default Navbar;

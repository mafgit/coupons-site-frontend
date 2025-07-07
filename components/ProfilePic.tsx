"use client";
import useStore from "@/hooks/useStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
const ProfilePic = ({
  image,
  authenticated,
}: {
  image: string;
  authenticated: boolean;
}) => {
  const router = useRouter();
  const logout = useStore((state) => state.logout);

  return authenticated ? (
    <div className="profile-pic relative">
      <img
        src={image || "/default-profile-pic.jpg"}
        alt="profile-pic"
        className="rounded-full w-[30px] h-[30px]"
      />
      <div className="rounded-lg absolute top-full right-[0] p-1 bg-gray-400 scale-y-0 origin-top transition-all duration-200 flex justify-between flex-col gap-1">
        <button
          onClick={() => {
            logout();
            router.refresh()
          }}
          className="p-2 bg-gray-300 rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <Link href="/login">Login</Link>
  );
};

export default ProfilePic;

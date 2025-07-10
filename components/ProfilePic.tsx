"use client";
import useStore from "@/hooks/useStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
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
      <div className="rounded-lg absolute top-full right-[0] p-1 bg-transparent transform translate-y-[-50%] opacity-0 pointer-events-none origin-top transition-all duration-200 flex justify-between flex-col gap-1">
        <button
          onClick={async () => {
            try {
              await logout();
            } finally {
              // router.refresh();
              window.location.reload()
            }
          }}
          className="p-2 bg-red-400 text-white rounded-sm flex items-center justify-center gap-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  ) : (
    <Link href="/login">Login</Link>
  );
};

export default ProfilePic;

"use client";
import { useEffect } from "react";
import useStore from "@/hooks/useStore";
import { useRouter } from "next/navigation";
// import { shallow } from "zustand/shallow";

const AuthWrapper = ({
  requiredRole,
  children,
}: {
  requiredRole?: "admin" | "user" | "unauthorized";
  children: React.ReactNode;
}) => {
  const router = useRouter();
  // const [fetchUser, loading, authenticated, role] = useStore((state) => [
  //   state.fetchUser,
  //   state.loading,
  //   state.authenticated,
  //   state.role,
  // ]);
  // const { fetchUser, loading, authenticated, role } = useStore(
  //   (state) => ({
  //     fetchUser: state.fetchUser,
  //     loading: state.loading,
  //     authenticated: state.authenticated,
  //     role: state.role,
  //   }),
  //   shallow
  // );

  const fetchUser = useStore((state) => state.fetchUser);
  const loading = useStore((state) => state.loading);
  const authenticated = useStore((state) => state.authenticated);
  const role = useStore((state) => state.role);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(requiredRole, authenticated, role);

    if (!loading) {
      if (requiredRole === "unauthorized" && authenticated) {
        console.log("redirecting");
        // on login page
        router.replace("/");
      } else if (requiredRole === "admin" && role !== "admin") {
        router.replace("/login");
      } else if (
        requiredRole === "user" &&
        role !== "user" &&
        role !== "admin"
      ) {
        router.replace("/login");
      }
    }
  }, [role, loading, authenticated, requiredRole]);

  const shouldBeBlocked = () => {
    if (requiredRole === "unauthorized" && authenticated) {
      return true;
    } else if (requiredRole === "admin" && role !== "admin") {
      return true;
    } else if (requiredRole === "user" && role !== "user" && role !== "admin") {
      return true;
    }

    return false;
  };
  if (loading || shouldBeBlocked())
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="animate-spin border-l-2 border-r-2 border-primary w-8 h-8 rounded-full"></div>
      </div>
    );
  return <div className="relative">{children}</div>;
};

export default AuthWrapper;

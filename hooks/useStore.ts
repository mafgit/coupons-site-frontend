import { ICoupon } from "@/types/ICoupon";
import { IStoreState } from "@/types/IStoreState";
import { create } from "zustand/react";

const useStore = create<IStoreState>((set, get) => {
  return {
    userId: undefined,
    role: undefined,
    authenticated: false,
    loading: true,
    hasFetched: false,
    couponOpened: undefined,
    searchOpened: false,

    setUser: (obj) => {
      set(obj);
    },

    fetchUser: async () => {
      try {
        if (get().hasFetched) return;
        set({ loading: true });
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const { userId, role }: { userId: string; role: "admin" | "user" } =
          await res.json();
        set({
          userId,
          role,
          loading: false,
          authenticated: true,
          hasFetched: true,
        });
      } catch (err) {
        set({
          loading: false,
          authenticated: false,
          userId: undefined,
          role: undefined,
          hasFetched: true,
        });
      } finally {
        set({ loading: false });
      }
    },

    logout: async () => {
      return await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .finally(() => {
          set({
            userId: undefined,
            role: undefined,
            loading: false,
            authenticated: false,
            hasFetched: false,
          });
        });
    },

    openCouponPopup: async (id: string) => {
      console.log("opening");

      try {
        const { coupon } = await fetch(
          "http://localhost:5000/api/coupon/view-by-id/" + id,
          { method: "POST" }
        ).then((res) => res.json());
        console.log("73", coupon);

        set({ couponOpened: coupon });
      } catch (err) {
        console.log(err);
      }
    },

    closeCouponPopup: () => set({ couponOpened: undefined }),

    openSearch: () => {
      set({ searchOpened: true });
    },
    closeSearch: () => {
      set({ searchOpened: false });
    },
  };
});

export default useStore;

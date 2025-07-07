import { ICoupon } from "./ICoupon";

export interface IStoreState {
  loading: boolean;
  authenticated: boolean;
  userId?: string;
  role?: "admin" | "user";
  hasFetched: boolean;
  couponOpened: ICoupon | undefined;
  // setUser: (userId: string, role: "admin" | "user") => void;
  fetchUser: () => Promise<void>;
  logout: () => any;
  setUser: (obj: {
    userId?: string;
    role?: "admin" | "user";
    authenticated: boolean;
    loading: boolean;
    hasFetched: boolean;
  }) => void;
  openCouponPopup: (coupon: ICoupon) => void;
  closeCouponPopup: () => void;
}

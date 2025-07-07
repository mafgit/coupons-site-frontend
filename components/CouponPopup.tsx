"use client";

import useStore from "@/hooks/useStore";
import Link from "next/link";

const CouponPopup = () => {
  const couponOpened = useStore((s) => s.couponOpened);
  const closeCouponPopup = useStore((s) => s.closeCouponPopup);

  if (!couponOpened) return null;
  return (
    <div className="fixed flex h-screen w-screen overflow-y-hidden z-50">
      <div
        className="fixed top-0 left-0 bg-black/30 w-screen h-screen z-[55]"
        onClick={(e) => {
          // e.stopPropagation()
          closeCouponPopup();
        }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 flex flex-col gap-3 text-center z-[60] rounded-lg">
        <h2 className="text-2xl font-semibold">{couponOpened.title}</h2>
        <p className="text-sm">{couponOpened.terms_and_conditions}</p>
        <h3 className="p-2 border-2 border-dashed border-primary rounded-lg">
          {couponOpened.type === "code"
            ? couponOpened.code
            : "No code required"}
        </h3>
        
        {couponOpened.type === "code" ? (
          <button
            className="bg-primary p-2 rounded-lg text-white"
            onClick={() => {
              navigator.clipboard.writeText(couponOpened.code);
              alert("Copied to clipboard");
            }}
          >
            Copy Code
          </button>
        ) : (
          <Link
            href={couponOpened.brand.website}
            className="bg-primary p-2 rounded-lg text-white"
          >
            Continue to {couponOpened.brand.name}
          </Link>
        )}
      </div>
    </div>
  );
};

export default CouponPopup;

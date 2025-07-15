"use client";
import useStore from "@/hooks/useStore";
import { ICoupon } from "@/types/ICoupon";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Coupon = ({
  coupon,
  brand_image,
}: {
  coupon: ICoupon;
  brand_image: string;
}) => {
  const [detailsOpened, setDetailsOpened] = useState(false);
  const openCouponPopup = useStore((state) => state.openCouponPopup);

  return (
    <div className="flex flex-col w-max min-w-[500px] bg-white border-1  border-black/20 rounded-xl shadow-md shadow-black/20 h-min overflow-hidden">
      <div className=" p-4 flex items-center justify-around w-full gap-4 z-[10] bg-white h-full">
        <Image
          width={100}
          height={100}
          className="rounded-xl border-1 border-black/30"
          alt="coupon"
          src={brand_image}
        />

        <div className="grow-[3]">
          <h3 className="font-semibold">{coupon.title}</h3>

          <div className="flex gap-2 mt-2">
            <span className="bg-[#76a6e6] text-white px-2 py-1 rounded-md text-xs text-center">
              {coupon.view_count} Used
            </span>
            <button
              onClick={() => setDetailsOpened(!detailsOpened)}
              className="flex items-center justify-center gap-1 font-light text-sm"
            >
              <span>Detail</span>
              {!detailsOpened ? (
                <FaChevronDown className="text-xs" />
              ) : (
                <FaChevronUp className="text-xs" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="bg-primary px-[10px] py-[5px] text-white rounded-md text-sm"
            onClick={async () => {
              await openCouponPopup(coupon._id);
            }}
          >
            {coupon.type === "deal" ? "Get Deal" : "Get Voucher"}
          </button>
          {coupon.verified ? (
            <span className="text-white bg-[#937ef3] p-1 rounded-md text-xs text-center w-min ml-auto">
              VERIFIED
            </span>
          ) : (
            <span className="text-white bg-[#f0964d] p-1 rounded-md text-xs text-center w-min ml-auto">
              UNVERIFIED
            </span>
          )}
        </div>
      </div>

      <div
        className={
          "w-full transition-all duration-200 overflow-hidden px-4 text-sm font-light " +
          (detailsOpened ? "max-h-[100px] pb-2 " : "max-h-[0px] pb-0 ")
        }
      >
        <p>{coupon.terms_and_conditions}</p>
      </div>
    </div>
  );
};

export default Coupon;

"use client";
import { ICoupon } from "@/types/ICoupon";
import React, { useState } from "react";
import Coupon from "./Coupon";
import { IBrand } from "@/types/IBrand";
import Rating from "./Rating";
import InteractiveRating from "./InteractiveRating";
import FilterBy from "./FilterBy";

const BrandPageCoupons = ({
  brand,
  your_rating,
}: {
  brand: IBrand;
  your_rating: number;
}) => {
  const [all, setAll] = useState(true);
  const [voucherCode, setVoucherCode] = useState(false);
  const [onlineSale, setOnlineSale] = useState(false);
  const [shownCoupons, setShownCoupons] = useState<ICoupon[]>(brand.coupons!);

  return (
    <div className="flex gap-2 justify-stretch items-stretch max-w-[1100px]  mt-[30px]  mx-auto">
      <div className="flex flex-col gap-2 w-[70%] h-full">
        <h2 className="text-2xl font-semibold mb-2">Coupons</h2>
        {shownCoupons.length ? (
          shownCoupons.map((coupon: ICoupon) => (
            <Coupon
              coupon={coupon}
              key={coupon._id}
              brand_image={brand.image}
            />
          ))
        ) : (
          <p className="text-gray-700">No Coupons Yet</p>
        )}
      </div>

      <div className="flex flex-col gap-4 h-full items-start bg-white w-[30%] rounded-md p-4">
        <div className="flex flex-col gap-1 items-center justify-center bg-gray-100 w-full p-2 rounded-md">
          <h3 className="text-md text-center w-full text-gray-700 font-semibold">Ratings By Users</h3>
          <Rating
            number={brand.rating ?? 0}
            rating_count={brand.rating_count ?? 0}
          />
        </div>

        <div className="flex flex-col gap-1 items-center justify-center w-full bg-gray-100 p-2 rounded-md">
          <h3 className="text-md text-center w-full text-gray-700 font-semibold">Your Rating</h3>
          <InteractiveRating number={your_rating ?? 0} brandId={brand._id} />
        </div>

        <FilterBy
          allCoupons={brand.coupons!}
          setShownCoupons={setShownCoupons}
          all={all}
          setAll={setAll}
          voucherCode={voucherCode}
          setVoucherCode={setVoucherCode}
          onlineSale={onlineSale}
          setOnlineSale={setOnlineSale}
        />

        <div className="max-w-[300px] text-center">
          <h3 className="text-lg text-gray-700 font-semibold">More About {brand.name}</h3>
          <p className="font-light text-sm">{brand.more_about}</p>
        </div>
      </div>
    </div>
  );
};

export default BrandPageCoupons;

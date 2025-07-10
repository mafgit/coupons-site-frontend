"use client";
import useStore from "@/hooks/useStore";
import { ICoupon } from "@/types/ICoupon";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBookmark } from "react-icons/fa6";


const Card = ({ coupon }: { coupon: ICoupon }) => {
  const openCouponPopup = useStore((state) => state.openCouponPopup);
  const router = useRouter();
  
  const couponClickHandler = async (coupon: ICoupon) => {
    await openCouponPopup(coupon._id);
    router.push(`/brand/${coupon.brand.slug}`);
    window.open(coupon.brand.website, "_blank");
  };
  
  return (
    <div className="card relative rounded-xl flex flex-col items-center justify-between shadow-lg shadow-black/20 bg-white w-[240px]  border-1 border-black/20 h-[320px]">
      <button className="bookmark opacity-0 pointer-events-none duration-300 transition-all absolute top-2 right-2 text-black/20 text-lg">
        <FaBookmark />
      </button>
      <Image
        src={coupon.brand.image}
        alt="logo"
        width={1000}
        height={145}
        className="rounded-t-xl w-full h-[145px] object-cover bg-white border-b-1 border-black/20"
      />
      <div className="flex flex-col p-3 gap-2 w-full h-full ">
        <div className="flex items-center justify-between">
          <Link href={'/brand/' + coupon.brand.slug} className="text-sm">{coupon.brand.name}</Link>
          {coupon.verified ? (
            <span className="text-white bg-[#937ef3] p-1 rounded-md text-xs">
              VERIFIED
            </span>
          ) : (
            <span className="text-white bg-[#f0964d] p-1 rounded-md text-xs">
              UNVERIFIED
            </span>
          )}
        </div>
        <h3 className="font-semibold">{coupon.title}</h3>
        <div className="flex items-center justify-between mt-auto self-end w-full">
          <p className="text-xs">View Terms</p>
          <p className="text-xs">{coupon.view_count} Used</p>
        </div>
        {coupon.type === "code" ? (
          <button
            onClick={() => couponClickHandler(coupon)}
            className=" reveal-btn relative w-full rounded-xl text-white h-[40px] text-center"
          >
            <span className="bg-primary w-[90%] z-10 transition-all duration-200 h-full rounded-xl absolute top-0 left-0"></span>
            <span className="absolute top-0 left-0 h-full z-[15] w-full flex items-center justify-center">
              Reveal Code
            </span>
            <span className="absolute top-0 left-0 z-[5] text-black w-full h-full border-dashed border-2 border-primary rounded-xl flex items-center justify-center">
              {"xxxxxxxxxxxxxxxxxx" + coupon.code.slice(coupon.code.length - 4)}
            </span>
          </button>
        ) : (
          <button
            onClick={() => couponClickHandler(coupon)}
            className=" reveal-btn bg-primary relative w-full rounded-xl text-white h-[40px] text-center flex items-center justify-center"
          >
            Get Deal
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;

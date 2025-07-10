"use client";
import useStore from "@/hooks/useStore";
import { ICoupon } from "@/types/ICoupon";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchOffer = ({ offer }: { offer: ICoupon }) => {
  const closeSearch = useStore((s) => s.closeSearch);
  const openCouponPopup = useStore((s) => s.openCouponPopup);
  const router = useRouter();

  return (
    <Link
      onClick={async () => {
        closeSearch();
        await openCouponPopup(offer._id);
        router.push(`/brand/${offer.brand.slug}`);
        window.open(offer.brand.website, "_blank");
      }}
      href={"/brand/" + offer.brand.slug}
      className="w-full flex items-center justify-start gap-4 text-left"
    >
      <img
        src={offer.brand.image}
        className="w-[60px] h-[60px] rounded-md border-1 border-gray-300 object-cover"
        alt="brand logo"
      />
      <div className="flex flex-col justify-center w-min gap-1 items-start">
        <h3 className="font-bold text-sm text-primary">
          {offer.brand.name.toUpperCase()}
        </h3>
        <h3 className="text-sm font-bold w-max">{offer.title}</h3>
        <p className="bg-[#937ef3] text-white rounded-md px-1 text-xs">
          {capitalize(offer.type)}
        </p>
      </div>
    </Link>
  );
};

export default SearchOffer;

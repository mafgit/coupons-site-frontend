import useStore from "@/hooks/useStore";
import { IBrand } from "@/types/IBrand";
import Link from "next/link";

export interface IExtendedBrand extends IBrand {
  couponCount: number;
}

const SearchBrand = ({ brand }: { brand: IExtendedBrand }) => {
  const closeSearch = useStore((s) => s.closeSearch);
  return (
    <Link className="" href={`/brand/${brand.slug}`} onClick={closeSearch}>
      <h2 className="text-primary">{brand.name}</h2>
      <p className="text-sm text-gray-800">
        {brand.couponCount === 0
          ? "No offers yet"
          : brand.couponCount === 1
          ? "View 1 offer"
          : `View ${brand.couponCount} offers`}
      </p>
    </Link>
  );
};

export default SearchBrand;

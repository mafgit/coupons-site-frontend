import { IBrand } from "@/types/IBrand";
import Link from "next/link";

const SearchBrand = ({ brand }: { brand: IBrand }) => {
  return (
    <Link className="" href={`/brand/${brand.name}`}>
      <h2 className="text-primary">{brand.name}</h2>
      <p className="text-sm text-gray-800">View 13 offers</p>
    </Link>
  );
};

export default SearchBrand;

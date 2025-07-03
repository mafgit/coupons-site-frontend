import TableContainer from "@/components/dashboard/TableContainer";
import { ICoupon } from "@/types/ICoupon";

const Coupons = () => {
  return (
    <TableContainer<ICoupon>
      entity="coupon"
      searchFields={[
        { label: "_id", type: "text" },
        { label: "title", type: "text" },
        { label: "price", type: "number" },
        { label: "code", type: "text" },
        { label: "verified", type: "text" },
        { label: "type", type: "text" },
        { label: "brand", type: "text" }
      ]}
    />
  );
};

export default Coupons;

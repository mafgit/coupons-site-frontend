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
        {
          label: "verified",
          type: "text",
          options: true,
          values: [
            { _id: "true", value: "True" },
            { _id: "false", value: "False" },
          ],
        },
        {
          label: "type",
          type: "text",
          options: true,
          values: [
            { _id: "code", value: "Code" },
            { _id: "deal", value: "Deal" },
          ],
        },
        { label: "brand", type: "text", options: true },
      ]}
      allowDrag={true}
    />
  );
};

export default Coupons;

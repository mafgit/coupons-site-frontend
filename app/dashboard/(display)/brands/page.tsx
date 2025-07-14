import TableContainer from "@/components/dashboard/TableContainer";
import { IBrand } from "@/types/IBrand";

const Brands = () => {
  return (
    <TableContainer<IBrand>
      entity="brand"
      searchFields={[
        { label: "name", type: "text" },
        { label: "_id", type: "text" },
        { label: "category", type: "text", options: true },
        { label: "slug", type: "text" },
      ]}
      allowDrag={true}
    />
  );
};

export default Brands;

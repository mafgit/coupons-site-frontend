import TableContainer from "@/components/dashboard/TableContainer";
import { ICategory } from "@/types/ICategory";

const Categories = () => {
  return (
    <TableContainer<ICategory>
      entity="category"
      searchFields={[
        { label: "name", type: "text" },
        { label: "_id", type: "text" },
      ]}
    />
  );
};

export default Categories;

import TableContainer from "@/components/dashboard/TableContainer";
import { IUser } from "@/types/IUser";

const Users = () => {
  return (
    <TableContainer<IUser>
      entity="user"
      searchFields={[
        { label: "_id", type: "text" },
        { label: "name", type: "text" },
        { label: "email", type: "email" },
        { label: "role", type: "text" },
      ]}
    />
  );
};

export default Users;

import TableContainer from "@/components/dashboard/TableContainer";
import { IUser } from "@/types/IUser";

const Users = () => {
  return (
    <TableContainer<IUser>
      entity="user"
      // allowDrag={true}
      searchFields={[
        { label: "_id", type: "text" },
        { label: "name", type: "text" },
        { label: "email", type: "email" },
        {
          label: "role",
          type: "text",
          options: true,
          values: [
            { _id: "user", value: "User" },
            { _id: "admin", value: "Admin" },
          ],
        },
      ]}
    />
  );
};

export default Users;

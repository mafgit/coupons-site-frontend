import AddForm from "@/components/dashboard/AddForm";
import { IEntity } from "@/types/IEntity";

const page = async ({ params }: { params: { entity: IEntity } }) => {
  const { entity } = await params;

  return (
    <div className="mt-[20px] min-h-[calc(100vh-140px)] flex items-center justify-center">
      <AddForm
        entity={entity}
        fields={
          entity === "brand"
            ? [
                { label: "name" },
                { label: "description" },
                { label: "website" },
                { label: "image" },
                { label: "category", options: true },
                { label: "slug" },
              ]
            : entity === "category"
            ? [{ label: "name" }]
            : entity === "coupon"
            ? [
                { label: "title" },
                { label: "code" },
                { label: "terms_and_conditions" },
                { label: "brand", options: true },
                { label: "price", type: "number" },
                {
                  label: "verified",
                  options: true,
                  values: [
                    { value: "true", _id: "true" },
                    { value: "false", _id: "false" },
                  ],
                },
              ]
            : entity === "user"
            ? [
                { label: "name" },
                { label: "email", type: "email" },
                {
                  label: "role",
                  options: true,
                  values: [
                    { value: "admin", _id: "admin" },
                    { value: "user", _id: "user" },
                  ],
                },
                { label: "password", type: "password" },
                { label: "image", required: false },
              ]
            : []
        }
      />
    </div>
  );
};

export default page;

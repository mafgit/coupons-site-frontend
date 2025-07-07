import AddForm from "@/components/dashboard/AddForm";
import { IEntity } from "@/types/IEntity";

const page = async ({
  params,
}: {
  params: { entity: IEntity; id: string };
}) => {
  const { entity, id } = await params;
console.log(entity, id);

  return (
    <div className="mt-8">
      <AddForm
        entity={entity}
        editId={id}
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
                { label: "website" },
                { label: "brand", options: true },
                { label: "price", type: "number" },
                {
                  label: "verified",
                  options: true,
                  values: [{ value: "true" }, { value: "false" }],
                },
              ]
            : entity === "user" ? [
                { label: "name" },
                { label: "email" },
                {
                  label: "role",
                  options: true,
                  values: [{ value: "user" }, { value: "admin" }],
                },
                { label: "password", type: "password" }
              ]
            : []
        }
      />
    </div>
  );
};

export default page;

import AddForm from "@/components/dashboard/AddForm";
import { IEntity } from "@/types/IEntity";

const page = async ({ params }: { params: { entity: IEntity } }) => {
  const { entity } = await params;

  return (
    <div className="my-10">
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
                { label: "website" },
                { label: "brand", options: true },
                { label: "price", type: "number" },
                {
                  label: "verified",
                  options: true,
                  values: [{ value: "true" }, { value: "false" }],
                },
              ]
            : []
        }
      />
    </div>
  );
};

export default page;

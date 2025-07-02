"use client";
import AddForm from "@/components/dashboard/AddForm";
import Table from "@/components/dashboard/Table";
import { IBrand } from "@/types/IBrand";
import React, { useEffect, useState } from "react";

const Brands = () => {
  const [data, setData] = useState<IBrand[]>([]);
  const [addFormOpened, setAddFormOpened] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/brand/all")
      .then((res) => res.json())
      .then(({ brands }) => {
        setData(brands);
      });
  }, []);

  return (
    <div className="max-w-[95%] mx-auto my-4">
      <div className=" mt-8 mb-4 flex items-center justify-center gap-4">
        <h1 className="text-3xl text-center font-semibold">Brands Dashboard</h1>
        <button
          onClick={() => setAddFormOpened(true)}
          className="bg-primary p-2 text-white rounded-md text-sm"
        >
          Add
        </button>
      </div>

      {addFormOpened && (
        <AddForm
          fields={[
            {
              type: "text",
              label: "name",
              required: true,
            },
            {
              type: "text",
              label: "category",
              required: true,
            },
            {
              type: "number",
              label: "price",
              required: true,
            },
            {
              type: "text",
              label: "image",
              required: true,
            },
            {
              type: "text",
              label: "website",
              required: true,
            },
            {
              type: "text",
              label: "description",
              required: true,
            },
          ]}
        />
      )}

      {data.length ? (
        <Table data={data} fields={Object.keys(data[0]) as (keyof IBrand)[]} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Brands;

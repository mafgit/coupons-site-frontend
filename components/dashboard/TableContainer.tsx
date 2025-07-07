"use client";

import { IEntity } from "@/types/IEntity";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Table from "./Table";
import { FaMagnifyingGlass } from "react-icons/fa6";

const TableContainer = <T extends { _id: string }>({
  entity,
  searchFields,
}: {
  entity: IEntity;
  searchFields: { label: keyof T; type: "text" | "number" | "email" }[];
}) => {
  const [data, setData] = useState<T[]>([]);
  const [queries, setQueries] = useState(
    Object.fromEntries(searchFields.map((field) => [field.label as string, ""]))
  );

  useEffect(() => {
    const queryString = Object.entries(queries).reduce((a, b) => {
      return b[1] &&
        ((typeof b[1] === "string" && b[1].length > 0) ||
          typeof b[1] === "number")
        ? a + `${b[0]}=${b[1]}&`
        : a;
    }, "");

    const fetchUrl = `http://localhost:5000/api/${entity}/all?${queryString}`;
    console.log(fetchUrl);

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(
          data[
            entity === "brand"
              ? "brands"
              : entity === "category"
              ? "categories"
              : entity === "user"
              ? "users"
              : "coupons"
          ].map((x: T) => {
            if (entity === "brand") {
              return {
                ...x,
                category: (x as any).category.name,
              };
            } else if (entity === "coupon") {
              return {
                ...x,
                brand: (x as any).brand.name,
              };
            } else return x;
          })
        );

        setData(
          data[
            entity === "brand"
              ? "brands"
              : entity === "category"
              ? "categories"
              : entity === "user"
              ? "users"
              : "coupons"
          ].map((x: T) => {
            if (entity === "brand") {
              return {
                ...x,
                category: (x as any).category.name,
              };
            } else if (entity === "coupon") {
              return {
                ...x,
                brand: (x as any).brand.name,
              };
            } else return x;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [queries]);

  return (
    <div className="max-w-[95%] mx-auto my-4">
      <div className=" mt-8 mb-4 flex items-center justify-center gap-4">
        <h1 className="text-3xl text-center font-semibold">
          {capitalize(entity)} Dashboard
        </h1>
        <Link
          href={`/dashboard/add/${entity}`}
          className="bg-primary p-2 text-white rounded-md text-sm"
        >
          Add
        </Link>
      </div>

      <div className="flex items-center justify-center w-full mx-auto mb-2 text-xs gap-4 flex-wrap mt-8">
        {searchFields.map((searchField) => (
          <div
            className="flex items-center justify-center gap-2"
            key={"search-field-" + (searchField.label as string)}
          >
            <label className=" text-gray-600">
              {capitalize(searchField.label as string)}
            </label>
            <input
              type={searchField.type}
              placeholder="Lorem ipsum"
              className="p-2 rounded-full border-2 border-primary bg-white outline-0 w-full"
              value={queries[searchField.label as string]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQueries({
                  ...queries,
                  [searchField.label as string]: e.target.value,
                })
              }
            />
          </div>
        ))}

        {/* <Link href={"/search?q=" + query} className="absolute right-[7px]">
          <FaMagnifyingGlass className="bg-primary w-full h-full p-2 rounded-full text-white" />
        </Link> */}
      </div>

      {data.length ? (
        <Table<T>
          data={data}
          setData={setData}
          fields={Object.keys(data[0]) as (keyof T)[]}
          entity={entity}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableContainer;

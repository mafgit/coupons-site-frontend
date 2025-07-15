"use client";

import { IEntity } from "@/types/IEntity";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Table from "./Table";
import { FaBan } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";

const TableContainer = <T extends { _id: string; order?: number }>({
  entity,
  searchFields,
  allowDrag = false,
}: {
  entity: IEntity;
  allowDrag?: boolean;
  searchFields: {
    label: keyof T;
    type: "text" | "number" | "email";
    options?: boolean;
    values?: any;
    required?: boolean;
    placeholder?: string;
  }[];
}) => {
  const [data, setData] = useState<T[]>([]);
  const [queries, setQueries] = useState(
    Object.fromEntries(searchFields.map((field) => [field.label as string, ""]))
  );
  const [options, setOptions] = useState<{
    [key: string]: { _id: string; [key: string]: string | number }[];
  }>({});
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    // const promises = [];
    for (let field of searchFields) {
      if (field.options && !field.values) {
        // promises.push(
        //   fetch("http://localhost:5000/api/" + field.label + "/all")
        // );
        fetch("http://localhost:5000/api/" + (field.label as string) + "/all")
          .then((res) => res.json())
          .then((data) => {
            setOptions((options: any) => ({
              ...options,
              [field.label]:
                data[
                  field.label === "brand"
                    ? "brands"
                    : field.label === "category"
                    ? "categories"
                    : "coupons"
                ],
            }));
          })
          .catch((err) => console.log(err));
      } else if (field.options && field.values && field.values.length > 0) {
        setOptions((options: any) => ({
          ...options,
          [field.label]: field.values,
        }));
        // console.log({
        //   ...options,
        //   [field.label]: field.values,
        // });
      }
    }
  }, []);

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

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;

    timeoutRef.current = setTimeout(() => {
      setLoading(true);
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
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, [queries]);

  return (
    <div className="max-w-[95%] mx-auto my-4">
      <div className=" mt-8 mb-4 flex items-center justify-center gap-4">
        <h1 className="text-2xl sm:text-3xl text-center font-semibold">
          {capitalize(entity)} Dashboard
        </h1>
        <Link
          href={`/dashboard/add/${entity}`}
          className="bg-primary p-2 text-white rounded-md text-sm flex items-center justify-center gap-2 "
        >
          <FaPlusCircle />
          <span>Add</span>
        </Link>
      </div>

      <div className="flex items-center justify-center w-full mx-auto mb-2 text-xs gap-6 flex-wrap mt-8">
        {searchFields.map(
          (field) =>
            !field.options ? (
              <div
                className="flex gap-2 items-center justify-between w-[92%] sm:w-auto"
                key={"search-field-" + (field.label as string)}
              >
                <label
                  htmlFor={field.label as string}
                  className=" text-gray-600 text-sm"
                >
                  {capitalize(field.label as string)}
                </label>
                <input
                  id={field.label as string}
                  className="px-2 py-2 bg-gray-50 text-gray-900 rounded-lg border-none outline-primary text-sm w-[200px]"
                  type={field.type || "text"}
                  value={queries[field.label as string]}
                  placeholder={field.placeholder ?? "e.g. Lorem ipsum"}
                  required={field.required ?? true}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQueries({ ...queries, [field.label]: e.target.value })
                  }
                />
              </div>
            ) : (
              <div
                className="flex gap-2 items-center justify-between w-[92%] sm:w-auto"
                key={"search-field-" + (field.label as string)}
              >
                {" "}
                <label
                  htmlFor={field.label as string}
                  className=" text-gray-600 text-sm"
                >
                  {capitalize(field.label as string)}
                </label>
                <select
                  id={field.label as string}
                  className="px-2 py-2 bg-gray-50 text-gray-900 rounded-lg border-none outline-primary text-sm w-[200px]"
                  required={field.required ?? true}
                  value={queries[field.label as string]}
                  onChange={(e) => {
                    setQueries({ ...queries, [field.label]: e.target.value });
                    console.log(e.target.value);
                  }}
                >
                  <option value="">All</option>
                  {options[field.label as string] ? (
                    options[field.label as string].map((option: any) => (
                      <option
                        value={option._id}
                        key={"option-" + (option._id ?? option.value)}
                      >
                        {
                          option[
                            field.label === "brand"
                              ? "name"
                              : field.label === "category"
                              ? "name"
                              : field.label === "coupon"
                              ? "title"
                              : "value"
                          ]
                        }
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            )

          // <div
          //   className="flex items-center justify-center gap-2"
          //   key={"search-field-" + (searchField.label as string)}
          // >
          //   <label className=" text-gray-600">
          //     {capitalize(searchField.label as string)}
          //   </label>
          //   <input
          //     type={searchField.type}
          //     placeholder="Lorem ipsum"
          //     className="p-2 rounded-full border-2 border-primary bg-white outline-0 w-full"
          //     value={queries[searchField.label as string]}
          //     onChange={(e: ChangeEvent<HTMLInputElement>) =>
          //       setQueries({
          //         ...queries,
          //         [searchField.label as string]: e.target.value,
          //       })
          //     }
          //   />
          // </div>
        )}

        {/* <Link href={"/search?q=" + query} className="absolute right-[7px]">
          <FaMagnifyingGlass className="bg-primary w-full h-full p-2 rounded-full text-white" />
        </Link> */}
      </div>

      {loading ? (
        <div className="w-full h-full mt-[70px] flex items-center justify-center">
          <div className="animate-spin border-l-2 border-r-2 border-primary w-8 h-8 rounded-full"></div>
        </div>
      ) : data.length ? (
        <Table<T>
          data={data}
          setData={setData}
          fields={Object.keys(data[0]) as (keyof T)[]}
          entity={entity}
          allowDrag={allowDrag}
        />
      ) : (
        <h3 className="text-center flex items-center justify-center gap-2 flex-col text-gray-700 mt-[70px]">
          <FaBan className="text-3xl text-red-500" /> <span>No Data Found</span>
        </h3>
      )}
    </div>
  );
};

export default TableContainer;

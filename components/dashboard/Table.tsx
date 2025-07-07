"use client";
import { IEntity } from "@/types/IEntity";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaPen, FaTrash } from "react-icons/fa6";

const defaultColors = [
  "bg-[#e7f0fd]", // baby blue
  "bg-[#f1e8fb]", // lavender mist
  "bg-[#e7fbf1]", // mint cream
  "bg-[#fff4e8]", // peach cream
  "bg-[#fce7ee]", // soft rose
];

// const colors = [
//   "bg-[#f0f6ff]", // ice blue
//   "bg-[#e1edff]", // cloud blue
//   "bg-[#d2e5ff]", // soft azure
//   "bg-[#c4ddff]", // sky tint
//   "bg-[#b5d5ff]", // powder blue
// ];

// const colors = [
//   "bg-[#eaf8f8]", // ice mint
//   "bg-[#edf6ff]", // mist sky
//   "bg-[#f8f1ff]", // whisper lilac
//   "bg-[#fef6e4]", // soft peach
//   "bg-[#fdf1f5]", // blush white
// ];

function Table<T extends { _id: string }>({
  data,
  setData,
  fields,
  colors = defaultColors,
  entity,
}: {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  fields: (keyof T)[];
  entity: IEntity;
  colors?: string[];
}) {
  fields = fields.filter((field) => field !== "__v");

  const [sortedBy, setSortedBy] = useState<null | string>(null);
  const [ascending, setAscending] = useState<null | boolean>(null);
  const [shownData, setShownData] = useState<T[]>([]);

  useEffect(() => {
    if (sortedBy) {
      setShownData(
        shownData.sort((a: T, b: T) => {
          let x = a[sortedBy as keyof T];
          let y = b[sortedBy as keyof T];
          if (typeof x === "number" && typeof y === "number") {
            return ascending ? x - y : y - x;
          } else if (typeof x === "string" && typeof y === "string") {
            return ascending ? x.localeCompare(y) : y.localeCompare(x);
          }
          return 1;
        })
      );
    }
  }, [sortedBy, ascending]);

  useEffect(() => {
    setShownData(data);
  }, [data]);

  return (
    <div className="table-div custom-scrollbar overflow-auto rounded-xl pb-3 mt-6">
      <table className="min-w-full p-2 text-left">
        <thead className="bg-primary text-white font-semibold p-2">
          <tr>
            <th className="capitalize p-2"></th>
            {fields.map((field: keyof T) => (
              <th
                className="capitalize"
                key={"th-" + (field as string)}
                onClick={() => {
                  setSortedBy(field as string);
                  setAscending(!ascending);
                }}
              >
                <div className="p-2 flex justify-start gap-2 items-center cursor-pointer">
                  {capitalize(field as string)}
                  {sortedBy === field ? (
                    ascending ? (
                      <FaArrowUp className="text-sm" />
                    ) : (
                      <FaArrowDown className="text-sm" />
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {shownData.map((row: T, r: number) => (
            <tr key={"tr-" + r} className="max-h-[50px]">
              <td
                className={`overflow-x-scroll text-sm max-w-[250px] overflow-y-hidden whitespace-nowrap scrollbar-thin`}
              >
                <div className={`w-full h-full p-2 inline-block text-gray-800`}>
                  <div className="flex flex-col w-full h-full gap-2">
                    <Link
                      className="bg-blue-400 w-[25px] h-[25px] flex items-center justify-center px-2 py-1 text-white rounded-full"
                      href={`/dashboard/edit/${entity}/${row._id}`}
                    >
                      <FaPen />
                    </Link>
                    <button
                      onClick={() => {
                        fetch(
                          "http://localhost:5000/api/" +
                            entity +
                            "/delete/" +
                            row._id,
                          { method: "DELETE", credentials: "include" }
                        ).then((res) => {
                          if (res.ok) {
                            alert("Deleted Successfully");
                            window.location.reload();
                          }
                        });
                      }}
                      className="bg-red-400 w-[25px] h-[25px] flex items-center justify-center px-2 py-1 text-white rounded-full"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </td>
              {fields.map((field: keyof T, c: number) => (
                <td
                  className={`overflow-x-scroll text-sm max-w-[250px] overflow-y-hidden whitespace-nowrap scrollbar-thin ${
                    colors[c % colors.length]
                  }`}
                  key={"td-" + r + "-" + c}
                >
                  <div
                    className={`w-full h-full p-2 inline-block text-gray-800`}
                  >
                    {field !== "image" ? (
                      String(row[field])
                    ) : (
                      // <Image
                      //   src={String(row[field]) as string}
                      //   width={100}
                      //   height={100}
                      //   alt="logo"
                      // />
                      <img
                        className="rounded-md max-h-[50px]"
                        src={String(row[field]) || '/default-profile-pic.jpg'}
                        alt=""
                      />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

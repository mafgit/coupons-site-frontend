"use client";
import { IEntity } from "@/types/IEntity";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaInfoCircle, FaSave } from "react-icons/fa";
import { FaArrowDown, FaArrowUp, FaBan, FaPen, FaTrash } from "react-icons/fa6";

// const defaultColors = [
//   "bg-[#e7f0fd]", // baby blue
//   "bg-[#f1e8fb]", // lavender mist
//   "bg-[#e7fbf1]", // mint cream
//   "bg-[#fff4e8]", // peach cream
//   "bg-[#fce7ee]", // soft rose
// ];
const defaultColors = [
  "bg-[#e7f0fd]", // Baby Blue - A soft, soothing light blue.
  "bg-[#e7fbf1]", // Mint Cream - A very gentle, almost white, light green.
  "bg-[#f0f8ff]", // Alice Blue - An even lighter, almost ethereal blue.
  "bg-[#f5fffa]", // Mint Green Light - A slightly cooler, very subtle light green.
];

// const defaultColors = [
//   "bg-[#D0F0C0]",
//   "bg-[#C8FAD6]",
//   "bg-[#BCCDA4]",
//   "bg-[#ACE1AF]",
//   "bg-[#C5E8B6]",
// ];

function Table<T extends { _id: string; order?: number }>({
  data,
  setData,
  fields,
  colors = defaultColors,
  entity,
  allowDrag = false,
}: {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  fields: (keyof T)[];
  entity: IEntity;
  colors?: string[];
  allowDrag?: boolean;
}) {
  fields = fields.filter(
    (field) =>
      ![
        "__v",
        "_id",
        "description",
        "more_about",
        "order",
        "view_count",
      ].includes(field as string)
  );
  const [sortedBy, setSortedBy] = useState<string>("order");
  const [ascending, setAscending] = useState<boolean>(true);
  const [shownData, setShownData] = useState<T[]>([]);
  const [dragging, setDragging] = useState(false);
  const [draggedRows, setDraggedRows] = useState<
    { _id: string; order: number }[]
  >([]);

  // const refs = useRef<(null | HTMLElement)[]>(
  //   Array.from({ length: data.length }).fill(null) as Array<null | HTMLElement>
  // );
  const [draggingIdx, setDraggingIdx] = useState(-1);
  const [draggedOverIdx, setDraggedOverIdx] = useState(-1);

  const onDragStart = (e: any, id: any) => {
    if (!allowDrag) return;
    setDragging(true);
    // e.dataTransfer.effectAllowed = "move";
    setDraggingIdx(id);
  };

  const onDragOver = (e: any) => {
    if (!allowDrag) return;

    e.preventDefault();
  };

  const onDragEnter = (e: any, id: any) => {
    if (!allowDrag) return;

    setDraggedOverIdx(id);
  };

  const onDrop = () => {
    if (!allowDrag) return;

    const clearDragStates = () => {
      setDraggedOverIdx(-1);
      setDraggingIdx(-1);
    };

    if (draggedOverIdx === -1 || draggingIdx === -1) {
      return clearDragStates();
    }
    if (draggedOverIdx === draggingIdx) {
      return clearDragStates();
    }

    console.log('draggingIdx, draggedOverIdx', draggingIdx, draggedOverIdx);
    

    const draggedId = shownData[draggingIdx]._id;
    const before =
      draggedOverIdx - 1 >= 0 ? shownData[draggedOverIdx - 1].order : null;
    const after = shownData[draggedOverIdx].order;

    console.log(before, after);
    let newData = [...shownData];
    const [removed] = newData.splice(draggingIdx, 1);

    if (before === null) {
      removed.order = (after as number) - 100;
    } else {
      removed.order = ((before as number) + (after as number)) / 2;
    }
    newData.splice(draggedOverIdx, 0, removed);
    setShownData(newData);
    // const [removedRef] = refs.current.splice(draggingIdx, 1);
    // refs.current.splice(draggedOverIdx, 0, removedRef);
    setDraggedRows((draggedRows: any[]) => [
      ...draggedRows,
      { _id: draggedId, order: removed.order },
    ]);

    clearDragStates();
  };

  useEffect(() => {
    // console.log(sortedBy, ascending);
    let oldData = shownData.length > 0 ? [...shownData] : [...data];

    if (sortedBy && ascending !== null) {
      setShownData(
        oldData.sort((a: T, b: T) => {
          let x = a[sortedBy as keyof T];
          let y = b[sortedBy as keyof T];
          if (typeof x === "number" && typeof y === "number") {
            return ascending ? x - y : y - x;
          } else if (typeof x === "string" && typeof y === "string") {
            return ascending ? x.localeCompare(y) : y.localeCompare(x);
          } else if (typeof x === "boolean" && typeof y === "boolean") {
            if (x === y) return 0;
            return ascending ? (x > y ? 1 : -1) : x > y ? -1 : 1;
          }
          return 0;
        })
      );
    } else {
      setShownData(
        oldData.sort((a: T, b: T) => {
          if (a.order && b.order) return a.order - b.order;
          return 0;
        })
      );
    }
  }, [data, sortedBy, ascending]);

  // useEffect(() => {
  //   setShownData(
  //     [...data].sort((a: T, b: T) => {
  //       if (a.order && b.order) return a.order - b.order;
  //       return 0;
  //     })
  //   );
  // }, [data]);

  useEffect(() => {
    console.log("draggedRows", draggedRows);
  }, [draggedRows]);
  return (
    <div className="mt-3">
      {dragging && draggedRows.length > 0 && (
        <div className="mx-auto flex items-center justify-end py-2 gap-2">
          <button
            onClick={() => {
              fetch(`http://localhost:5000/api/${entity}/reorder`, {
                method: "POST",
                body: JSON.stringify({
                  // draggedId,
                  // new_order: removed.order,
                  new_orders: draggedRows,
                  // draggedId: newData[draggingIdx]._id,
                  // draggedOverId: newData[draggedOverIdx]._id,
                  // beforeDraggedOverId:
                  //   draggedOverIdx - 1 < 0 ? null : newData[draggedOverIdx - 1]._id,
                }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
              })
                .then((res) => {
                  res.json();
                  setDragging(false);
                  setDraggedRows([]);
                })
                .catch((err) => console.log(err));
              // .finally(() => {});
            }}
            className="bg-blue-400 p-2 rounded-md text-white items-center justify-center flex gap-2"
          >
            <FaSave /> <span>Save Order</span>
          </button>
          <button
            onClick={() => {
              setShownData(data);
              setAscending(true);
              setSortedBy("order");
              setDragging(false);
              setDraggedRows([]);
            }}
            className="bg-red-400 p-2 rounded-md text-white items-center justify-center flex gap-2"
          >
            <FaBan /> <span>Cancel Changes</span>
          </button>
        </div>
      )}
      <div className="table-div custom-scrollbar overflow-auto rounded-xl pb-3">
        <table className="bg-background min-w-full p-2 text-left">
          <thead className="bg-primary text-white font-semibold p-2">
            <tr>
              <th className="capitalize p-2"></th>
              {fields.map((field: keyof T) => (
                <th
                  className="capitalize"
                  key={"th-" + (field as string)}
                  onClick={() => {
                    if (sortedBy !== (field as string)) {
                      setAscending(true);
                      setSortedBy(field as string);
                    } else {
                      if (ascending === false) {
                        setAscending(true);
                        setSortedBy("order");
                        return;
                      } else {
                        setAscending(false);
                        setSortedBy(field as string);
                      }
                    }
                  }}
                >
                  <div className="p-2 flex justify-start gap-2 items-center cursor-pointer w-max">
                    {capitalize(field as string)}
                    {sortedBy === field ? (
                      ascending === true ? (
                        <FaArrowUp className="text-sm" />
                      ) : ascending === false ? (
                        <FaArrowDown className="text-sm" />
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="border-collapse">
            {shownData.map((row: T, r: number) => (
              <tr
                key={"tr-" + r}
                className={
                  "max-h-[50px] transition-none duration-200 bg-none cursor-grab m-0 p-0"
                }
                id={row._id}
                draggable={allowDrag ? true : false}
                onDragStart={(e) => onDragStart(e, r)}
                onDragOver={(e) => onDragOver(e)}
                onDragEnter={(e) => onDragEnter(e, r)}
                onDrop={(_) => onDrop()}
                onDragEnd={() => {
                  setDraggingIdx(-1)
                  setDraggedOverIdx(-1);
                }}
                // ref={(el) => {
                //   refs.current[r] = el;
                // }}
              >
                <td
                  className={`text-sm max-w-[250px] w-[70px] scrollbar-thin bg-none`}
                >
                  <div
                    className={`h-full w-min p-2 inline-flex items-center justify-center text-gray-800 bg-none`}
                  >
                    <div className="flex w-min h-full gap-2 bg-none">
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
                    draggable={false}
                    className={` text-sm max-w-[250px]  whitespace-nowrap bg-none max-h-[80px]  border-b-1 border-white/60`}
                    key={"td-" + r + "-" + c}
                  >
                    <div
                      className={
                        "block w-full transition-all duration-200 bg-none  " +
                        (draggedOverIdx !== -1 &&
                        draggingIdx !== -1 &&
                        draggedOverIdx === r &&
                        draggingIdx !== draggedOverIdx
                          ? "h-[30px]"
                          : "h-0")
                      }
                    ></div>
                    <div
                      className={`td-main relative  w-[full] flex items-center align-middle p-2 text-gray-800 h-[50px] ${
                        colors[c % colors.length]
                      }`}
                    >
                      {field !== "image" ? (
                        <>
                          <div
                            className="show-tip-div transition-all duration-200 opacity-0 cursor-default show-tip absolute top-[5px] right-[5px] text-md text-gray-400"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <FaInfoCircle className="show-tip" />
                            <p
                              draggable={false}
                              className="tip rounded-md transition-all scale-0 duration-200 text-black bg-yellow-200/85 p-2 absolute top-[-100%] right-[0%] h-max w-max max-w-[300px] overflow-visible  text-center text-wrap pointer-events-none opacity-0 z-[200]"
                            >
                              {String(row[field])}
                            </p>
                          </div>
                          <p className="text-ellipsis overflow-x-hidden overflow-y-hidden ">
                            {String(row[field])}
                          </p>
                        </>
                      ) : (
                        // <Image
                        //   src={String(row[field]) as string}
                        //   width={100}
                        //   height={100}
                        //   alt="logo"
                        // />
                        <img
                          className="rounded-md object-cover mx-auto h-[45px] w-[100px] bg-white"
                          src={String(row[field]) || "/default-profile-pic.jpg"}
                          alt="entity image"
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
    </div>
  );
}

export default Table;

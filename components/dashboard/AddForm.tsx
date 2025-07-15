"use client";
import { IEntity } from "@/types/IEntity";
import { capitalize } from "@/utils/capitalize";
import { ChangeEvent, useEffect, useState } from "react";

interface FormField {
  type?: "text" | "number" | "password" | "email";
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: boolean;
  values?: any[];
}

const AddForm = ({
  fields,
  entity,
  editId,
}: {
  fields: FormField[];
  entity: IEntity;
  editId?: string;
}) => {
  const [form, setForm] = useState(
    Object.fromEntries(
      fields.map((field) => [field.label, field.type === "number" ? 0 : ""])
    )
  );

  const [options, setOptions] = useState<{
    [key: string]: { _id: string; [key: string]: string | number }[];
  }>({});

  useEffect(() => {
    if (editId && editId.length > 0) {
      fetch("http://localhost:5000/api/" + entity + "/by-id/" + editId)
        .then((res) => res.json())
        .then((data) => {
          console.log("39", data);
          setForm(data[entity]);
        });
    }

    // const promises = [];
    for (let field of fields) {
      if (field.options && !field.values) {
        // promises.push(
        //   fetch("http://localhost:5000/api/" + field.label + "/all")
        // );
        fetch("http://localhost:5000/api/" + field.label + "/all")
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
    // if(promises.length)
    //     Promise.all(promises).then(res => )
  }, []);

  useEffect(() => {
    console.log("yo", options);
  }, [options]);

  return (
    <form
      className="bg-[#eeeeee] px-4 py-8 sm:p-8 flex flex-col gap-4 rounded-xl w-[95%] sm:w-max mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        if (editId && editId.length > 0) {
          fetch("http://localhost:5000/api/" + entity + "/edit/" + editId, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(form),
          }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
              alert("Edited Successfully");
              window.location.reload();
              return data;
            } else throw data;
          });
        } else {
          fetch("http://localhost:5000/api/" + entity + "/add", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(form),
          }).then((res) => {
            if (res.ok) {
              alert("Added Successfully");
              window.location.reload();
            }
          });
        }
      }}
    >
      <h1 className="text-center font-semibold text-xl mb-2 text-primary">
        {editId && editId.length > 0 ? "Edit" : "Add"} {capitalize(entity)}
      </h1>

      <div className="grid sm:grid-cols-2 gap-3 w-full gap-x-6">
        {fields.map((field, i) => (
          <div
            className={
              "flex flex-col gap-1 focus-within:text-primary transition-all duration-200 " +
              (fields.length === 1 ? "col-span-2" : "")
            }
            key={"field-" + field.label}
          >
            <label htmlFor={field.label} className="text-sm">
              {capitalize(field.label)}
            </label>
            {!field.options ? (
              <input
                id={field.label}
                className="px-2 py-2 bg-gray-50 rounded-lg border-none outline-primary text-sm "
                type={field.type || "text"}
                value={form[field.label]}
                placeholder={field.placeholder ?? "e.g. Lorem ipsum"}
                required={field.required ?? true}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, [field.label]: e.target.value })
                }
              />
            ) : (
              <select
                className="px-2 py-2 bg-gray-50 rounded-lg border-none outline-primary text-sm"
                required={field.required ?? true}
                value={form[field.label]}
                onChange={(e) => {
                  setForm({ ...form, [field.label]: e.target.value });
                  console.log(e.target.value);
                }}
              >
                {options[field.label] ? (
                  options[field.label].map((option: any) => (
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
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-2 p-2 bg-primary rounded-lg w-full text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default AddForm;

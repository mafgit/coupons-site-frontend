"use client";
import { ChangeEvent, useState } from "react";

interface FormField {
  type: "text" | "number";
  label: string;
  required: boolean;
}

const AddForm = ({ fields }: { fields: FormField[] }) => {
  const [form, setForm] = useState(
    Object.fromEntries(
      fields.map((field) => [field.label, field.type === "text" ? "" : 0])
    )
  );

  return (
    <div className="overflow-y-scroll overflow-x-hidden">
      <div className="absolute top-0 left-0 w-screen min-h-screen">
        <form className="bg-gray-300 z-[20] absolute top-[80px] left-1/2 -translate-x-1/2 flex flex-col gap-4 p-4 rounded-xl">
          <h1 className="text-center font-bold text-xl mb-2">Add Entry Form</h1>

          <div className="grid grid-cols-2 gap-3 w-full">
            {fields.map((field, i) => (
              <div className="flex flex-col gap-2">
                <label>{field.label.toUpperCase()}</label>
                <input
                  className="px-2 py-2 bg-white text-black rounded-full border-none "
                  type={field.type}
                  value={form[field.label]}
                  required={field.required}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, [field.label]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          <button type="submit" className="mt-2 p-2 bg-primary rounded-full w-full text-white">Submit</button>
        </form>
      </div>

      <div className="top-0 left-0 w-screen min-h-screen bg-black/70 z-10 fixed"></div>
    </div>
  );
};

export default AddForm;

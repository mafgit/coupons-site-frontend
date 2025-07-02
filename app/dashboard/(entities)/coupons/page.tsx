"use client";
import Table from "@/components/dashboard/Table";
import { IBrand } from "@/types/IBrand";
import React, { useEffect, useState } from "react";

const Coupons = () => {
  const [data, setData] = useState<IBrand[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/coupon/all")
      .then((res) => res.json())
      .then(({ coupons }) => {
        console.log(coupons);
        
        setData(coupons);
      });
  }, []);

  return (
    <div className="max-w-[95%] mx-auto my-4">
      <h1 className="text-3xl text-center font-semibold mt-8 mb-4">
        Coupons Dashboard
      </h1>
      {data.length ? (
        <Table data={data} fields={Object.keys(data[0]) as (keyof IBrand)[]} />
      ) : (
        <p className="text-center">No data found</p>
      )}
    </div>
  );
};

export default Coupons;

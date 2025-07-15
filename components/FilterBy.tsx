"use client";
import { ICoupon } from "@/types/ICoupon";
import React, { useEffect, useState } from "react";

const FilterByInput = ({
  label,
  value,
  setValue,
  setAll,
  setOnlineSale,
  setVoucherCode,
}: {
  label: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  setAll: React.Dispatch<React.SetStateAction<boolean>>;
  setOnlineSale: React.Dispatch<React.SetStateAction<boolean>>;
  setVoucherCode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center justify-between w-full gap-8">
      <label className="text-sm text-gray-800">{label}</label>
      <label
        htmlFor={label}
        className="relative w-[40px] h-[22px] rounded-full bg-gray-300 cursor-pointer"
      >
        <span
          className={
            "absolute top-[3px] transition-all duration-100 slider w-[15px] h-[15px] inline-block rounded-full " +
            (value ? "left-[22px] bg-primary" : "left-[2px] bg-gray-400")
          }
        ></span>
        <input
          className="w-0 h-0 opacity-0"
          type="checkbox"
          id={label}
          name={label}
          checked={value}
          onChange={() => {
            if (label === "All") {
              setAll(true);
              setOnlineSale(false);
              setVoucherCode(false);
            } else if (label === "Voucher Code") {
              if (value) {
                setAll(true);
                setVoucherCode(false);
                setOnlineSale(false);
              } else {
                setAll(false);
                setVoucherCode(true);
                setOnlineSale(false);
              }
            } else if (label === "Online Sale") {
              if (value) {
                setAll(true);
                setVoucherCode(false);
                setOnlineSale(false);
              } else {
                setAll(false);
                setVoucherCode(false);
                setOnlineSale(true);
              }
            }
          }}
        />
      </label>
    </div>
  );
};

const FilterBy = ({
  all,
  setAll,
  voucherCode,
  setVoucherCode,
  onlineSale,
  setOnlineSale,
  setShownCoupons,
  allCoupons,
}: {
  all: boolean;
  setAll: React.Dispatch<React.SetStateAction<boolean>>;
  voucherCode: boolean;
  setVoucherCode: React.Dispatch<React.SetStateAction<boolean>>;
  onlineSale: boolean;
  setOnlineSale: React.Dispatch<React.SetStateAction<boolean>>;
  setShownCoupons: React.Dispatch<React.SetStateAction<ICoupon[]>>;
  allCoupons: ICoupon[];
}) => {
  useEffect(() => {
    if (voucherCode)
      setShownCoupons(allCoupons.filter((c) => c.type === "code"));
    else if (onlineSale)
      setShownCoupons(allCoupons.filter((c) => c.type === "deal"));
    else setShownCoupons(allCoupons);
  }, [all, voucherCode, onlineSale]);

  return (
    <div className="flex flex-col gap-2 items-start justify-center w-full bg-gray-100  p-4 rounded-md">
      <h3 className="text-md text-center w-full text-gray-700 font-semibold">Filter by</h3>

      <FilterByInput
        label="All"
        value={all}
        setValue={setAll}
        setAll={setAll}
        setOnlineSale={setOnlineSale}
        setVoucherCode={setVoucherCode}
      />
      <FilterByInput
        label="Voucher Code"
        value={voucherCode}
        setValue={setVoucherCode}
        setAll={setAll}
        setOnlineSale={setOnlineSale}
        setVoucherCode={setVoucherCode}
      />
      <FilterByInput
        label="Online Sale"
        value={onlineSale}
        setValue={setOnlineSale}
        setAll={setAll}
        setOnlineSale={setOnlineSale}
        setVoucherCode={setVoucherCode}
      />
    </div>
  );
};

export default FilterBy;

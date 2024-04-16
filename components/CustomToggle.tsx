"use client";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { updateSearchParamsToggle } from "@/utils";
import { useRouter } from "next/navigation";

const CustomToggle = () => {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const handleUpdateParamsToggle = (e: boolean) => {
    const newPathName = updateSearchParamsToggle("gluten_free", e);
    router.push(newPathName);
  };

  return (
    <div className="w-fit mr-10">
      <div className="mt-1 flex gap-1">
        <p className="text-grey  text-[15px] ">Gluten Free</p>
        <Switch
          checked={enabled}
          onChange={(e) => {
            setEnabled(e);
            handleUpdateParamsToggle(e);
          }}
          className={`${enabled ? "bg-primary-brown" : "bg-primary-millet"}
      relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Gluten Free</span>
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-4" : "translate-x-0"}
        pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default CustomToggle;

import React from "react";
import { LuInbox } from "react-icons/lu";

const NoData = ({ message }) => {
  return (
    <div className="text-center w-full p-4 rounded-3xl bg-grey/50 mt-4">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <LuInbox className="text-5xl text-dark-grey" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NoData;

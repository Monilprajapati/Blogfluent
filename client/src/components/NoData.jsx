import React from "react";
import { LuInbox } from "react-icons/lu";

const NoData = ({ message }) => {
  return (
    <div className="text-center w-full p-4 rounded-full bg-grey/50 mt-4">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <LuInbox className="text-5xl text-gray-300" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NoData;

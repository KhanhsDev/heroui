import React from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const WatchList = () => {
  return (
    <div className="w-full h-full p-[1.6rem] overflow-x-hidden grid grid-cols-2">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default WatchList;

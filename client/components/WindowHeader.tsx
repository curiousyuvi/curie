import Image from "next/image";
import React from "react";

const WindowHeader = () => {
  return (
    <div className="w-full bg-indigo-500/50 flex justify-between items-center p-3 border border-t-0 border-x-0 border-indigo-300/30">
      <Image
        src="/assets/logo_with_heading.png"
        alt=""
        height={30}
        width={95}
      />
    </div>
  );
};

export default WindowHeader;

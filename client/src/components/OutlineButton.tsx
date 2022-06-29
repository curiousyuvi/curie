import React, { FC, ReactNode } from "react";

const OutlineButton: FC<{
  children: ReactNode;
  onClick?: () => void;
  type?: "red" | "orange" | "gray" | "indigo";
}> = ({ children, onClick, type = "gray" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full max-w-sm p-4 ${
        type === "gray"
          ? "border-indigo-300/30 bg-white/10 hover:text-gray-100"
          : ""
      } ${
        type === "red"
          ? "border-red-500/30 bg-red-500/20 text-red-500/80 hover:text-red-500"
          : ""
      } ${
        type === "orange"
          ? "border-orange-500/30 bg-orange-500/20 text-orange-500/80 hover:text-orange-500"
          : ""
      } ${
        type === "indigo"
          ? "border-indigo-400/30 bg-indigo-400/20 text-indigo-400/80 hover:text-indigo-400"
          : ""
      }  border rounded-lg duration-200 font-bold`}
    >
      {children}
    </button>
  );
};

export default OutlineButton;

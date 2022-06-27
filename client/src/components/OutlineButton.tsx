import React, { FC, ReactNode } from "react";

const OutlineButton: FC<{
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | null;
}> = ({ children, onClick, type }) => {
  return type ? (
    <button
      type="submit"
      className="w-full max-w-sm p-4 bg-transparent   hover:outline-8 hover:text-gray-100 rounded-lg duration-200 font-bold"
    >
      {children}
    </button>
  ) : (
    <button
      onClick={onClick}
      className="w-full max-w-sm p-4 bg-transparent border border-indigo-300/30 bg-white/10 hover:outline-8 hover:text-gray-100 rounded-lg duration-200 font-bold"
    >
      {children}
    </button>
  );
};

export default OutlineButton;

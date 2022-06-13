import React, { FC, ReactNode } from "react";

const PrimaryButton: FC<{ children: ReactNode; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-sm p-4 bg-indigo-500/70 hover:bg-indigo-500 outline outline-0 outline-indigo-500/20 hover:outline-8 rounded-lg duration-200 font-bold"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

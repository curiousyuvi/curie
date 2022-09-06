import React, { FC, ReactNode } from "react";

type BigButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

const BigButton: FC<BigButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="bg-indigo-500 p-4 rounded-lg font-bold w-full max-w-sm flex justify-center items-center hover:scale-105 duration-100 drop-shadow-lg hover:drop-shadow-2xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BigButton;

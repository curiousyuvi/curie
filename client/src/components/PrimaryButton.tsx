import React, { FC } from "react";

const PrimaryButton: FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-sm p-4 bg-indigo-500/70 hover:bg-indigo-500 outline outline-0 outline-indigo-500/20 hover:outline-8 rounded-lg duration-200 font-bold"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

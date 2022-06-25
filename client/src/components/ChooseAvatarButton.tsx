import React from "react";

const ChooseAvatarButton = ({
  handleAvatarClick,
  idx,
  selectedIdx,
  avatar,
}: {
  handleAvatarClick: (event: any) => void;
  idx: number;
  selectedIdx: number;
  avatar: string;
}) => {
  return (
    <button onClick={handleAvatarClick}>
      <img
        id={idx.toString()}
        className={"p-1 h-12 sm:h-14 m-[0.05rem] sm:m-1 rounded-full ".concat(
          idx === selectedIdx ? "outline outline-indigo-500" : ""
        )}
        src={avatar}
        alt="AVATAR"
      />
    </button>
  );
};

export default ChooseAvatarButton;

import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import useGenerateRandomAvatar from "../hooks/useGenerateRandomAvatar";
import usePlaceholderAvatar from "../hooks/usePlaceholderAvatar";
import ChooseAvatarButton from "./ChooseAvatarButton";
import SmallButton from "./SmallButton";

const ChooseAvatar = ({
  setAvatar,
  sprites,
}: {
  setAvatar: (avatar_url: string) => void;
  sprites: string;
}) => {
  const generateRandomAvatar = useGenerateRandomAvatar();
  const getPlaceholderAvatar = usePlaceholderAvatar();
  const placeholderAvatar = getPlaceholderAvatar();
  const handleAvatarClick = (event: any) => {
    event.preventDefault();
    const idx = parseInt(event.target.id);
    if (idx >= 0 && idx < 8) setSelectedIdx(idx);
  };
  const [avatars, setAvatats] = useState([
    placeholderAvatar,
    placeholderAvatar,
    placeholderAvatar,
    placeholderAvatar,
    placeholderAvatar,
    placeholderAvatar,
    placeholderAvatar,
    placeholderAvatar,
  ]);
  const handleRefreshAvatars = (event: any) => {
    event.preventDefault();
    loadAvatars();
  };
  const loadAvatars = () => {
    const newAvatars = ["", "", "", "", "", "", "", ""];
    for (let i = 0; i < 8; i++) {
      newAvatars[i] = generateRandomAvatar(sprites);
    }
    setAvatats([...newAvatars]);
  };
  useEffect(() => {
    loadAvatars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    setAvatar(avatars[selectedIdx]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIdx, avatars]);

  return (
    <div className="flex flex-col items-center px-4">
      <div className="w-full flex flex-col sm:flex-row items-center">
        <img
          src={avatars[selectedIdx]}
          alt="AVATAR"
          className="h-24 sm:h-36 rounded-full my-[0.5rem]"
        />
        <span className="hidden sm:flex h-24 mr-0 ml-2 w-[1px] border border-r-0 border-gray-300/30" />
        <span className="sm:hidden my-2 h-[1px] w-36 border border-b-0 border-gray-300/20" />
        <div className="w-full flex flex-wrap justify-center">
          {avatars.map((avatar, i) => {
            return (
              <ChooseAvatarButton
                key={i.toString()}
                avatar={avatar}
                idx={i}
                selectedIdx={selectedIdx}
                handleAvatarClick={handleAvatarClick}
              />
            );
          })}
        </div>
      </div>
      <SmallButton onClick={handleRefreshAvatars}>
        <BiRefresh className="text-xl mr-1" />
        Refresh Avatars
      </SmallButton>
    </div>
  );
};

export default ChooseAvatar;

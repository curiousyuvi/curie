import { FC, useEffect, useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import usePlaceholderAvatar from "../hooks/usePlaceholderAvatar";
import useRoom from "../hooks/useRoom";
import { Track } from "../interfaces/Track";

const ChatVotingCloud = () => {
  const { userShorts } = useRoom();
  const { user } = useAuth();
  const [sender, setSender] = useState<string>("");
  const getUserShort = (uid: string) => {
    //TODO: remove mock code
    // return userShorts.find((e) => e.uid === uid);
    return userShorts[0];
  };
  const [yesUsers, setYesUsers] = useState<string[]>([]);
  const [noUsers, setNOUsers] = useState<string[]>(["abc"]);
  const placeHolderAvatar = usePlaceholderAvatar();
  const [timer, setTimer] = useState<number>(15);
  const [suggestedTrack, setSuggestedTrack] = useState<Track>({
    id: "",
    name: "lorem ipsum",
    artists: ["lorem ipsum", "lorem ipsum"],
    duration: 0,
    thumbnail: placeHolderAvatar(),
    uri: "",
  });

  useEffect(() => {
    const tick = () => {
      if (timer > 0) setTimer(timer - 1);
    };
    const ticker = setInterval(tick, 1000);
    return () => clearInterval(ticker);
  }, [timer]);

  return (
    <div className="w-full flex items-start my-8 text-gray-800">
      <img
        src={getUserShort(sender)?.avatar_url}
        alt="avatar"
        className="mr-2 h-8 rounded-full"
      />

      <div className="max-w-[calc(70%)] min-w-[4rem] p-2 z-10 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-[length:300%_300%] animate-shift rounded-lg relative before:content-[''] before:w-full before:h-full before:bottom-0 before:left-0 before:absolute before:blur-md before:bg-gradient-to-r before:from-green-400 before:via-blue-600 before:to-purple-500 before:bg-[length:300%_300%] before:animate-shift before:rounded-lg before:z-0">
        <div className={`rounded-lg flex`}>
          <div
            className={`bg-white rounded-lg flex z-20 flex-col items-start justify-start`}
          >
            <div className="w-full h-2 bg-yellow-500/20 rounded-full overflow-hidden">
              <div
                className="bg-yellow-300 h-full rounded-full"
                style={{
                  width: `${(timer * 100) / 15}%`,
                }}
              />
            </div>
            <div
              className={`flex flex-col items-start justify-start px-3 py-2`}
            >
              <span className={`text-indigo-600 text-sm font-medium z-10`}>
                {getUserShort(sender)?.name}
              </span>
              <p className="w-full z-10">{"✋ Suggesting to play"}</p>
              <span className="my-1" />
              <div className="w-full h-20 rounded-lg flex items-center justify-start overflow-hidden">
                <div className="h-full w-[6rem] rounded overflow-hidden flex items-center relative">
                  <img
                    src={suggestedTrack.thumbnail}
                    alt="thumbnail"
                    className="w-zfull h-full"
                  />
                </div>
                <span className="mx-2" />
                <div className="w-full whitespace-nowrap">
                  <h1 className="sm:w-[16rem] w-[12rem] text-left overflow-hidden text-ellipsis font-medium">
                    {suggestedTrack.name}
                  </h1>
                  <span className="my-1" />
                  <p className="sm:w-[16rem] w-[12rem] text-gray-700 text-left text-sm overflow-hidden text-ellipsis h-4">
                    {suggestedTrack.artists.map((artist, i) => {
                      return (
                        <span key={i} className="mr-2">
                          {artist}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
              <span className="my-1" />
            </div>
            <div className="w-full border border-black/10 border-x-0 border-b-0 flex justify-center items-center">
              <button
                className={`group w-full text-2xl bg-gradient-to-br from-green-500/30 to-green-500/10 hover:from-green-500 hover:to-green-500/40 h-16 flex justify-center items-center duration-100 relative`}
              >
                <span className="p-1 px-[0.6rem] bg-black/50 absolute text-white text-sm rounded-full right-5 top-[-1rem]">
                  {yesUsers.length}
                </span>
                <span className="group-hover:scale-125 duration-100">
                  {"👍️"}
                </span>
              </button>
              <button
                className={`group w-full text-2xl bg-gradient-to-br from-red-500/30 to-red-500/10 hover:from-red-500 hover:to-red-500/40 h-16 flex justify-center items-center duration-100 relative `}
              >
                <span className="p-1 px-[0.6rem] bg-black/50 absolute text-white text-sm rounded-full right-5 top-[-1rem]">
                  {noUsers.length}
                </span>
                <span className="group-hover:scale-125 duration-100">
                  {"👎️"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatVotingCloud;

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { Track } from "../interfaces/Track";
import usePlaceholderAvatar from "../hooks/usePlacholderAvatar";
import useRoomMusic from "../hooks/useRoomMusic";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../interfaces/User";
import useToast from "../hooks/useToast";

const ChatVotingCloud = () => {
  const [sender, setSender] = useState<User>({
    uid: "",
    name: "",
    avatarUrl: "",
  });
  const [yesUsers, setYesUsers] = useState<string[]>([]);
  const [noUsers, setNoUsers] = useState<string[]>([]);
  const placeHolderAvatar = usePlaceholderAvatar();
  const [timer, setTimer] = useState<number>(15);
  const [suggestedTrack, setSuggestedTrack] = useState<Track>({
    id: "",
    name: "lorem ipsum",
    channel: "",
    thumbnail: placeHolderAvatar(),
  });
  const { socket } = useSocket();
  const { voting, setVoting } = useRoomMusic();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const cuid = currentUser.uid;
  const router = useRouter();
  const { errorToast } = useToast();

  const handleReceiveVotingStartSocket = ({
    user,
    rid,
    track,
  }: {
    user: User;
    rid: string;
    track: Track;
  }) => {
    if (rid === router?.query?.rid) {
      setVoting(true);
      setSuggestedTrack(track);
      setYesUsers([user.uid]);
      setNoUsers([]);
      setSender(user);
      setTimer(15);
    }
  };

  const handleReceiveVoteSocket = ({
    rid,
    yesUsers,
    noUsers,
  }: {
    rid: string;
    yesUsers: string[];
    noUsers: string[];
  }) => {
    if (rid === router?.query?.rid) {
      setYesUsers(yesUsers);
      setNoUsers(noUsers);
    }
  };

  const handleYesClick = () => {
    if (voting) {
      let yesUserslocal = yesUsers;
      let noUserslocal = noUsers;
      yesUserslocal = yesUserslocal.filter((yesUser) => yesUser !== cuid);
      noUserslocal = noUserslocal.filter((noUser) => noUser !== cuid);
      yesUserslocal.push(cuid);
      setYesUsers(yesUserslocal);
      setNoUsers(noUserslocal);
      socket?.emit("send_vote", {
        uid: cuid,
        rid: router?.query?.rid,
        yes: true,
      });
    }
  };

  const handleNoClick = () => {
    if (voting) {
      let yesUserslocal = yesUsers;
      let noUserslocal = noUsers;
      yesUserslocal = yesUserslocal.filter((yesUser) => yesUser !== cuid);
      noUserslocal = noUserslocal.filter((noUser) => noUser !== cuid);
      noUserslocal.push(cuid);
      setYesUsers(yesUserslocal);
      setNoUsers(noUserslocal);
      socket?.emit("send_vote", {
        uid: cuid,
        rid: router?.query?.rid,
        yes: false,
      });
    }
  };

  const handleReceiveVotingFinishSocket = ({ rid }: { rid: string }) => {
    if (rid === router?.query?.rid) {
      setVoting(false);
      setYesUsers([]);
      setNoUsers([]);
      setSuggestedTrack({
        id: "",
        name: "lorem ipsum",
        channel: "",
        thumbnail: placeHolderAvatar(),
      });
      setTimer(0);
    }
  };

  const handleVotingAlready = ({ rid }: { rid: string }) => {
    if (rid === router?.query?.rid) errorToast("Vote already active");
  };

  const arrayContains = (array: any[], element: any) => {
    if (array.find((e) => e === element)) return true;
    else return false;
  };

  useEffect(() => {
    const tick = () => {
      if (timer > 0) setTimer(timer - 0.015);
    };
    const ticker = setInterval(tick, 10);
    return () => clearInterval(ticker);
  }, [timer]);

  useEffect(() => {
    socket?.on("receive_voting_start", handleReceiveVotingStartSocket);
    socket?.on("receive_vote", handleReceiveVoteSocket);
    socket?.on("receive_voting_finish", handleReceiveVotingFinishSocket);
    socket?.on("receive_voting_already", handleVotingAlready);

    return () => {
      socket?.off("receive_voting_start", handleReceiveVotingStartSocket);
      socket?.off("receive_vote", handleReceiveVoteSocket);
      socket?.off("receive_voting_finish", handleReceiveVotingFinishSocket);
      socket?.off("receive_voting_already", handleVotingAlready);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, router?.query?.rid]);

  if (!voting) return <></>;

  return (
    <div className="w-full flex items-start my-8 relative">
      <img
        src={sender.avatarUrl}
        alt="avatar"
        className="mr-2 h-8 rounded-full absolute -top-4 left-1 drop-shadow z-20"
      />

      <div className="sm:max-w-[calc(70%)] max-w-[calc(85%)] min-w-[4rem] flex flex-col justify-start items-center text-gray-100 ml-6">
        <div
          className={
            "w-full z-10 flex justify-end items-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-[length:300%_300%] animate-shift rounded-lg relative before:content-[''] before:w-full before:h-full before:bottom-0 before:left-0 before:absolute before:blur-md before:bg-gradient-to-r before:from-green-400 before:via-blue-600 before:to-purple-500 before:bg-[length:300%_300%] before:animate-shift before:rounded-lg before:z-0"
          }
        >
          <div
            className="absolute h-full bg-indigo-900 rounded-r-lg"
            style={{
              width: `${((15 - timer) * 100) / 15}%`,
            }}
          />
          <div className={`w-full rounded-lg flex pt-4 p-[0.3rem]`}>
            <div
              className={`w-full bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-lg flex z-20 flex-col items-start justify-start`}
            >
              <div
                className={`w-full flex flex-col items-start justify-start px-3 py-2`}
              >
                <span className={`text-indigo-400 text-sm font-medium z-10`}>
                  {sender.name}
                </span>
                <p className="w-full z-10">{"✋ Suggesting to play"}</p>
                <span className="my-1" />
                <div className="w-full h-20 p-2 bg-indigo-500 border border-indigo-300/20 rounded-lg flex items-center justify-start overflow-hidden">
                  <div className="h-full w-[6rem] rounded overflow-hidden flex items-center relative">
                    <img
                      src={suggestedTrack.thumbnail}
                      alt="thumbnail"
                      className="w-zfull h-full"
                    />
                  </div>
                  <span className="mx-2" />
                  <div className="w-full whitespace-nowrap">
                    <h1 className="sm:w-[16rem] w-[6rem] text-left overflow-hidden text-ellipsis font-medium">
                      {suggestedTrack.name}
                    </h1>
                    <span className="my-1" />
                    <p className="sm:w-[16rem] w-[6rem] text-gray-300 text-left text-sm overflow-hidden text-ellipsis h-4">
                      <span className="mr-2">{suggestedTrack.channel}</span>
                    </p>
                  </div>
                </div>
                <span className="my-1" />
              </div>
            </div>
          </div>
        </div>
        <span className="my-3" />
        <div className="w-full flex justify-center items-center">
          <button
            className={`group w-full text-2xl bg-gradient-to-br rounded-full border border-indigo-300/10 ${
              arrayContains(yesUsers, cuid)
                ? "from-green-500 to-green-500/40"
                : "from-green-500/50 to-green-500/30"
            } hover:from-green-500 hover:to-green-500/40 h-16 flex justify-center items-center duration-100 relative`}
            onClick={handleYesClick}
          >
            <span className="p-1 px-[0.6rem] bg-black/50 absolute text-white text-sm rounded-full right-5 top-[-1rem]">
              {yesUsers.length}
            </span>
            <span className="group-hover:scale-125 duration-100">{"👍️"}</span>
          </button>
          <span className="mx-2" />
          <button
            className={`group w-full text-2xl bg-gradient-to-br rounded-full border border-indigo-300/10 ${
              arrayContains(noUsers, cuid)
                ? "from-red-500 to-red-500/40"
                : "from-red-500/50 to-red-500/30"
            } hover:from-red-500 hover:to-red-500/40 h-16 flex justify-center items-center duration-100 relative `}
            onClick={handleNoClick}
          >
            <span className="p-1 px-[0.6rem] bg-black/50 absolute text-white text-sm rounded-full right-5 top-[-1rem]">
              {noUsers.length}
            </span>
            <span className="group-hover:scale-125 duration-100">{"👎️"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatVotingCloud;

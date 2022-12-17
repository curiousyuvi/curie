import React from "react";

const ChatDateRule = ({ date }: { date: string }) => {
  return (
    <div className="w-full flex items-center my-4 justify-center px-4">
      <span className="w-full border border-t-0 border-indigo-300/30" />
      <span className="mx-2 text-sm text-white/50 font-medium flex justify-center max-w-sm min-w-[8rem]">
        {date}
      </span>
      <span className="w-full border border-t-0 border-indigo-300/30" />
    </div>
  );
};

export default ChatDateRule;

import React, { useEffect } from "react";
import useRoomMusic from "../hooks/useRoomMusic";
import YouTube from "react-youtube";

const YoutubeEmbedPlayer = () => {
  let requestId;
  const debugEmbed = false;
  const {
    setPlayer,
    setPaused,
    currentTrack,
    setProgress,
    setDuration,
    player,
  } = useRoomMusic();

  const handleStateChange = (event: any) => {
    switch (event?.data) {
      case 1: {
        setPaused(false);
        const update = () => {
          player?.getCurrentTime();
          requestId = requestAnimationFrame(update);
        };
        requestId = requestAnimationFrame(update);
        break;
      }
      default:
        setPaused(true);
    }
  };

  const _onReady = (event: any) => {
    setPlayer(event.target);
    event.target?.pauseVideo();
    setDuration(event.target?.getDuration());
    setProgress(event.target?.getCurrentTime());

    function update() {
      event.target?.getCurrentTime();
      requestId = requestAnimationFrame(update);
    }
    requestId = requestAnimationFrame(update);
  };

  const _onEnd = (event: any) => {
    setProgress(0);
    // event.target.pauseVideo();
  };

  const opts = {
    height: debugEmbed ? "400" : "1",
    width: debugEmbed ? "600" : "1",
    playerVars: {
      enablejsapi: 1 as 0 | 1,
      autoplay: 1 as 0 | 1,
      playsinline: 1 as 0 | 1,
    },
  };
  return (
    <div className={`fixed top-0 left-0 ${debugEmbed ? "" : "opacity-0"}`}>
      <YouTube
        videoId={currentTrack.id}
        opts={opts}
        onReady={_onReady}
        onEnd={_onEnd}
        onStateChange={handleStateChange}
      />
    </div>
  );
};

export default YoutubeEmbedPlayer;

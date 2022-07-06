import React, { useEffect, ReactNode } from "react";
import useApiPrivate from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";
import useMusic from "../hooks/useMusic";
import useRoomMusic from "../hooks/useRoomMusic";

function WebPlaybackWrapper({ children }: { children: ReactNode }) {
  const { token, user } = useAuth();
  const {
    player,
    setPlayer,
    setPaused,
    setActive,
    setCurrentTrack,
    setProgress,
  } = useRoomMusic();
  const { switchPlayer } = useMusic();
  const apiPrivate = useApiPrivate();
  const { deviceId, setDeviceId } = useRoomMusic();

  useEffect(() => {
    if (user) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = async () => {
        const spotifyPlayer = new window.Spotify.Player({
          name: `${user?.name}'s Curie Player`,
          getOAuthToken: (cb: any) => {
            cb(token);
          },
          volume: 0.5,
        });

        setPlayer(spotifyPlayer);

        spotifyPlayer.on("initialization_error", ({ message }) => {
          console.error("Failed to initialize", message);
        });

        spotifyPlayer.on("authentication_error", ({ message }) => {
          console.error("Failed to authenticate", message);
        });

        spotifyPlayer.on("account_error", ({ message }) => {
          console.error("Failed to validate Spotify account", message);
        });

        spotifyPlayer.on("playback_error", ({ message }) => {
          console.error("Failed to perform playback", message);
        });

        spotifyPlayer.on("ready", ({ device_id }: { device_id: string }) => {
          setDeviceId(device_id);
          console.log("Ready with Device ID", device_id);
        });

        spotifyPlayer.on(
          "not_ready",
          ({ device_id }: { device_id: string }) => {
            console.log("Device ID has gone offline", device_id);
          }
        );

        spotifyPlayer.on(
          "player_state_changed",
          (state: Spotify.PlaybackState | null) => {
            console.log("state change listender called");
            if (!state) {
              setActive(false);
              console.log("switching to ", deviceId);
              switchPlayer(deviceId, token, apiPrivate);
              return;
            }
            setActive(true);
            if (state.track_window.current_track.id)
              setCurrentTrack({
                id: state.track_window.current_track.id,
                name: state.track_window.current_track.name,
                uri: state.track_window.current_track.uri,
                thumbnail: state.track_window.current_track.album.images[1].url,
                artists: state.track_window.current_track.artists.map(
                  (artist) => artist.name
                ),
                duration: state.duration,
              });
            setPaused(state.paused);
            console.log("position: ", state.position);
            console.log("duration: ", state.duration);

            setProgress(state.position);
          }
        );

        spotifyPlayer.connect();
      };
    }

    return () => {
      player?.removeListener("ready");
      player?.removeListener("not_ready");
      player?.removeListener("playback_error");
      player?.removeListener("account_error");
      player?.removeListener("authentication_error");
      player?.removeListener("initialization_error");
      player?.removeListener("player_state_changed");
    };
  }, []);

  return <>{children}</>;
}

export default WebPlaybackWrapper;

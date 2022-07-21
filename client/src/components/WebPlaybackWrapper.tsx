import React, { useEffect, ReactNode, useState } from "react";
import useApiPrivate from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";
import useMusic from "../hooks/useMusic";
import useRoomMusic from "../hooks/useRoomMusic";

function WebPlaybackWrapper({ children }: { children: ReactNode }) {
  const { token, user } = useAuth();
  const privateApiInstance = useApiPrivate();
  const {
    player,
    setPlayer,
    setPaused,
    active,
    setActive,
    setCurrentTrack,
    setProgress,
    deviceId,
    setDeviceId,
  } = useRoomMusic();
  const { switchPlayer } = useMusic();

  useEffect(() => {
    if (user && token !== "") {
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
          volume: 1,
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
        });

        spotifyPlayer.on(
          "not_ready",
          ({ device_id }: { device_id: string }) => {
            console.error("Device ID has gone offline", device_id);
          }
        );

        spotifyPlayer.on(
          "player_state_changed",
          (state: Spotify.PlaybackState | null) => {
            if (!state) {
              setActive(false);
              return;
            }
            setActive(true);
            if (state.track_window.current_track?.id)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  useEffect(() => {
    const initiatePlayback = async () => {
      if (player && deviceId !== "" && token !== "" && !active) {
        await switchPlayer(token, deviceId, privateApiInstance);
      }
    };

    initiatePlayback();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, deviceId, token, active]);

  return <>{children}</>;
}

export default WebPlaybackWrapper;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutWrapper from "../components/LayoutWrapper";
import { Provider, useSelector } from "react-redux";
import store, { persistoor, RootState } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ProtectedRouteWrapper from "../components/ProtectedRouteWrapper";
import SocketProvider from "../providers/socketProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import YoutubeEmbedPlayer from "../components/YoutubeEmbedPlayer";
import RoomMusicProvider from "../providers/roomMusicProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistoor}>
          <SocketProvider>
            <RoomMusicProvider>
              <ProtectedRouteWrapper>
                <LayoutWrapper>
                  <Component {...pageProps} />
                  <YoutubeEmbedPlayer />
                </LayoutWrapper>
              </ProtectedRouteWrapper>
            </RoomMusicProvider>
          </SocketProvider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider from "../providers/UserProvider";
import LayoutWrapper from "../components/LayoutWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </UserProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutWrapper from "../components/LayoutWrapper";
import { Provider } from "react-redux";
import store, { persistoor } from "../store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistoor}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

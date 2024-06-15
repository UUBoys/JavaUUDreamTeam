import "moment/locale/cs";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

import MainLayout from "@/Layout/Main";

import moment from "moment";

moment.locale("cs");

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};
export default App;

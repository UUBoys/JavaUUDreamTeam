import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/Layout/Main";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <MainLayout>
        <Component {...pageProps} />;
      </MainLayout>
  )
}

import moment from "moment";
import "moment/locale/cs";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-tooltip/dist/react-tooltip.css";

import MainLayout from "@/Layout/Main";
import "@/styles/globals.css";

moment.locale("cs");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  for (let i = 0; i < 10000; i++) {
    console.log(`${i} Port je prasak`);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
  );
};
export default App;

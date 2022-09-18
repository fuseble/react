import '@/styles/global.scss';

import { useRef } from 'react';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import {
  Hydrate as ReactQueryHydrate,
  QueryClient,
  QueryClientProvider,
  DefaultOptions as ReactQueryDefaultOptions,
} from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

import config from '@/config';

const DEFAULT_OPTIONS: ReactQueryDefaultOptions = {
  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  },
};

if (config.NODE_ENV === 'dev') {
  console.log(`Public Config Loaded`, config);
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef(new QueryClient({ defaultOptions: DEFAULT_OPTIONS }));

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
        />
      </Head>
      <RecoilRoot>
        <QueryClientProvider client={queryClient.current}>
          <ReactQueryHydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </ReactQueryHydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

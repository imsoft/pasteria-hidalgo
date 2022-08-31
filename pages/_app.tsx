import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

import '../styles/globals.css'
import { CandidatosProvider } from '../context/candidatos';

type NextPageWithLayout = NextPage & {
  getLayout?: ( page: ReactElement ) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ( (page) => page );
  return getLayout(
    <CandidatosProvider>
      <Component {...pageProps} />
    </CandidatosProvider>
  );
}

export default MyApp;
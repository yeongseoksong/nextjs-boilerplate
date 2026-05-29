import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { setCompanyName } from '../framework/util/text.util';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setCompanyName("test");
  }, []);

  return <Component {...pageProps} />;
}
import GitHubButton from "react-github-btn";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Vibesition</title>
        <link
          rel="icon"
          className="h-full w-full"
          href="/logo.svg"
          type="image/svg+xml"
        />
            <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital@0;1&display=swap"
      rel="stylesheet"
    />
      </Head>
      <Component {...pageProps} />

    </SessionProvider>
  );
}

export default MyApp;

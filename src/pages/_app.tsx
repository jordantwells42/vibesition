/* eslint-disable @next/next/no-page-custom-font */
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta
          property="og:description"
          content="Generate a playlist that blends between two songs' vibes"
        />
        <meta
          name="description"
          content="Generate a playlist that blends between two songs' vibes"
        />
        <meta property="og:title" content="Vibesition" key="title" />
        <meta property="og:image" content={"/preview.png"} />
        <meta
          property="og:url"
          content={"https://vibesition.jordantwells.com"}
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

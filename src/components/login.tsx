/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react";
import Footer from "./footer";
import tinycolor from 'tinycolor2';

export default function Login() {
  return (
    <div className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center bg-green-50 font-main  text-white">
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center rounded-2xl bg-stone-900 p-10">
        <h1 className="text-3xl text-gray-200 text-center">
          Welcome to <i className="text-4xl text-green-200">Vibesition</i>
        </h1>
        <p className="w-5/6 my-3 text-center text-lg text-gray-300">
          Ready to flow between different vibes?
        </p>
        <div className="my-5 w-3/4 border-2"></div>
        <button
        style={{backgroundColor:tinycolor("#1ed760").desaturate(40).toHexString()}}
          className="flex h-20 w-3/4 flex-row items-center justify-center rounded-2xl border-white p-4 text-white"
          onClick={() => signIn("spotify")}
        >
          <img
            className="mx-2 brightness-0 invert aspect-square w-14 object-contain"
            alt="Spotify Logo"
            src="/spotify.png"

          />
          <h2 className="w-full text-2xl"> Login with Spotify</h2>
        </button>
      </div>
      <Footer />
    </div>
  );
}

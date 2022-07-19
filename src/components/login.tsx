/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react";
import Footer from "./footer";

export default function Login() {
  return (
    <div className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center bg-green-50 text-4xl text-white">
      <div className="flex flex-col items-center justify-center rounded-2xl bg-stone-900 p-10">
        <p className="w-5/6 text-center">
          Sign in with Spotify to use <i>Vibesition</i>{" "}
        </p>
        <div className="my-5 w-3/4 border-2"></div>
        <button
          className="flex h-20 flex-row items-center justify-center rounded-2xl border-white bg-emerald-700 p-4 md:w-1/3"
          onClick={() => signIn("spotify")}
        >
          <img
            alt="spotify logo"
            className="h-full"
            src="/spotify_logo.png"
          ></img>
        </button>
      </div>
      <Footer />
    </div>
  );
}

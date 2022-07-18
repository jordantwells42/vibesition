import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-700 text-4xl text-white">
      <p className="w-5/6 text-center">
        Sign in with Spotify to use <i>Gradiance</i>{" "}
      </p>
      <button
        className="m-10 flex h-24 w-3/4 flex-row items-center justify-center rounded-2xl border-white bg-emerald-700 p-4 md:w-1/3"
        onClick={() => signIn("spotify")}
      >
        <img className="h-full" src="/spotify_logo.png"></img>
      </button>
    </div>
  );
}

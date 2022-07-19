import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-700 text-4xl text-white">
      <div className="bg-slate-900 p-5 py-10 rounded-2xl flex flex-col items-center justify-center">
      <p className="w-5/6 text-center">
        Sign in with Spotify to use <i>Vibesition</i>{" "}
      </p>
      <div className="w-3/4 border-2 my-5">

      </div>
      <button
        className="flex h-20 flex-row items-center justify-center rounded-2xl border-white bg-emerald-700 p-4 md:w-1/3"
        onClick={() => signIn("spotify")}
      >
        <img className="h-full" src="/spotify_logo.png"></img>
      </button>
      </div>
    </div>
  );
}

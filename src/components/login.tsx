import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login(){
    return (
        <div className='bg-slate-700 text-white flex flex-col items-center justify-center text-4xl w-full h-screen'>
        <p className='w-5/6 text-center'>Sign in with Spotify to use <i>Gradiance</i> </p>
        <button
          className='bg-emerald-700 p-4 w-3/4 md:w-1/3 h-24 flex flex-row items-center justify-center border-white rounded-2xl m-10'
          onClick={() => signIn('spotify')}
        >
          <img className='h-full' src='/spotify_logo.png'></img>
        </button>
      </div>
    )
}
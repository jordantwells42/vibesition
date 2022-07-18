/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next'
import Head from 'next/head'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import SpotifySearch from '../components/spotifysearch'
import Link from 'next/link'


/*
TODO: 

[] - Get audio features of interpolated songs
[] - Ensure that the interpolated songs are unique 
[] - Style results page
[] - Allow export to Spotify playlists
[] - Allow sharing of url to share gradient
[] - General UI things

*/


const Home: NextPage = () => {
  const { data: session } = useSession()
  const [startSong, setStartSong] = useState({ id: '', name: '', img: '' })
  const [endSong, setEndSong] = useState({ id: '', name: '', img: '' })
  const [openTab, setOpenTab] = useState<number>(-1)



  if (session) {
    return (
      <div className='min-h-screen pb-32 overflow-x-hidden w-full flex flex-col items-center justify-start pt-10 bg-slate-900 text-white'>
        <div className='absolute top-5 right-5 border-2 bg-slate-400 flex flex-col p-2 rounded-2xl'>
          Hey, {session?.user?.name}
          <button className='hover:text-blue-200' onClick={() => signOut()}>
            Sign out
          </button>
        </div>
        <div className='pt-20 w-5/6 h-full lg:w-3/4 flex flex-col items-center justify-center'>
          <div className='flex-row flex w-full items-center justify-center font-semibold'>
            <button
              className={`w-1/3 h-20 flex flex-row items-center justify-center p-2
            ${openTab == 0 ? 'bg-slate-700' : 'bg-blue-500'} `}
              onClick={() => setOpenTab(0)}
            >
              {startSong.img && (
                <img
                  className='h-3/4 aspect-square mx-5 rounded hidden md:block'
                  alt={startSong.name}
                  src={startSong.img}
                />
              )}
              Select Starting Song
            </button>
            <button
              className={`w-1/3 h-20 flex flex-row items-center justify-center p-2
            ${openTab == 1 ? 'bg-slate-700' : 'bg-blue-500'} `}
              onClick={() => setOpenTab(1)}
            >
              {endSong.img && (
                <img
                  className='h-3/4 aspect-square mx-5 rounded hidden md:block'
                  alt={endSong.name}
                  src={endSong.img}
                />
              )}
              Select Ending Song
            </button>
            <Link
                href={{
                  pathname: '/results',
                  query: { startId: startSong.id, endId: endSong.id }
                }}
              >
            <button
              className={`w-1/3 h-20 flex flex-row items-center justify-center  p-2 
            ${openTab == 2 ? 'bg-slate-700' : 'bg-blue-500'} `}
              onClick={() => setOpenTab(2)}
            >
              
                <a>Generate your <i>Gradiance</i></a>
              
            </button>
            </Link>
          </div>
          <SpotifySearch
            display={openTab == 0}
            setSong={setStartSong}
            title={'First Song'}
          />
          <SpotifySearch
            display={openTab == 1}
            setSong={setEndSong}
            title={'Second Song'}
          />
        </div>
      </div>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default Home

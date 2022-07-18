/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next'
import Head from 'next/head'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import SpotifySearch from '../components/spotifysearch'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const [startSong, setStartSong] = useState({ id: '', name: '', img: '' })
  const [endSong, setEndSong] = useState({ id: '', name: '', img: '' })
  const [openTab, setOpenTab] = useState<number>(0)

  if (session) {
    return (
      <div className='min-h-screen w-screen flex flex-col items-center justify-start pt-10 bg-slate-900 text-white overflow-y-hidden'>
        Signed in as {JSON.stringify(session?.user?.email)}
        <button onClick={() => signOut()}>Sign out</button>
        <div className='w-5/6 h-full lg:w-3/4 flex flex-col items-center justify-center'>
          <div className='flex-row flex w-full items-center justify-center font-semibold'>
            <button
              className={`w-1/3 h-20 flex flex-row items-center justify-start
            ${openTab == 0 ? 'bg-slate-700' : 'bg-blue-500'} `}
              onClick={() => setOpenTab(0)}
            >
              {startSong.img ? (
                <img
                  className='h-3/4 aspect-square mx-10 rounded'
                  alt={startSong.name}
                  src={startSong.img}
                />
              ) : (
                <div className='w-10 h-10 mx-10 bg-slate-600'></div>
              )}
              Select Starting Song
            </button>
            <button
              className={`w-1/3 h-20 flex flex-row items-center justify-start
            ${openTab == 1 ? 'bg-slate-700' : 'bg-blue-500'} `}
              onClick={() => setOpenTab(1)}
            >
              {endSong.img ? (
                <img className='h-3/4 aspect-square mx-10 rounded' alt={endSong.name} src={endSong.img} />
              ) : (
                <div className='w-10 h-10 mx-10 bg-slate-600'></div>
              )}
              Select Ending Song
            </button>
            <button
              className={`w-1/3 h-20 flex flex-row items-center justify-center
            ${openTab == 2 ? 'bg-slate-700' : 'bg-blue-500'} `}
              onClick={() => setOpenTab(2)}
            >
              Generate my Gradiance
            </button>
          </div>
          <SpotifySearch
            display={openTab == 0 ? 'block' : 'none'}
            setSong={setStartSong}
            title={'First Song'}
          />
          <SpotifySearch
            display={openTab == 1 ? 'block' : 'none'}
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

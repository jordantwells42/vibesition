/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { useEffect, useState } from 'react'
import PlusIcon from './plusicon'
export default function SpotifySearch ({
  title,
  display,
  setSong
}: {
  title: string
  display: string
  setSong: ({
    id,
    name,
    img
  }: {
    id: string
    name: string
    img: string
  }) => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any>(null)
  useEffect(() => {
    if (searchQuery) {
      fetch(`/api/search?q=${searchQuery}`)
        .then(res => res.json())
        .then(data => setSearchResults(data))
    }
  }, [searchQuery])
  return (
    <div
      style={{ display }}
      className='bg-slate-700 w-full h-full p-5 rounded-b-2xl flex flex-col flex-wrap items-center justify-center'
    >
      <h1 className='m-2 font-semibold'>{title}</h1>
      <input
        value={searchQuery}
        placeholder={"Red (Taylor's Version)"}
        className='my-2 p-2 rounded-2xl w-5/6 bg-slate-500 text-white'
        onChange={evt => setSearchQuery(evt.target.value)}
      />
      <div className='flex flex-col w-full justify-start items-center'>
        {searchResults &&
          searchResults.map((result: any, idx: number) => (
            <div
              onClick={() =>
                setSong({
                  id: result.id,
                  name: result.name,
                  img: result.album.images[1].url
                })
              }
              className='hover:bg-green-500 hover:cursor-pointer rounded-2xl md:p-2 flex flex-row w-full justify-start items-center'
              key={idx}
            >
              <img
                className='object-contain w-10 h-10 md:w-20 md:h-20 aspect-square'
                src={result.album.images[1].url}
                alt='tites'
              />
              <div className='overflow-x-hidden flex flex-col m-2 w-full justify-center items-start'>
                <h1 className='whitespace-nowrap truncate'>{result.name}</h1>
                <p className='whitespace-nowrap truncate'>
                  {result.artists[0].name}
                </p>
              </div>
              <PlusIcon
                className='h-6 w-6 cursor-pointer'
                onClick={() =>
                  setSong({
                    id: result.id,
                    name: result.name,
                    img: result.album.images[1].url
                  })
                }
              />
            </div>
          ))}
      </div>
    </div>
  )
}

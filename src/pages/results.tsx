/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import tinycolor from 'tinycolor2'
import { motion } from 'framer-motion'
import textColor from '../libs/textColor'
import featuresToColors from '../libs/featuresToColor'

function interpolate (features1: any, features2: any, t: number) {
  const features: any = {}
  const s = 1 / (1 + Math.exp(-(8 * (t - 0.5))))
  for (const key in features1) {
    if (features1.hasOwnProperty(key) && typeof features1[key] === 'number') {
      features[key] =
        Math.round((features1[key] * (1 - s) + features2[key] * s) * 100) / 100
    }
  }
  return features
}

export default function Results () {
  const router = useRouter()
  const { startId, endId } = router.query
  const [startSong, setStartSong] = useState(null)
  const [endSong, setEndSong] = useState(null)
  const numSongs = 10
  const [colors, setColors] = useState<tinycolor.Instance[]>(new Array(numSongs+2).fill(tinycolor("gray")))
  const [interpolatedSongs, setInterpolatedSongs] = useState<any[]>([])
  const ids = useRef(new Set([startId, endId]))

  useEffect(() => {
    async function fetchSongs () {
      setInterpolatedSongs([])
      fetch(`/api/search-by-id?id=${startId}`)
        .then(res => res.json())
        .then(data => {
          data.t = 0
          setStartSong(data)
        })
      fetch(`/api/search-by-id?id=${endId}`)
        .then(res => res.json())
        .then(data => {
          data.t = 1.2
          setEndSong(data)
        })
      fetch('/api/audio-features?ids=' + startId + ',' + endId)
        .then(res => res.json())
        .then(data => {
          if (!data[0]) {
            return null
          }
          for (let i = 0; i < numSongs; i++) {
            const interpolation = interpolate(
              data[0],
              data[1],
              (i + 1) / numSongs
            )
            interpolation.startId = startId
            interpolation.endId = endId

            fetch(
              '/api/recommend-from-interpolation?interpolation=' +
                JSON.stringify(interpolation) +
                '&limit=' +
                String(numSongs + 2)
            )
              .then(res => res.json())
              .then(data => {
                if (!data) {
                  return null
                }
                const filteredData = data.filter((song: any) => {
                  return !ids.current.has(song.id)
                })

                if (filteredData.length === 0) {
                  return
                }
                ids.current.add(filteredData[0].id)
                const song = filteredData[0]
                song.t = (i + 1) / numSongs
                setInterpolatedSongs((p: any) =>
                  [...p, song].sort((a, b) => {
                    if (a.t < b.t) {
                      return -1
                    } else if (b.t < a.t) {
                      return 1
                    } else {
                      return 0
                    }
                  })
                )
              })
          }
        })
    }
    fetchSongs()
  }, [endId, startId, numSongs])

  useEffect(() => {
    fetch(
      '/api/audio-features?ids=' +
        [startId, ...interpolatedSongs.map(s => s.id), endId].join(',')
    )
      .then(res => res.json())
      .then(data => {
        if (!data[0]) {
          return null
        }
        setColors(
          data.map((features: any) => featuresToColors(features))
        )
      })
  }, [interpolatedSongs, startId, endId])

  return (
    <div className='w-full min-h-screen bg-slate-900  flex flex-col items-center justify-center py-5'>
      <h1 className="text-white text-4xl font-semibold m-5">Your <i>Gradiance</i></h1>
      <div className='flex w-full flex-row items-center justify-center'>
        <div className='w-5/6 flex flex-col justify-center items-center'>
          {interpolatedSongs &&
            startSong &&
            endSong &&
            [startSong, ...interpolatedSongs, endSong].map(
              (result: any, idx: number) =>
                result.album && (
                  <motion.div
                    style={ {
                      backgroundColor: colors[idx] ?  (colors[idx] as tinycolor.Instance).toHexString() : 'lightgreen',
                      color: colors[idx] ? textColor(colors[idx] as tinycolor.Instance, [tinycolor("white")]) : 'white',
                    }}
                    initial={{ x: -20, height: '0%' }}
                    animate={{ x: 0, height: '100%' }}
                    className='px-4 hover:bg-green-700 hover:cursor-pointer rounded-2xl md:p-2 flex flex-row w-full justify-start items-center'
                    key={result.id}
                  >
                    <img
                      className='object-contain w-10 h-10 md:w-20 md:h-20 aspect-square'
                      src={result.album.images[1].url}
                      alt='tites'
                    />
                    <div className='overflow-x-hidden flex flex-col m-2 w-full justify-center items-start'>
                      <h1 className='whitespace-nowrap truncate'>
                        {result.name}
                      </h1>
                      <p className='whitespace-nowrap truncate'>
                        {result.artists[0].name}
                      </p>
                    </div>
                    <audio className='w-1/2 hidden md:block mx-4' controls>
                      <source
                        className='bg-slate-900'
                        src={result.preview_url}
                        type='audio/mp3'
                      />
                    </audio>
                  </motion.div>
                )
            )}
        </div>
      </div>
    </div>
  )
}

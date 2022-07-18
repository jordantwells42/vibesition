import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'
import { motion } from 'framer-motion';

function interpolate (features1: any, features2: any, t: number) {
  const features: any = {}
  for (const key in features1) {
    if (features1.hasOwnProperty(key) && typeof features1[key] === 'number') {
      features[key] =
        Math.round((features1[key] * (1 - t) + features2[key] * t) * 100) / 100
    }
  }
  return features
}

export default function Results () {
  const router = useRouter()
  const { startId, endId } = router.query
  const [startFeatures, setStartFeatures] = useState(null)
  const [startSong, setStartSong] = useState(null)
  const [endSong, setEndSong] = useState(null)
  const [endFeatures, setEndFeatures] = useState(null)
  const [startColor, setStartColor] = useState<tinycolor.Instance>(
    tinycolor('green')
  )
  const [endColor, setEndColor] = useState<tinycolor.Instance>(
    tinycolor('green')
  )
  const [numSongs, setNumSongs] = useState(5)
  const [interpolatedSongs, setInterpolatedSongs] = useState<any>([])

  useEffect(() => {
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
        setStartFeatures(data[0])
        setEndFeatures(data[1])
        setStartColor(
          tinycolor({
            r: data[0].danceability * 255,
            g: data[0].valence * 255,
            b: data[0].energy * 255
          })
        )
        setEndColor(
          tinycolor({
            r: data[1].danceability * 255,
            g: data[1].valence * 255,
            b: data[1].energy * 255
          })
        )
        for (let i = 0; i < numSongs; i++) {
          const interpolation = interpolate(
            data[0],
            data[1],
            (i + 1) / numSongs
          )
          console.log(interpolation)
          interpolation.startId = startId
          interpolation.endId = endId
          
          fetch(
            '/api/recommend-from-interpolation?interpolation=' +
              JSON.stringify(interpolation)
          )
            .then(res => res.json())
            .then(data => {
              console.log('MEMEMEM', data)
              if (!data) {
                return null
              }
              data.t = (i + 1)/numSongs
              setInterpolatedSongs((p: any) => [...p, data].sort((a, b) => {
                if (a.t < b.t){
                  return -1
                } else if (b.t < a.t){
                  return 1
                } else {
                  return 0
                }
              }))
            })
        }
      })
  }, [endId, startId, numSongs])
  console.log("SOKJSD", [startSong,...interpolatedSongs,endSong])
  return (
    <div className="w-full min-h-screen bg-slate-900 text-white">
      <h1>Results</h1>
      <p>Start: {startId}</p>
      <p>End: {endId}</p>
      <div className='flex flex-row items-center justify-center'>
        <div className="w-full flex flex-col justify-center items-center">
        {interpolatedSongs && startSong && endSong &&
          [startSong,...interpolatedSongs,endSong].map((result: any, idx: number) => (result.album && 
            <motion.div
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
              <div>{result.t}</div>
              <div className='overflow-x-hidden flex flex-col m-2 w-full justify-center items-start'>
                <h1 className='whitespace-nowrap truncate'>{result.name}</h1>
                <p className='whitespace-nowrap truncate'>
                  {result.artists[0].name}
                </p>
              </div>
              <audio className="w-1/2 hidden md:block mx-4" controls >
                <source className="bg-slate-900" src={result.preview_url} type='audio/mp3' />
              </audio>
              
            </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}

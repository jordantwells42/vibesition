import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'

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
    fetch('/api/audio-features?startId=' + startId + '&endId=' + endId)
      .then(res => res.json())
      .then(data => {
        if (!data) {
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
              setInterpolatedSongs((p: any) => [...p, data])
            })
        }
      })
  }, [])

  return (
    <div>
      <h1>Results</h1>
      <p>Start: {startId}</p>
      <p>End: {endId}</p>
      <div className='flex flex-col items-center justify-center'>
        <p
          style={{ backgroundColor: startColor.toHexString() }}
          className='w-40 h-40 rounded-2xl'
        >
          Start Features: {JSON.stringify(startFeatures)}
        </p>
        <p
          style={{ backgroundColor: endColor.toHexString() }}
          className='w-40 h-40 rounded-2xl'
        >
          End Features: {JSON.stringify(endFeatures)}
        </p>
        {interpolatedSongs.map((song: any, i: number) => (
          <div className='border-black border-2 p-2 rounded-2xl m-20' key={song.id}>
            <h1>{song.name}</h1>
            <h2>{song.artists[0].name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

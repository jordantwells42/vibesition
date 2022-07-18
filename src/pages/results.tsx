import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';

export default function Results(){
    const router = useRouter()
    const { startId, endId } = router.query
    const [startFeatures, setStartFeatures] = useState(null)
    const [endFeatures, setEndFeatures] = useState(null)
    const [startColor, setStartColor] = useState<tinycolor.Instance>(tinycolor("green"))
    const [endColor, setEndColor] = useState<tinycolor.Instance>(tinycolor("green"))

    useEffect(() => {
        fetch(
          '/api/audio-features?startId=' + startId + '&endId=' + endId
        )
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setStartFeatures(data[0])
            setEndFeatures(data[1])
            setStartColor(tinycolor({h: data[0].danceability * 360, s: data[0].valence, v: data[0].energy}))
            setEndColor(tinycolor({h: data[1].danceability * 360, s: data[1].valence, v: data[1].energy}))
          })
      }, [])

    return (
        <div>
            <h1>Results</h1>
            <p>Start: {startId}</p>
            <p>End: {endId}</p>
            <div className="flex flex-row items-center justify-center">
            <p style={{backgroundColor: startColor.toHexString()}} className="w-40 h-40 rounded-2xl">Start Features: {JSON.stringify(startFeatures)}</p>
            <p style={{backgroundColor: endColor.toHexString()}} className="w-40 h-40 rounded-2xl">End Features: {JSON.stringify(endFeatures)}</p>
            </div>
        </div>
    )
}
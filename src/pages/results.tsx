import { useRouter } from "next/router"

export default function Results(){
    const router = useRouter()
    const { startId, endId } = router.query
    return (
        <div>
            <h1>Results</h1>
            <p>Start: {startId}</p>
            <p>End: {endId}</p>
        </div>
    )
}
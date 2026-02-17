import { useParams } from "react-router-dom"
import  useEffect from "react"
import ShimmerCard from "../components/ShimmerCard"
import VideoCard from "../components/VideoCard" 
export default function Search() {
    const { query } = useParams()
    const [loading, setLoading] = useState(true)
    const [videos, setVideos] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
       if(query){
        setLoading(true)
        setError(null)
        setVideos([])
        
       }    
    }, [query]) 
    
    return (
        <div >
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Search Results for {query}</h1>   

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? Array(12).fill(0).map((_, i) => (
                        <ShimmerCard key={i} />
                    )) : videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    )
}

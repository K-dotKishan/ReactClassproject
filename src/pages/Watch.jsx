import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Watch() {
    const { id } = useParams()
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([])

    useEffect(() => {
        async function fetchVideo() {
            try {
                const response = await fetch(
                    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${import.meta.env.VITE_API_KEY_YT}`
                )

                const data = await response.json()
                setVideo(data.items[0])
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchVideo()
    }, [id])

    useEffect(() => {
        if (video) {
            const storedHistory = JSON.parse(localStorage.getItem("watchHistory")) || []
            const updatedHistory = [
                {
                    id: video.id,
                    title: video.snippet.title,
                    thumbnail: video.snippet.thumbnails.high.url,
                    channelTitle: video.snippet.channelTitle,
                    publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString(),
                    views: video.statistics.viewCount,
                    duration: video.contentDetails.duration,
                },
                ...storedHistory.filter((item) => item.id !== video.id),
            ].slice(0, 20) // Limit to 20 items

            localStorage.setItem("watchHistory", JSON.stringify(updatedHistory))
            setHistory(updatedHistory)
        }
    }, [video])

    if (loading) return <p>Loading...</p>
    if (!video) return <p>Video not found</p>

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* 🎥 YouTube Player */}
            <div className="relative pb-[56.25%]">
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${id}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 📄 Video Details */}
            <h1 className="text-xl font-bold mt-4">
                {video.snippet.title}
            </h1>

            <p className="text-sm text-gray-600 mt-2">
                {Number(video.statistics.viewCount).toLocaleString()} views
            </p>

            <p className="mt-3 text-sm">
                {video.snippet.description}
            </p>

            <div className="mt-8">
                <h2 className="text-lg font-bold mb-4">Watch History</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {history.map((video) => (
                        <div key={video.id} className="border p-2 rounded shadow hover:shadow-lg transition">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover rounded" />
                            <h3 className="font-semibold text-sm mt-2 line-clamp-2">{video.title}</h3>
                            <p className="text-xs text-gray-500">{video.channelTitle}</p>
                            <Link to={`/watch/${video.id}`} className="text-blue-500 text-xs mt-1 block">Watch Again</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Watch() {
    const { id } = useParams()
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(true)

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
        </div>
    )
}

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ShimmerCard from "../components/ShimmerCard"
import VideoCard from "../components/VideoCard"

export default function Search() {
    const { query } = useParams()
    const [loading, setLoading] = useState(true)
    const [videos, setVideos] = useState([])
    const [error, setError] = useState(null)
    const [nextPageToken, setNextPageToken] = useState(null)

    const fetchMoreVideos = async () => {
        try {
            if (loading || !nextPageToken) return

            const response = await fetch(
                `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${import.meta.env.VITE_API_KEY_YT}&pageToken=${nextPageToken}`
            )

            if (!response.ok) throw new Error("Failed to fetch videos")

            const data = await response.json()
            const formattedVideos = data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
                publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
                views: 0,
            }))

            setVideos(prev => [...prev, ...formattedVideos])
            setNextPageToken(data.nextPageToken || null)
        } catch (err) {
            console.error(err)
            setError(err.message)
        }
    }

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(
                    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${import.meta.env.VITE_API_KEY_YT}`
                )
                if (!response.ok) throw new Error("Failed to fetch videos")

                const data = await response.json()
                const formattedVideos = data.items.map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.high.url,
                    channelTitle: item.snippet.channelTitle,
                    publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
                    views: 0,
                }))
                setVideos(formattedVideos)
                setNextPageToken(data.nextPageToken || null)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (query) {
            fetchVideos()
        }
    }, [query])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                fetchMoreVideos()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [nextPageToken, loading])

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

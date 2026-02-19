import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ShimmerCard from '../components/ShimmerCard'

export default function Homescroll() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPageToken, setNextPageToken] = useState(null)
    const [error, setError] = useState(null)

    const fetchVideos = async (token = '') => {
        if (loading && token) return
        setLoading(true)
        try {
            const response = await fetch(
                `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=IN&key=${import.meta.env.VITE_API_KEY_YT}${token ? `&pageToken=${token}` : ''}`
            )

            if (!response.ok) {
                throw new Error('Failed to fetch videos')
            }

            const data = await response.json()

            const newVideos = data.items.map((video) => ({
                id: video.id,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.high.url,
                channelTitle: video.snippet.channelTitle,
                publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString(),
                views: video.statistics.viewCount,
                duration: video.contentDetails.duration,
            }))

            setVideos((prev) => token ? [...prev, ...newVideos] : newVideos)
            setNextPageToken(data.nextPageToken || null)
        } catch (err) {
            console.error(err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVideos()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                if (nextPageToken && !loading) {
                    fetchVideos(nextPageToken)
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [nextPageToken, loading])

    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>

    return (
        <div className="container mx-auto">
            <h1 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>Infinite Scroll Videos</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video, index) => (
                    <div key={`${video.id}-${index}`} className="cursor-pointer group">
                        <Link to={`/watch/${video.id}`}>
                            <div className="relative pb-[56.25%] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm font-bold line-clamp-2 text-gray-900 dark:text-white">{video.title}</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{video.channelTitle}</p>
                                <div className="flex text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>{Number(video.views).toLocaleString()} views</span>
                                    <span className="mx-1">•</span>
                                    <span>{video.publishedAt}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                {loading && Array(8).fill(0).map((_, i) => (
                    <ShimmerCard key={i} />
                ))}
            </div>
            {!nextPageToken && !loading && (
                <div className="text-center mt-8 text-gray-500">No more videos to load</div>
            )}
        </div>
    )
}
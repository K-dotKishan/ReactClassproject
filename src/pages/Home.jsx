import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ShimmerCard from '../components/ShimmerCard'
import { useSearchParams, useNavigate } from 'react-router-dom'
export default function Home() {


    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPageToken, setNextPageToken] = useState(null)
    const [tocken, setTocken] = useState({})
    const page = Number(searchParams.get('page')) || 1
    const [error, setError] = useState(null)

    const fetchMoreVideos = async () => {
        try {
            if (loading) return
            const currentToken = nextPageToken
            console.log(currentToken)
            if (!currentToken) return

            const response = await fetch(
                `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=IN&key=${import.meta.env.VITE_API_KEY_YT}&pageToken=${currentToken}`
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

            setVideos((prev) => [...prev, ...newVideos])
            setNextPageToken(data.nextPageToken || null)

            // Update token for the next page in our map if it's new
            if (data.nextPageToken) {
                // If we are currently on "page 1" and just fetched more, effectively we are fetching content for page 2...
                // But this logic is tricky with infinite scroll mixed with page numbers.
                // We'll keep it simple: just update token state if we can mapping it to a hypothetical next page?
                // Actually, if user relies on `tocken[page]` for `fetchVideos`, we should ensure it's populated.
                // If we infinite scroll, `page` param doesn't change.
                // So `tocken` map might de-sync from scroll position if we rely only on `page`.
                // But sticking to user's request to keep logic:
                setTocken((prevTocken) => ({ ...prevTocken, [page]: data.nextPageToken }))
            }

        } catch (err) {
            console.error(err)
            setError(err.message)
        }
    }

    
    useEffect(() => {
        async function fetchVideos() {
            setLoading(true)
            try {
                // Initial fetch logic: Use token from *previous* page to get *current* page content.
                // Page 1: tocken[0] (undefined) -> no token -> fetches page 1.
                // Page 2: tocken[1] -> should be token for page 2.
                const currentToken = tocken[page - 1] || ""

                const response = await fetch(
                    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=IN&key=${import.meta.env.VITE_API_KEY_YT}${currentToken ? `&pageToken=${currentToken}` : ''}`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch videos')
                }

                const data = await response.json()

                const formattedVideos = data.items.map((video) => ({
                    id: video.id,
                    title: video.snippet.title,
                    thumbnail: video.snippet.thumbnails.high.url,
                    channelTitle: video.snippet.channelTitle,
                    publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString(),
                    views: video.statistics.viewCount,
                    duration: video.contentDetails.duration,
                }))

                setVideos(formattedVideos)
                setNextPageToken(data.nextPageToken || null)

                if (data.nextPageToken && !tocken[page]) {
                    setTocken((prevTocken) => ({ ...prevTocken, [page]: data.nextPageToken }))
                }
            } catch (err) {
                console.error(err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchVideos()
    }, [page]) // Dependent on 'page' from URL

    function handlenextPage() {
        if (nextPageToken) {
            navigate(`/?page=${page + 1}`)
        }
    }

    function handlePrevPage() {
        if (page > 1) {
            navigate(`/?page=${page - 1}`)
        }
    }

    // Second useEffect for infinite scroll as requested ("keep two useEffect")
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                fetchMoreVideos()
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [nextPageToken, loading])

    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>

    return (
        <div className="container mx-auto">
            <h1 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>Trending Videos</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? Array(12).fill(0).map((_, i) => (
                    <ShimmerCard key={i} />
                )) : videos.map((video) => (
                    <div key={video.id} className="cursor-pointer group">
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
            </div>

            <div className="flex justify-center mt-10 gap-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Previous Page
                </button>
                <button
                    onClick={handlenextPage}
                    disabled={!nextPageToken}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Next Page
                </button>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function History() {
    const [history, setHistory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("watchHistory")) || []
        setHistory(storedHistory)
    }, [])

    const clearHistory = () => {
        localStorage.removeItem("watchHistory")
        setHistory([])
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold dark:text-white">Watch History</h1>
                {history.length > 0 && (
                    <button
                        onClick={clearHistory}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Clear History
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                    <p className="text-xl">No watch history yet.</p>
                    <p className="mt-2">Videos you watch will appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {history.map((video) => (
                        <div key={video.id} className="cursor-pointer group flex flex-col gap-2">
                            <div
                                onClick={() => navigate(`/watch/${video.id}`)}
                                className="relative pb-[56.25%] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700"
                            >
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                                    {video.duration.replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '')}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold line-clamp-2 text-gray-900 dark:text-white leading-tight">{video.title}</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{video.channelTitle}</p>
                                <div className="flex text-xs text-gray-500 dark:text-gray-400">
                                    <span>{Number(video.views).toLocaleString()} views</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

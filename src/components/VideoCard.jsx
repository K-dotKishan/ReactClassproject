import { useNavigate } from "react-router-dom"
export default function VideoCard({ video }) {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/watch/${video.id}`)} className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer">
            <img src={video.thumbnail} alt={video.title} />
            <div className="p-2">
                <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{video.channelTitle}</p>
                <div className="flex text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{Number(video.views).toLocaleString()} views</span>
                    <span className="mx-1">•</span>
                    <span>{video.publishedAt}</span>
                </div>
            </div>
        </div>
    )
}
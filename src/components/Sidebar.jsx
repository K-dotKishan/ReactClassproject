import { useNavigate } from "react-router-dom"

export default function Sidebar() {
    const navigate = useNavigate()
    return (
        <div className="w-[240px] h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-3 hidden md:block overflow-y-auto">
            <ul className="space-y-1">
                <li onClick={() => navigate("/")} className="flex items-center gap-5 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-gray-900 dark:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                    <span className="text-sm font-medium">Home</span>
                </li>
                <li className="flex items-center gap-5 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-gray-900 dark:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 6.71c.21.2.22.54.02.75l-4.22 4.47c-.2.21-.54.22-.75.02s-.22-.54-.02-.75l4.22-4.47c.2-.21.54-.22.75-.02zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" /></svg>
                    <span className="text-sm font-medium">Shorts</span>
                </li>
                <li className="flex items-center gap-5 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-gray-900 dark:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.7 8.7H5.3V7h13.4v1.7zm-1.7-5H7v1.6h10V3.7zm3.3 8.3v6.7c0 1-.8 1.7-1.7 1.7H5.3c-1 0-1.7-.8-1.7-1.7V12c0-1 .8-1.7 1.7-1.7h13.4c1 0 1.7.8 1.7 1.7zm-3.3 3.3l-6.7-3.7v7.3l6.7-3.6z" /></svg>
                    <span className="text-sm font-medium">Subscriptions</span>
                </li>
            </ul>
            <hr className="my-3 border-gray-200 dark:border-gray-700" />
            <div className="px-3 py-2">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">You</h3>
                <ul className="space-y-1">
                    <li className="flex items-center gap-5 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-gray-900 dark:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11 7l6 3.5-6 3.5V7zm7 13H4v6h14v-6zm-2-2H6v2h10v-2zm2-2H6v2h10v-2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" /></svg>
                        <span className="text-sm font-medium">Library</span>
                    </li>
                    <li onClick={() => navigate("/history")} className="flex items-center gap-5 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-gray-900 dark:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                        <span className="text-sm font-medium">Watch History</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
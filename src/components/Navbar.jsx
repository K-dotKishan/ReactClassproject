import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 h-16 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    {/* Burger Menu Icon Placeholder */}
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <Link to="/" className="flex items-center gap-1">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">YT</div>
                    <span className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white">YouTube</span>
                </Link>
            </div>

            {/* Search Section */}
            <div className="hidden md:flex items-center flex-1 max-w-[700px] ml-16">
                <div className="flex w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-l-full focus:outline-none focus:border-blue-500 dark:text-white"
                    />
                    <button className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-800 dark:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer">
                    K
                </div>
            </div>
        </div>
    )
}
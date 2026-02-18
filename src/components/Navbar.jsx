import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function Navbar() {
    const [query, setquery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/search/${query}`)
        setquery("")
    }
    return (
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <Link to="/" className='text-2xl font-bold flex items-center gap-1'>
                <span className="text-red-600">Media</span>Platform
            </Link>

            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 flex items-center">
                <div className="flex w-full items-center">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setquery(e.target.value)}
                        placeholder="Search"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-full focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </form>

            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-sm font-medium">U</span>
            </div>
        </div>
    )
}
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'

export default function Navbar() {
    const [query, setquery] = useState('')
    const navigate = useNavigate()
    const [searchHistory, setSearchHistory] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("searchHistory")) || []
        setSearchHistory(stored)
    }, [])

    const filteredSuggestions = useMemo(() => {
        if (!query) return []
        return searchHistory.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    }, [query, searchHistory])

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(query)
        if (query.trim()) {
            // Save to history
            const newHistory = [query.trim(), ...searchHistory.filter(item => item !== query.trim())].slice(0, 5)
            setSearchHistory(newHistory)
            localStorage.setItem("searchHistory", JSON.stringify(newHistory))

            navigate(`/search/${query}`)
            setquery("")
            setShowSuggestions(false)
        }
    }

    return (
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <Link to="/" className='text-2xl font-bold flex items-center gap-1'>
                <span className="text-red-600">Media</span>Platform
            </Link>

            <div className="flex-1 max-w-2xl mx-4 relative">
                <form onSubmit={handleSearch} className="flex items-center w-full">
                    <div className="flex w-full items-center">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setquery(e.target.value)
                                setShowSuggestions(true)
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
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

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-1 shadow-lg z-50">
                        {filteredSuggestions.map((item, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                                onMouseDown={(e) => {
                                    e.preventDefault() // Prevent blur before click
                                    setquery(item)
                                    navigate(`/search/${item}`)
                                    setShowSuggestions(false)
                                }}
                            >
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-sm font-medium">U</span>
            </div>
        </div>
    )
}
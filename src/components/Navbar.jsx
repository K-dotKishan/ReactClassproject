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
        <div>
            <form onSubmit={handleSearch}>
                <Link to="/" className='text-2xl font-bold'>MediaPlatform</Link>
                <input type="text" value={query} onChange={(e) => setquery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}
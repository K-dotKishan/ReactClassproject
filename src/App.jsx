import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

import Home from './pages/Home'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import Watch from './pages/Watch'
import Search from './pages/Search'
import History from './pages/History'

function App() {


  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:page" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Layout>
  )
}

export default App

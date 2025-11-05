import React from 'react'
import { Button } from "@/components/ui/button"
import Navbar from "@/ui_components/navbar.jsx"
import Header from './ui_components/Header'
import BlogConatiner from './ui_components/BlogConatiner'
import Footer from './ui_components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <BlogConatiner />
      <Footer />
    </div>

  )
}

export default App
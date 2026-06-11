import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';

const AppLayout = ({ isAuthenticated, setIsAuthenticated, username, setUsername }) => {
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem("dark")=== "true")

  useEffect(() => {
    localStorage.setItem("dark", String(darkMode))
  }, [darkMode])

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="w-full bg-[#ffffff] dark:bg-[#181A2A]">
        <Navbar 
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          username={username} 
          setUsername={setUsername}
          darkMode={darkMode} 
          handleDarkModeToggle={handleDarkModeToggle} />
        <ToastContainer />
        <Outlet />
        <Footer />
      </main>
    </div>
  )
}

export default AppLayout

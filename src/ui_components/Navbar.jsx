import { Switch } from "@/components/ui/switch"
import { FaHamburger } from "react-icons/fa";
import ResponsiveNavbar from "./ResponsiveNavbar";
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated, username, setUsername, darkMode, handleDarkModeToggle }) => {  
  const [showNavBar, setShowNavBar] = useState(false);

  function logout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setIsAuthenticated(false)
    setUsername(null)
  }
  return (
    <>
      <nav className="max-container padding-x py-6 flex justify-between items-center  gap-6 sticky top-0 z-10 bg-[#FFFFFF] dark:bg-[#141624]">
        <Link to="/" className="text-[#141624] text-2xl dark:text-[#FFFFFF]">
          DevFolio
        </Link>
        <ul className="flex items-center  justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">
          
          {isAuthenticated? <>
            <li>
              <NavLink className={({isActive}) => isActive? "active": ""} to="/profile">Hi, {username}</NavLink>
            </li> 

            <li onClick={logout} className="cursor-pointer">
              Logout
            </li>
          </> : <>
            <li>
              <NavLink className={({isActive}) => isActive? "active": ""} to="/signin">Login</NavLink>
            </li>

            <li>
              <NavLink className={({isActive}) => isActive? "active": ""} to="/signup">Register</NavLink>
            </li>
          </>}

          <li className="font-semibold">
            <NavLink className={({isActive}) => isActive? "active": ""} to="/create">Create post</NavLink>
          </li>

        </ul>

        <Switch onCheckedChange ={handleDarkModeToggle} checked={darkMode}/>
        
        <FaHamburger className="text-2xl cursor-pointer hidden max-md:block dark:text-white" onClick={()=>setShowNavBar(curr => !curr)}/>
      </nav>
        {showNavBar && <ResponsiveNavbar isAuthenticated={isAuthenticated} username={username} logout={logout}/>}
    </>
  )
}

export default Navbar
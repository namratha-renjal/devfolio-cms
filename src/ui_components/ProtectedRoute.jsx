import { jwtDecode } from 'jwt-decode'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Spinner from './Spinner'
import { Navigate, useLocation} from 'react-router-dom'
import api from "@/api"

const ProtectedRoute = ({children}) => {

    const [isAuthorized, setIsAuthorized] = useState(null)
    const location = useLocation()

    useEffect(function(){
        authorize().catch(() => setIsAuthorized(false))
    },[])

    async function refreshToken(){
        // make api call to refresh token
        const refresh = localStorage.getItem("refresh")
        try{
            const response = await api.post("token_refresh/", {refresh})
            if(response.status === 200){
                localStorage.setItem("access", response.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        }catch(err){
            setIsAuthorized(false)
            console.log(err)
        }
    }

    async function authorize(){
        const token = localStorage.getItem("access")
        if(!token){
            setIsAuthorized(false)
            return
        }

        const decodedToken= jwtDecode(token)
        const expiry_date = decodedToken.exp * 1000
        const current_date = Date.now()

        if(current_date > expiry_date){
            await refreshToken() 
            setIsAuthorized(false)
            return
        }

        setIsAuthorized(true)
    }

    if(isAuthorized === null){
        return <Spinner />
    }
  return (
    <>
        {isAuthorized ? children : <Navigate to="/signin" state={{from:location}} replace />}
    </>
  )
}

export default ProtectedRoute
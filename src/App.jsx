import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient, useQuery} from '@tanstack/react-query'
import AppLayout from "./ui_components/AppLayout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import BlogPage from "./pages/BlogPage" 
import SignUpPage from "./pages/SignUpPage"
import CreatePostPage from "./pages/CreatePostPage"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from './ui_components/ProtectedRoute'
import { useState, useEffect } from 'react'
import { getUsername } from './services/apiBlog'

// Create a client
const queryClient = new QueryClient()

const App = () => {
  const [username, setUsername] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const {data} = useQuery({
    queryKey: ['username'],
    queryFn: getUsername
  })
  
  useEffect(function(){
    if(data){
      setUsername(data.username)
      setIsAuthenticated(true)
    }
  }, [data])

  return (
    <QueryClientProvider client={queryClient}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username} setUsername={setUsername} />}>
            <Route index element={<HomePage />} />
            <Route path="blogs/:slug" element={<BlogPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="signin" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
            <Route path="create" element={<ProtectedRoute> <CreatePostPage /> </ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AppLayout from "./ui_components/AppLayout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import BlogPage from "./pages/BlogPage" 
import SignUpPage from "./pages/SignUpPage"
import CreatePostPage from "./pages/CreatePostPage"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from './ui_components/ProtectedRoute'

// Create a client
const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="blogs/:slug" element={<BlogPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="signin" element={<LoginPage />} />
            <Route path="create" element={<ProtectedRoute> <CreatePostPage /> </ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from "./ui_components/AppLayout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import BlogPage from "./pages/BlogPage" 
import SignUpPage from "./pages/SignUpPage"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

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
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
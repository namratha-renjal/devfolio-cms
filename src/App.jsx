import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from "./ui_components/AppLayout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import BlogPage from "./pages/BlogPage" 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
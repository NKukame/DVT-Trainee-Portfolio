import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css'
import Home from './Pages/HomePage/Home.jsx'
import About from './Pages/AboutPage/About.jsx';
import Login from './Pages/LoginPage/Login.jsx'
import Portfolio from './Pages/PortfolioPage/Portfolio.jsx';
import UserPortfolio from './Pages/UserPortfolioPage/UserPortfolio.jsx';
import ProfileCreation from './Pages/ProfileCreation/ProfileCreation.jsx';
import EditProfile from './Pages/EditProfile/EditProfile.jsx';
import SearchBar from './components/SearchBarComp/SearchBar.jsx';
import Search from './Pages/SearchPage/Search.jsx';
import GenerateCV from './Pages/GenerateCV/GenerateCV.jsx';
import ForgotPassword from './components/BadgeComp/ForgotPassword.jsx';
import { DarkModeProvider } from './components/DarkModeComp/DarkModeProvider.jsx';
import ProtectedRoutes from './components/ProtectedComp/ProtectedRoute.jsx';
import { SearchContextProvider } from './contexts/SearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
                
    <SearchContextProvider>
      <DarkModeProvider>
        
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile-creation" element={<ProfileCreation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<Portfolio />} />
            <Route path="/search" element={<Search />} />
            <Route path="/userportfolio" element={<UserPortfolio />} />
            <Route path="/generate-cv" element={<GenerateCV />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
        </Routes>
      </Router>
      </DarkModeProvider>
    </SearchContextProvider>
    
  </StrictMode>
)
 
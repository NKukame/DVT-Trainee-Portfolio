import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css'
import Home from './Pages/HomePage/Home.jsx'
import About from './Pages/AboutPage/About.jsx';
import Login from './Pages/LoginPage/Login.jsx'
import Portfolio from './Pages/PortfolioPage/Portfolio.jsx';
import UserPortfolio from './Pages/UserPortfolioPage/UserPortfolio.jsx';
import SearchBar from './components/SearchBarComp/SearchBar.jsx';
import ProfileForm from './Pages/ProfileFormPage/ProfileForm.jsx';
import Search from './Pages/SearchPage/Search.jsx';
import ForgotPassword from './components/BadgeComp/ForgotPassword.jsx';
import { DarkModeProvider } from './components/DarkModeComp/DarkModeProvider.jsx';
import ProtectedRoutes from './components/ProtectedComp/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/userportfolio" element={<UserPortfolio />} />
          <Route path="/profileform" element={<ProfileForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Router>
    </DarkModeProvider>
  </StrictMode>
)
 
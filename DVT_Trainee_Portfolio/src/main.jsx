import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css'
import Home from './Home.jsx'
import About from './About.jsx';
import Login from './Login.jsx'
import Portfolio from './Portfolio.jsx';
import UserPortfolio from './UserPortfolio.jsx';
import SearchBar from './components/SearchBar.jsx';
import ProfileForm from './ProfileForm.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/userportfolio" element={<UserPortfolio />} />
        <Route path="/profileform" element={<ProfileForm />} />
        
      </Routes>
    </Router>
  </StrictMode>
)
 
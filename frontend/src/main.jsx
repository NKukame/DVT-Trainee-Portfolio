import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import { Refine } from "@refinedev/core";

// ... your imports
import './styles.css'
import Home from './Pages/HomePage/Home.jsx'
import About from './Pages/AboutPage/About.jsx';
import Login from './Pages/LoginPage/Login.jsx'
import Portfolio from './Pages/PortfolioPage/Portfolio.jsx';
import UserPortfolio from './Pages/UserPortfolioPage/UserPortfolio.jsx';
import ProfileCreation from './Pages/ProfileCreation/ProfileCreation.jsx';
import Search from './Pages/SearchPage/Search.jsx';
import GenerateCV from './Pages/GenerateCV/GenerateCV.jsx';
import ForgotPassword from './components/BadgeComp/ForgotPassword.jsx';
import { DarkModeProvider } from './components/DarkModeComp/DarkModeProvider.jsx';
import { SearchContextProvider } from './contexts/SearchContext.jsx';
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { EditEmployee } from './Pages/Dashboard/employees/edit.jsx';
import { EmployeeList } from './Pages/Dashboard/employees/list.jsx';
import { EmployeeShow } from './Pages/Dashboard/employees/show.jsx';
import { CreateEmployee } from './Pages/Dashboard/employees/create.jsx';
import ProtectedRoutes from './components/ProtectedComp/ProtectedRoute';
import routerBindings, { NavigateToResource } from '@refinedev/react-router';

// Your ProtectedRoutes component


const App = () => {
  return (
    <BrowserRouter>
      <SearchContextProvider>
        <DarkModeProvider>
          <Refine 
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "employees",
                list: "/dashboard/employees",
                show: "/dashboard/employees/:id",
                edit: "/dashboard/employees/:id/edit",
                create: "/dashboard/employees/create",
                meta: { label: "Employees" },
              },
            ]}
          >
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Login />} />
              <Route path="/profile-creation" element={<ProfileCreation />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/userportfolio" element={<UserPortfolio />} />
                <Route path="/generate-cv" element={<GenerateCV />} />
                
                {/* Dashboard routes */}
                <Route 
                  path="/dashboard" 
                  element={<NavigateToResource resource="employees" />} 
                />
                <Route path="/dashboard/employees" element={<EmployeeList />} />
                <Route path="/dashboard/employees/:id" element={<EmployeeShow />} />
                <Route path="/dashboard/employees/:id/edit" element={<EditEmployee />} />
                <Route path="/dashboard/employees/create" element={<CreateEmployee />} />
              </Route>
            </Routes>
          </Refine>
        </DarkModeProvider>
      </SearchContextProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
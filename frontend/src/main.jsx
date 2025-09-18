import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import { Refine, Authenticated } from "@refinedev/core";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";

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
import EditProfile from './Pages/EditProfile/EditProfile.jsx';
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
import Header from './components/HeaderComp/Header';
import { ListUser } from './Pages/Dashboard/users/list.jsx';
import { ShowUser } from './Pages/Dashboard/users/show.jsx';
import { CreateUser } from './Pages/Dashboard/users/create.jsx';
import { EditUser } from './Pages/Dashboard/users/edit.jsx';
import { ListProject } from './Pages/Dashboard/projects/list.jsx';
import { ShowProject } from './Pages/Dashboard/projects/show.jsx';
import { CreateProject } from './Pages/Dashboard/projects/create.jsx';
import { EditProject } from './Pages/Dashboard/projects/edit.jsx';
import { ListTechStack } from './Pages/Dashboard/techstacks/list.jsx';
import { ShowTechStack } from './Pages/Dashboard/techstacks/show.jsx';
import { CreateTechStack } from './Pages/Dashboard/techstacks/create.jsx';
import { EditTechStack } from './Pages/Dashboard/techstacks/edit.jsx';
import DashboardSummary from './Pages/Dashboard/summary/index.jsx';
import { ListSoftSkill } from './Pages/Dashboard/softSkills/list.jsx';
import { ShowSoftSkill } from './Pages/Dashboard/softSkills/show.jsx';
import { CreateSoftSkill } from './Pages/Dashboard/softSkills/create.jsx';
import { EditSoftSkill } from './Pages/Dashboard/softSkills/edit.jsx';
import { ThemedSiderV2, RefineSnackbarProvider, useNotificationProvider, } from "@refinedev/mui";
import { Link } from "react-router";

import{QueryClient, QueryClientProvider} from "@tanstack/react-query";

import { createTheme } from "@mui/material/styles";
// make the primary color gray
const overriddenLightTheme = createTheme({
  ...RefineThemes.Blue,
  palette: {
    ...RefineThemes.Blue.palette,
    primary: {
      main: "#282828",
      light: "#282828",
      
    },
    secondary: {
      main: "#2f82f1",
    },
  },
});
const App = () => {
  return (
    <BrowserRouter>
    <ThemeProvider theme={overriddenLightTheme} >
      <CssBaseline />
      <GlobalStyles />
      <SearchContextProvider>
        <DarkModeProvider>
          <RefineSnackbarProvider>
          <Refine 
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerBindings}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "employee",
                list: "/dashboard/employee",
                show: "/dashboard/employee/:id",
                edit: "/dashboard/employee/:id/edit",
                create: "/dashboard/employee/create",
                meta: { label: "Employee" },
              },
              {
                name: "user",
                list: "/dashboard/user",
                show: "/dashboard/user/:id",
                edit: "/dashboard/user/:id/edit",
                create: "/dashboard/user/create",
                meta: { label: "User" },
              },
              {
                name: "project",
                list: "/dashboard/project",
                show: "/dashboard/project/:id",
                edit: "/dashboard/project/:id/edit",
                create: "/dashboard/project/create",
                meta: { label: "Project" },
              },
              {
                name: "techStack",
                list: "/dashboard/techStack",
                show: "/dashboard/techStack/:id",
                edit: "/dashboard/techStack/:id/edit",
                create: "/dashboard/techStack/create",
                meta: { label: "TechStack" },
              },
              {
                name: "softSkill",
                list: "/dashboard/softSkill",
                show: "/dashboard/softSkill/:id",
                edit: "/dashboard/softSkill/:id/edit",
                create: "/dashboard/softSkill/create",
                meta: { label: "SoftSkill" },
              },
            ]}
          >
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/profile-creation" element={<ProfileCreation />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<Portfolio />} />
                <Route path="/search" element={<Search />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/userportfolio" element={<UserPortfolio />} />
                <Route path="/generate-cv" element={<GenerateCV />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                
                {/* Dashboard routes */}
                <Route
                  path="/dashboard"
                  element={
                    <Authenticated key="authenticated-routes" fallback={<h1>Unauthorized</h1>}>
                       <ThemedLayoutV2
                        Sider={() => (
                          <ThemedSiderV2
                          Title={(props) => (
                           <ThemedTitleV2 icon={false} text="DVT  Portfolio"  />
                          )}
                            render={({ items, logout }) => {
                              return (
                                <>

                                <div style={{display: "flex", flexDirection: "column", padding: "1rem", visitedColor: "white"}}>
                                  <Link to="/dashboard">Summary</Link>
                                </div>
                                  {items}
                                  {logout}
                                </>
                              );
                            }}
                          />
                        )}
                      

                       >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<DashboardSummary />} />
                  <Route path="summary" element={<DashboardSummary />} />
                  <Route path="employee" element={<EmployeeList/>} />
                  <Route path="employee/:id" element={<EmployeeShow/>} />
                  <Route path="employee/:id/edit" element={<EditEmployee/>} />
                  <Route path="employee/create" element={<CreateEmployee/>} />
                  <Route path="user" element={<ListUser/>} />
                  <Route path="user/:id" element={<ShowUser/>} />
                  <Route path="user/:id/edit" element={<EditUser/>} />
                  <Route path="user/create" element={<CreateUser/>} />
                  <Route path="project" element={<ListProject/>} />
                  <Route path="project/:id" element={<ShowProject/>} />
                  <Route path="project/:id/edit" element={<EditProject/>} />
                  <Route path="project/create" element={<CreateProject/>} />
                  <Route path="techStack" element={<ListTechStack/>} />
                  <Route path="techStack/:id" element={<ShowTechStack/>} />
                  <Route path="techStack/:id/edit" element={<EditTechStack/>} />
                  <Route path="techStack/create" element={<CreateTechStack/>} />
                  <Route path="softSkill" element={<ListSoftSkill/>} />
                  <Route path="softSkill/:id" element={<ShowSoftSkill/>} />
                  <Route path="softSkill/:id/edit" element={<EditSoftSkill/>} />
                  <Route path="softSkill/create" element={<CreateSoftSkill/>} />
                </Route>
              </Route>
            </Routes>
          </Refine>
          </RefineSnackbarProvider>
        </DarkModeProvider>
      </SearchContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>

)

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>

)

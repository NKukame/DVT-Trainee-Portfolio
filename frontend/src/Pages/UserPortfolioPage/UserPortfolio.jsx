import Dashboard from "../../components/DashboardComp/Dashboard";
import ProjectCard from "../../components/ProjectsComp/Projects";
import TestimonialCard from "../../components/TestimonialCardComp/TestimonialCard";
import SideBar from "../../components/SidebarComp/SideBar";
import TabHead from "../../components/UserPortfolioComps/tabs/TabHead";
import { useState, useEffect } from "react";
import UserProfileOverview from "../../components/UserPortfolioComps/tabs/UserProfileOverview";
import UserProfileProjects from "../../components/UserPortfolioComps/tabs/UserProfileProjects";
import UserProfileSkillBreakdown from "../../components/UserPortfolioComps/tabs/UserprofileSkillBreakdown";
import { useLocation } from "react-router-dom";

function UserPortfolio(props) {
  const [activeTab, setActiveTab] = useState("overview");
  const [employeeData, setEmployeeData] = useState(null);
  const location = useLocation();
  
  

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      if (!location.state) {
        try {
          const token = JSON.parse(localStorage.getItem('token'));
          const response = await fetch('http://localhost:3000/api/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setEmployeeData(userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    
    fetchCurrentUserData();
  }, [location.state]);
  
  const testEmployee = location.state || employeeData;
  
  if (!testEmployee) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="app-layout">
        <SideBar />

        <div className="layout-body">
          <div className="portfolio-layout">
            <Dashboard testEmployee={testEmployee}/>
            <div className="project-container">
              <TabHead activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "overview" && <UserProfileOverview testEmployee={testEmployee}/>}
              {activeTab === "projects" && <UserProfileProjects testEmployee={testEmployee}/>}
              {activeTab === "skills" && <UserProfileSkillBreakdown testEmployee={testEmployee}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPortfolio;

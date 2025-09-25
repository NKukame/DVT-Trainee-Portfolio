import Dashboard from "../../components/DashboardComp/Dashboard";
import ProjectCard from "../../components/ProjectsComp/Projects";
import TestimonialCard from "../../components/TestimonialCardComp/TestimonialCard"; 
import TabHead from "../../components/UserPortfolioComps/tabs/TabHead";
import { useState, useEffect } from "react";
import UserProfileOverview from "../../components/UserPortfolioComps/tabs/UserProfileOverview";
import UserProfileProjects from "../../components/UserPortfolioComps/tabs/UserProfileProjects";
import UserProfileSkillBreakdown from "../../components/UserPortfolioComps/tabs/UserprofileSkillBreakdown";
import { useLocation } from "react-router";
import { useUserStore } from "../../lib/useUser.js";

function UserPortfolio(props) {
  const [activeTab, setActiveTab] = useState("overview");
  const [employeeData, setEmployeeData] = useState(null);
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  
  useEffect(() => {
      if (window.sessionStorage.getItem("searchPageReloaded")) {
        window.sessionStorage.removeItem("searchPageReloaded", "true");
      }
    }, []);

  const testEmployee = location.state || user.testEmployee;

  if (!testEmployee) {
    return (
      <div className="layout-body">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="form-loader" style={{ width: '60px', height: '60px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="portfolio-layout">
        <Dashboard testEmployee={testEmployee} />
        <div className="project-container">
          <TabHead activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "overview" && (
            <UserProfileOverview testEmployee={testEmployee} />
          )}
          {activeTab === "projects" && (
            <UserProfileProjects testEmployee={testEmployee} />
          )}
          {activeTab === "skills" && (
            <UserProfileSkillBreakdown testEmployee={testEmployee} />
          )}
        </div>
      </div>
    </>
  );
}

export default UserPortfolio;

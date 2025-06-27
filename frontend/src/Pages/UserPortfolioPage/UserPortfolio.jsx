import "../../styles.css";
import "./UserPortfolio.css";
import Dashboard from "../../components/DashboardComp/Dashboard";
import ProjectCard from "../../components/ProjectsComp/Projects";
import TestimonialCard from "../../components/TestimonialCardComp/TestimonialCard";
import SideBar from "../../components/SidebarComp/SideBar";
import TabHead from "../../components/UserPortfolioComps/tabs/TabHead";
import { useState } from "react";
import UserProfileOverview from "../../components/UserPortfolioComps/tabs/UserProfileOverview";
import UserProfileProjects from "../../components/UserPortfolioComps/tabs/UserProfileProjects";
import UserProfileSkillBreakdown from "../../components/UserPortfolioComps/tabs/UserprofileSkillBreakdown";
import { useLocation } from "react-router-dom";

function UserPortfolio(props) {
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();
  
  
  //  companyTestimonials = [
  //   {
  //     name: "Zara Hadid",
  //     company: "Discovery Health",
  //     description:
  //       "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
  //   },
  //   {
  //     name: "Zara Hadid",
  //     company: "Discovery Health",
  //     description:
  //       "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
  //   },
  //   {
  //     name: "Zara Hadid",
  //     company: "Discovery Health",
  //     description:
  //       "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
  //   },
  //   {
  //     name: "Zara Hadid",
  //     company: "Discovery Health",
  //     description:
  //       "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
  //   },
  //   {
  //     name: "Zara Hadid",
  //     company: "Tech Innovations",
  //     description:
  //       "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
  //   },
  //   {
  //     name: "Gregory House",
  //     company: "Tech Innovations",
  //     description:
  //       "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
  //   }
    
  // ];
  return (
    <>
      <div className="app-layout">
        <SideBar />

        <div className="layout-body">
          <div className="portfolio-layout">
            <Dashboard   testEmployee={location.state}/>
            <div className="project-container">
              <TabHead activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "overview" && <UserProfileOverview testEmployee={location.state}/>}
              {activeTab === "projects" && <UserProfileProjects testEmployee={location.state}/>}
              {activeTab === "skills" && <UserProfileSkillBreakdown testEmployee={location.state}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPortfolio;

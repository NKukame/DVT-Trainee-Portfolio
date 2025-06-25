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

function UserPortfolio() {
  const [activeTab, setActiveTab] = useState("overview");
  const [testEmployee, setTestEmployee] = useState({
    name: "Paballo Thobei",
    role: "Fullstack Developer Intern",
    bio: "Short intro of experience and interests like cats hobbies and projects they really like etc...",
    location: "Remote /Johannesburg (flexible)",
    description:"I am a vibrant dev that likes biscuits and eating tea bags. I am a vibrant dev that likes biscuits and eating tea bags.I am a vibrant dev that likes biscuits and eating tea bags.I am a vibrant dev that likes biscuits and eating tea bags. I am a vibrant dev that likes biscuits and eating tea bags.I am a vibrant dev that likes biscuits and eating tea bags.I am a vibrant dev that likes biscuits and eating tea bags.",
    experience: "2.5 years",
    skills: ["Java", "Python", "C#", "HTML", "CSS", "SQLite", "JavaScript", "React", "Node.js"],
    availability: "Available",
    companyTestimonials: [
    {
      name: "Zara Hadid",
      company: "Discovery Health",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Zara Hadid",
      company: "Discovery Health",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Zara Hadid",
      company: "Discovery Health",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Zara Hadid",
      company: "Discovery Health",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Zara Hadid",
      company: "Tech Innovations",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Gregory House",
      company: "Tech Innovations",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    }
    
  ]
  });
  
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
            <Dashboard testEmployee={testEmployee}/>
            <div className="project-container">
              <TabHead activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "overview" && <UserProfileOverview testEmployee={testEmployee}/>}
              {activeTab === "projects" && <UserProfileProjects />}
              {activeTab === "skills" && <UserProfileSkillBreakdown />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPortfolio;

import "../../styles.css";
import "./ProfileCreation.css";
import SideBar from "../../components/SidebarComp/SideBar";
import Stepper from "../../components/ProfileCreationComp/Stepper";
import { useState } from "react";
import BasicInfoForm from "../../components/ProfileCreationComp/BasicInfoForm";
import { Save, X } from "lucide-react";
import { useDarkMode } from "../../components/DarkModeComp/DarkModeProvider";

function ProfileCreation() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [stepData, setStepData] = useState([
    {
      title: "Basic Information",
      description: "Please provide your name and experience",
    },
    {
      title: "Skills & Education",
      description: "Please provide your technical and personal proficiencies",
    },
    {
      title: "Career",
      description: "Please provide projects you’ve worked on",
    },
    {
      title: "Testimonials",
      description:
        "Please provide any accolades or reviews from clients or employers",
    },
    {
      title: "Links",
      description: "Please provide links to your public portfolios",
    },
    {
      title: "Status",
      description: "Please provide your current assignments",
    },
    {
      title: "Submit",
      description: "Please review your profile and submit for approval",
    },
  ]);

  return (
    <>
      <div className="app-layout">
        <SideBar />

        <div className="app-layout-body">
          <div className="profile-creation-body">
            <div className="profile-creation-header">
              <Stepper currentStep={0} stepData={stepData} />
            </div>

            <div className="profile-creation-content">
              <div className="profile-creation-content-header">
                <h1>Body</h1>
              </div>

              <div className="profile-creation-content-forms-container">
                <BasicInfoForm />
              </div>

              <div className="profile-creation-content-footer">
                <div className="profile-creation-content-footer-left-sided-buttons">
                  <button className="profile-creation-cancel-btn">
                    {" "}
                    <X size={15} className="profile-creation-button-icon" />
                    Cancel
                  </button>
                  <button className="profile-creation-save-btn">
                    {" "}
                    <Save size={15} className="profile-creation-button-icon" />
                    Save & Exit
                  </button>
                </div>

                <div className="profile-creation-content-footer-page-numbers">
                  <p>Page 1 of 7</p>
                </div>

                <div className="profile-creation-content-footer-left-sided-buttons">
                  <button>Previous</button>
                  <button>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCreation;

import "../../styles.css";
import "./ProfileCreation.css";
import SideBar from "../../components/SidebarComp/SideBar";
import Stepper from "../../components/ProfileCreationComp/Stepper";
import { useState } from "react";
import BasicInfoForm from "../../components/ProfileCreationComp/BasicInfoForm";
import SkillsForm from "../../components/ProfileCreationComp/SkillsForm";
import CareerForm from "../../components/ProfileCreationComp/CareerForm";
import Testimonials from "../../components/ProfileCreationComp/Testimonials";
import LinksForm from "../../components/ProfileCreationComp/LinksForm";
import StatusForm from "../../components/ProfileCreationComp/StatusForm";
import SubmitForm from "../../components/ProfileCreationComp/SubmitForm";
import { Save, X } from "lucide-react";


function ProfileCreation() {
  
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
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {},
    skills: {},
    career: {},
    testimonials: {},
    links: {},
    status: {},
  });

  const handleNext = () => {
    const stepKeys = ["basicInfo", "skills", "career", "testimonials", "links", "status"];
    const currentKey = stepKeys[currentStep];
    console.log(`Current Step (${currentKey}) Data:`, formData[currentKey]);
    if (currentStep < stepData.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInfoForm
            data={formData.basicInfo}
            onChange={(newData) =>
              setFormData((prev) => ({ ...prev, basicInfo: newData }))
            }
          />
        );
      case 1:
        return (
          <SkillsForm
            data={formData.skills}
            onChange={(newData) =>
              setFormData((prev) => ({ ...prev, skills: newData }))
            }
          />
        );
      case 2:
        return (
          <CareerForm
            data={formData.career}
            onChange={(newData) =>
              setFormData((prev) => ({ ...prev, career: newData }))
            }
          />
        );
      case 3:
        return (
          <Testimonials
            data={formData.testimonials}
            onChange={(newData) =>
              setFormData((prev) => ({ ...prev, testimonials: newData }))
            }
          />
        );
      case 4:
        return (
          <LinksForm
            data={formData.links}
            onChange={(newData) =>
              setFormData((prev) => ({ ...prev, links: newData }))
            }
          />
        );
      case 5:
        return (
          <StatusForm
            data={formData.status}
            onChange={(newData) =>
              setFormData((prev) => ({ ...prev, status: newData }))
            }
          />
        );

      case 6:
        return (
          <SubmitForm
            basicInfo={formData.basicInfo}
            skills={formData.skills}
            career={formData.career}
            testimonials={formData.testimonials}
            links={formData.links}
            status={formData.status}
          />
        );
      default:
        return <div>No Form Found</div>;
    }
  };

  return (
    <>
      <div className="app-layout">
        <SideBar />

        <div className="app-layout-body">
          <div className="profile-creation-body">
            <div className="profile-creation-header">
              <Stepper
                currentStep={currentStep}
                stepData={stepData}
                setCurrentStep={setCurrentStep}
              />
            </div>

            <div className="profile-creation-content">
              <div className="profile-creation-content-header">
                <h1>{stepData[currentStep].title}</h1>
              </div>

              <div className="profile-creation-content-forms-container">
                {renderStepContent(currentStep)}
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
                  <p>Page {currentStep + 1} of 7</p>
                </div>

                <div className="profile-creation-content-footer-left-sided-buttons">
                  <button onClick={handlePrevious} disabled={currentStep === 0}>
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentStep === stepData.length - 1}
                  >
                    Next
                  </button>
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

import "./Stepper.css";

function Stepper({ currentStep = 0 }) {
  const stepData = [
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
  ];


  return (
    <div className="stepper-container">
       {stepData.map((step, index) => (
        <div key={index} className={`steps ${index === currentStep ? 'active' : ''}`}>
          <div className="step-progress"></div>
          <div className="step-text">
            <h3 className="step-heading">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stepper;

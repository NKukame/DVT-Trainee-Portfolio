import "./Stepper.css";

function Stepper({ currentStep, stepData, setCurrentStep }) {
  return (
    <div className="stepper-container">
      {stepData &&
        stepData.map((step, index) => (
          <div
            key={index}
            className={`steps ${index === currentStep ? "active" : ""}`}
            onClick={() => setCurrentStep(index)}
          >
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

import "./Stepper.css";

function Stepper({
  currentStep,
  stepData,
  setCurrentStep,
  visitedSteps = [],
  incompleteSteps = [],
}) {
  return (
    <div className="stepper-container">
      {stepData &&
        stepData.map((step, index) => {
          let progressClass = "";
          if (visitedSteps.includes(index) && incompleteSteps.includes(index)) {
            progressClass = " incomplete";
          } else if (visitedSteps.includes(index)) {
            progressClass = " visited";
          }
          return (
            <div
              key={index}
              className={`steps ${index === currentStep ? "active-step" : ""}`}
              onClick={() => setCurrentStep(index)}
            >
              <div className={`step-progress${progressClass}`}></div>
              <div className="step-text">
                <h3 className="step-heading">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Stepper;
